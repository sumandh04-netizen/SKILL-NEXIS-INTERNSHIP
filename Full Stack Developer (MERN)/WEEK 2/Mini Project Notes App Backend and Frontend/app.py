from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from functools import wraps
from bson import ObjectId
from pathlib import Path
import jwt
import datetime
import hashlib
import os


# =========================================================
# LOAD ENVIRONMENT VARIABLES
# =========================================================

load_dotenv()


# =========================================================
# FLASK APPLICATION
# =========================================================

app = Flask(__name__)
CORS(app)

bcrypt = Bcrypt(app)


# =========================================================
# CONFIGURATION
# =========================================================

MONGO_URI = os.getenv(
    "MONGO_URI",
    "mongodb://localhost:27017/"
)

JWT_SECRET = os.getenv(
    "JWT_SECRET",
    "my_secret_key"
)


# =========================================================
# MONGODB CONNECTION
# =========================================================

client = MongoClient(
    MONGO_URI,
    serverSelectionTimeoutMS=5000
)

db = client["notes_app_db"]

users = db["users"]
notes = db["notes"]


# =========================================================
# PDF UPLOAD FOLDER
# =========================================================

UPLOAD_FOLDER = Path(__file__).parent / "uploads"
UPLOAD_FOLDER.mkdir(exist_ok=True)


# =========================================================
# TEST MONGODB CONNECTION
# =========================================================

try:
    client.admin.command("ping")
    print("MongoDB connected successfully!")

except Exception as e:
    print("MongoDB connection failed!")
    print("Error:", e)


# =========================================================
# JWT AUTHENTICATION DECORATOR
# =========================================================

def token_required(function):

    @wraps(function)
    def decorated(*args, **kwargs):

        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return jsonify({
                "message": "Authorization token is required"
            }), 401

        if not auth_header.startswith("Bearer "):
            return jsonify({
                "message": "Use Bearer token format"
            }), 401

        token = auth_header.split(" ", 1)[1]

        try:

            data = jwt.decode(
                token,
                JWT_SECRET,
                algorithms=["HS256"]
            )

            user = users.find_one({
                "email": data["email"]
            })

            if not user:
                return jsonify({
                    "message": "User not found"
                }), 401

        except jwt.ExpiredSignatureError:

            return jsonify({
                "message": "Token has expired"
            }), 401

        except jwt.InvalidTokenError:

            return jsonify({
                "message": "Invalid token"
            }), 401

        return function(user, *args, **kwargs)

    return decorated


# =========================================================
# FORMAT NOTE
# =========================================================

def format_note(note):

    return {
        "id": str(note["_id"]),

        "title": note.get(
            "title",
            ""
        ),

        "content": note.get(
            "content",
            ""
        ),

        "color": note.get(
            "color",
            "yellow"
        ),

        "tags": note.get(
            "tags",
            []
        ),

        "pinned": note.get(
            "pinned",
            False
        ),

        "archived": note.get(
            "archived",
            False
        ),

        "reminder": note.get(
            "reminder"
        ),

        "locked": bool(
            note.get("lock_hash")
        ),

        "pdf_url": note.get(
            "pdf_url"
        ),

        "drawing": note.get(
            "drawing"
        ),

        "order": note.get(
            "order",
            0
        ),

        "created_at": (
            note["created_at"].isoformat()
            if note.get("created_at")
            else None
        ),

        "updated_at": (
            note["updated_at"].isoformat()
            if note.get("updated_at")
            else None
        )
    }


# =========================================================
# HOME
# =========================================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({

        "message": "Smart Notes Backend is running",

        "database": "notes_app_db",

        "endpoints": [

            "POST /register",

            "POST /login",

            "POST /notes",

            "GET /notes",

            "GET /notes/<id>",

            "PUT /notes/<id>",

            "DELETE /notes/<id>",

            "PUT /notes/<id>/pin",

            "PUT /notes/<id>/archive",

            "PUT /notes/reorder",

            "PUT /notes/<id>/lock",

            "POST /notes/<id>/unlock",

            "DELETE /notes/<id>/unlock",

            "POST /notes/<id>/upload-pdf",

            "GET /uploads/<filename>"
        ]
    })


# =========================================================
# REGISTER
# =========================================================

@app.route("/register", methods=["POST"])
def register():

    data = request.get_json(
        silent=True
    ) or {}

    name = str(
        data.get("name", "")
    ).strip()

    email = str(
        data.get("email", "")
    ).strip().lower()

    password = str(
        data.get("password", "")
    )

    if not name or not email or not password:

        return jsonify({
            "message":
            "Name, email and password are required"
        }), 400

    if len(password) < 6:

        return jsonify({
            "message":
            "Password must contain at least 6 characters"
        }), 400

    existing_user = users.find_one({
        "email": email
    })

    if existing_user:

        return jsonify({
            "message":
            "User already exists"
        }), 409

    password_hash = bcrypt.generate_password_hash(
        password
    ).decode("utf-8")

    users.insert_one({

        "name": name,

        "email": email,

        "password": password_hash

    })

    return jsonify({
        "message":
        "User registered successfully"
    }), 201


# =========================================================
# LOGIN
# =========================================================

@app.route("/login", methods=["POST"])
def login():

    data = request.get_json(
        silent=True
    ) or {}

    email = str(
        data.get("email", "")
    ).strip().lower()

    password = str(
        data.get("password", "")
    )

    if not email or not password:

        return jsonify({
            "message":
            "Email and password are required"
        }), 400

    user = users.find_one({
        "email": email
    })

    if not user:

        return jsonify({
            "message":
            "Invalid email or password"
        }), 401

    if not bcrypt.check_password_hash(
        user["password"],
        password
    ):

        return jsonify({
            "message":
            "Invalid email or password"
        }), 401

    now = datetime.datetime.now(
        datetime.timezone.utc
    )

    token = jwt.encode(

        {
            "email": email,

            "iat": now,

            "exp": now + datetime.timedelta(
                hours=2
            )
        },

        JWT_SECRET,

        algorithm="HS256"
    )

    return jsonify({

        "message":
        "Login successful",

        "token":
        token,

        "name":
        user["name"]

    }), 200


# =========================================================
# CREATE NOTE
# =========================================================

@app.route("/notes", methods=["POST"])
@token_required
def create_note(current_user):

    data = request.get_json(
        silent=True
    ) or {}

    title = str(
        data.get("title", "")
    ).strip()

    content = str(
        data.get("content", "")
    )

    if not title:

        return jsonify({
            "message":
            "Title is required"
        }), 400

    if not content.strip():

        return jsonify({
            "message":
            "Content is required"
        }), 400

    now = datetime.datetime.now(
        datetime.timezone.utc
    )

    last_note = notes.find_one(

        {
            "user_email":
            current_user["email"]
        },

        sort=[
            ("order", -1)
        ]
    )

    new_order = 0

    if last_note:

        new_order = last_note.get(
            "order",
            0
        ) + 1

    note = {

        "user_email":
        current_user["email"],

        "title":
        title,

        "content":
        content,

        "color":
        data.get(
            "color",
            "yellow"
        ),

        "tags":
        data.get(
            "tags",
            []
        ),

        "pinned":
        bool(
            data.get(
                "pinned",
                False
            )
        ),

        "archived":
        False,

        "reminder":
        data.get(
            "reminder"
        ),

        "drawing":
        data.get(
            "drawing"
        ),

        "order":
        new_order,

        "created_at":
        now,

        "updated_at":
        now
    }

    result = notes.insert_one(note)

    return jsonify({

        "message":
        "Note created successfully",

        "note_id":
        str(
            result.inserted_id
        )

    }), 201


# =========================================================
# GET ALL NOTES
# =========================================================

@app.route("/notes", methods=["GET"])
@token_required
def get_notes(current_user):

    archived = (
        request.args.get(
            "archived",
            "false"
        ).lower() == "true"
    )

    note_list = list(

        notes.find({

            "user_email":
            current_user["email"],

            "archived":
            archived

        }).sort([

            ("pinned", -1),

            ("order", 1),

            ("updated_at", -1)

        ])
    )

    return jsonify({

        "count":
        len(note_list),

        "notes":
        [
            format_note(note)
            for note in note_list
        ]

    }), 200


# =========================================================
# GET SINGLE NOTE
# =========================================================

@app.route("/notes/<note_id>", methods=["GET"])
@token_required
def get_note(current_user, note_id):

    try:

        object_id = ObjectId(
            note_id
        )

    except Exception:

        return jsonify({
            "message":
            "Invalid note ID"
        }), 400

    note = notes.find_one({

        "_id":
        object_id,

        "user_email":
        current_user["email"]

    })

    if not note:

        return jsonify({
            "message":
            "Note not found"
        }), 404

    return jsonify(
        format_note(note)
    ), 200


# =========================================================
# UPDATE NOTE
# =========================================================

@app.route("/notes/<note_id>", methods=["PUT"])
@token_required
def update_note(current_user, note_id):

    try:

        object_id = ObjectId(
            note_id
        )

    except Exception:

        return jsonify({
            "message":
            "Invalid note ID"
        }), 400

    data = request.get_json(
        silent=True
    ) or {}

    update_data = {}

    if "title" in data:

        update_data["title"] = str(
            data["title"]
        ).strip()

    if "content" in data:

        update_data["content"] = str(
            data["content"]
        )

    if "color" in data:

        update_data["color"] = data["color"]

    if "tags" in data:

        update_data["tags"] = data["tags"]

    if "reminder" in data:

        update_data["reminder"] = data["reminder"]

    if "drawing" in data:

        update_data["drawing"] = data["drawing"]

    if "pinned" in data:

        update_data["pinned"] = bool(
            data["pinned"]
        )

    if "archived" in data:

        update_data["archived"] = bool(
            data["archived"]
        )

    update_data["updated_at"] = (
        datetime.datetime.now(
            datetime.timezone.utc
        )
    )

    result = notes.update_one(

        {
            "_id":
            object_id,

            "user_email":
            current_user["email"]
        },

        {
            "$set":
            update_data
        }
    )

    if result.matched_count == 0:

        return jsonify({
            "message":
            "Note not found"
        }), 404

    return jsonify({
        "message":
        "Note updated successfully"
    }), 200


# =========================================================
# DELETE NOTE
# =========================================================

@app.route("/notes/<note_id>", methods=["DELETE"])
@token_required
def delete_note(current_user, note_id):

    try:

        object_id = ObjectId(
            note_id
        )

    except Exception:

        return jsonify({
            "message":
            "Invalid note ID"
        }), 400

    result = notes.delete_one({

        "_id":
        object_id,

        "user_email":
        current_user["email"]

    })

    if result.deleted_count == 0:

        return jsonify({
            "message":
            "Note not found"
        }), 404

    return jsonify({
        "message":
        "Note permanently deleted"
    }), 200


# =========================================================
# PIN / UNPIN NOTE
# =========================================================

@app.route(
    "/notes/<note_id>/pin",
    methods=["PUT"]
)
@token_required
def pin_note(current_user, note_id):

    try:

        object_id = ObjectId(
            note_id
        )

    except Exception:

        return jsonify({
            "message":
            "Invalid note ID"
        }), 400

    data = request.get_json(
        silent=True
    ) or {}

    pinned = bool(
        data.get(
            "pinned",
            True
        )
    )

    result = notes.update_one(

        {
            "_id":
            object_id,

            "user_email":
            current_user["email"]
        },

        {
            "$set": {

                "pinned":
                pinned,

                "updated_at":
                datetime.datetime.now(
                    datetime.timezone.utc
                )
            }
        }
    )

    if result.matched_count == 0:

        return jsonify({
            "message":
            "Note not found"
        }), 404

    return jsonify({
        "message":
        "Pin updated"
    }), 200


# =========================================================
# ARCHIVE / RESTORE
# =========================================================

@app.route(
    "/notes/<note_id>/archive",
    methods=["PUT"]
)
@token_required
def archive_note(current_user, note_id):

    try:

        object_id = ObjectId(
            note_id
        )

    except Exception:

        return jsonify({
            "message":
            "Invalid note ID"
        }), 400

    data = request.get_json(
        silent=True
    ) or {}

    archived = bool(
        data.get(
            "archived",
            True
        )
    )

    result = notes.update_one(

        {
            "_id":
            object_id,

            "user_email":
            current_user["email"]
        },

        {
            "$set": {

                "archived":
                archived,

                "updated_at":
                datetime.datetime.now(
                    datetime.timezone.utc
                )
            }
        }
    )

    if result.matched_count == 0:

        return jsonify({
            "message":
            "Note not found"
        }), 404

    return jsonify({

        "message":
        "Note archived"
        if archived
        else
        "Note restored"

    }), 200


# =========================================================
# DRAG AND DROP REORDER
# =========================================================

@app.route(
    "/notes/reorder",
    methods=["PUT"]
)
@token_required
def reorder_notes(current_user):

    data = request.get_json(
        silent=True
    ) or {}

    ids = data.get(
        "ids",
        []
    )

    for index, note_id in enumerate(ids):

        try:

            object_id = ObjectId(
                note_id
            )

        except Exception:

            continue

        notes.update_one(

            {
                "_id":
                object_id,

                "user_email":
                current_user["email"]
            },

            {
                "$set": {
                    "order":
                    index
                }
            }
        )

    return jsonify({

        "message":
        "Notes reordered successfully"

    }), 200


# =========================================================
# LOCK NOTE
# =========================================================

@app.route(
    "/notes/<note_id>/lock",
    methods=["PUT"]
)
@token_required
def lock_note(current_user, note_id):

    try:

        object_id = ObjectId(
            note_id
        )

    except Exception:

        return jsonify({
            "message":
            "Invalid note ID"
        }), 400

    data = request.get_json(
        silent=True
    ) or {}

    password = str(
        data.get(
            "password",
            ""
        )
    )

    if len(password) < 4:

        return jsonify({

            "message":
            "Lock password must contain at least 4 characters"

        }), 400

    password_hash = hashlib.sha256(
        password.encode()
    ).hexdigest()

    result = notes.update_one(

        {
            "_id":
            object_id,

            "user_email":
            current_user["email"]
        },

        {
            "$set": {

                "lock_hash":
                password_hash

            }
        }
    )

    if result.matched_count == 0:

        return jsonify({
            "message":
            "Note not found"
        }), 404

    return jsonify({

        "message":
        "Note locked successfully"

    }), 200


# =========================================================
# UNLOCK NOTE
# =========================================================

@app.route(
    "/notes/<note_id>/unlock",
    methods=["POST"]
)
@token_required
def unlock_note(current_user, note_id):

    try:

        object_id = ObjectId(
            note_id
        )

    except Exception:

        return jsonify({
            "message":
            "Invalid note ID"
        }), 400

    data = request.get_json(
        silent=True
    ) or {}

    password = str(
        data.get(
            "password",
            ""
        )
    )

    note = notes.find_one({

        "_id":
        object_id,

        "user_email":
        current_user["email"]

    })

    if not note:

        return jsonify({
            "message":
            "Note not found"
        }), 404

    saved_hash = note.get(
        "lock_hash"
    )

    if not saved_hash:

        return jsonify({
            "message":
            "Note is not locked"
        }), 400

    entered_hash = hashlib.sha256(
        password.encode()
    ).hexdigest()

    if entered_hash != saved_hash:

        return jsonify({
            "message":
            "Incorrect password"
        }), 401

    return jsonify({

        "message":
        "Note unlocked successfully"

    }), 200


# =========================================================
# REMOVE NOTE LOCK
# =========================================================

@app.route(
    "/notes/<note_id>/unlock",
    methods=["DELETE"]
)
@token_required
def remove_lock(current_user, note_id):

    try:

        object_id = ObjectId(
            note_id
        )

    except Exception:

        return jsonify({
            "message":
            "Invalid note ID"
        }), 400

    result = notes.update_one(

        {
            "_id":
            object_id,

            "user_email":
            current_user["email"]
        },

        {
            "$unset": {
                "lock_hash": ""
            }
        }
    )

    if result.matched_count == 0:

        return jsonify({
            "message":
            "Note not found"
        }), 404

    return jsonify({

        "message":
        "Note unlocked"

    }), 200


# =========================================================
# PDF UPLOAD
# =========================================================

@app.route(
    "/notes/<note_id>/upload-pdf",
    methods=["POST"]
)
@token_required
def upload_pdf(current_user, note_id):

    try:

        object_id = ObjectId(
            note_id
        )

    except Exception:

        return jsonify({
            "message":
            "Invalid note ID"
        }), 400

    note = notes.find_one({

        "_id":
        object_id,

        "user_email":
        current_user["email"]

    })

    if not note:

        return jsonify({
            "message":
            "Note not found"
        }), 404

    file = request.files.get(
        "file"
    )

    if not file:

        return jsonify({
            "message":
            "PDF file is required"
        }), 400

    filename = file.filename.lower()

    if not filename.endswith(".pdf"):

        return jsonify({
            "message":
            "Only PDF files are allowed"
        }), 400

    safe_filename = (

        str(object_id)

        + "_"

        + datetime.datetime.now().strftime(
            "%Y%m%d%H%M%S"
        )

        + ".pdf"
    )

    file.save(
        UPLOAD_FOLDER /
        safe_filename
    )

    pdf_url = (
        "/uploads/"
        + safe_filename
    )

    notes.update_one(

        {
            "_id":
            object_id,

            "user_email":
            current_user["email"]
        },

        {
            "$set": {

                "pdf_url":
                pdf_url,

                "updated_at":
                datetime.datetime.now(
                    datetime.timezone.utc
                )
            }
        }
    )

    return jsonify({

        "message":
        "PDF uploaded successfully",

        "pdf_url":
        pdf_url

    }), 200


# =========================================================
# SERVE PDF FILE
# =========================================================

@app.route(
    "/uploads/<path:filename>"
)
def serve_pdf(filename):

    return send_from_directory(
        UPLOAD_FOLDER,
        filename
    )


# =========================================================
# RUN APPLICATION
# =========================================================

if __name__ == "__main__":

    print("--------------------------------------")
    print("SMART NOTES BACKEND")
    print("--------------------------------------")
    print("Server: http://127.0.0.1:5000")
    print("Database: notes_app_db")
    print("--------------------------------------")

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )