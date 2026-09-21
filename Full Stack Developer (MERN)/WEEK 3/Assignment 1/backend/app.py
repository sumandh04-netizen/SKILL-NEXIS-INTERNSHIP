from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
from functools import wraps
from bson import ObjectId
from dotenv import load_dotenv
import jwt
import datetime
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

bcrypt = Bcrypt(app)

# =====================================================
# CONFIGURATION
# =====================================================

MONGO_URI = os.getenv(
    "MONGO_URI",
    "mongodb://localhost:27017/"
)

JWT_SECRET = os.getenv(
    "JWT_SECRET",
    "your_super_secret_key"
)

client = MongoClient(MONGO_URI)
db = client["todo_application"]

users = db["users"]
todos = db["todos"]


# =====================================================
# JWT TOKEN
# =====================================================

def create_token(user_id):

    payload = {
        "user_id": str(user_id),
        "exp": datetime.datetime.now(datetime.timezone.utc)
               + datetime.timedelta(hours=24)
    }

    return jwt.encode(
        payload,
        JWT_SECRET,
        algorithm="HS256"
    )


def token_required(f):

    @wraps(f)
    def decorated(*args, **kwargs):

        token = None

        auth_header = request.headers.get("Authorization")

        if auth_header:

            try:
                token = auth_header.split(" ")[1]
            except IndexError:
                return jsonify({
                    "message": "Invalid authorization header"
                }), 401

        if not token:
            return jsonify({
                "message": "Token is missing"
            }), 401

        try:

            data = jwt.decode(
                token,
                JWT_SECRET,
                algorithms=["HS256"]
            )

            current_user = users.find_one({
                "_id": ObjectId(data["user_id"])
            })

            if not current_user:
                return jsonify({
                    "message": "User not found"
                }), 401

        except jwt.ExpiredSignatureError:

            return jsonify({
                "message": "Token has expired"
            }), 401

        except Exception:

            return jsonify({
                "message": "Invalid token"
            }), 401

        return f(current_user, *args, **kwargs)

    return decorated


# =====================================================
# HOME
# =====================================================

@app.route("/")
def home():

    return jsonify({
        "message": "Full Stack To-Do API is running"
    })


# =====================================================
# REGISTER
# =====================================================

@app.route("/api/register", methods=["POST"])
def register():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:

        return jsonify({
            "message": "All fields are required"
        }), 400

    existing_user = users.find_one({
        "email": email
    })

    if existing_user:

        return jsonify({
            "message": "Email already registered"
        }), 409

    hashed_password = bcrypt.generate_password_hash(
        password
    ).decode("utf-8")

    user = {
        "name": name,
        "email": email,
        "password": hashed_password,
        "created_at": datetime.datetime.now(datetime.timezone.utc)
    }

    result = users.insert_one(user)

    return jsonify({
        "message": "Registration successful",
        "user_id": str(result.inserted_id)
    }), 201


# =====================================================
# LOGIN
# =====================================================

@app.route("/api/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:

        return jsonify({
            "message": "Email and password are required"
        }), 400

    user = users.find_one({
        "email": email
    })

    if not user:

        return jsonify({
            "message": "Invalid email or password"
        }), 401

    if not bcrypt.check_password_hash(
        user["password"],
        password
    ):

        return jsonify({
            "message": "Invalid email or password"
        }), 401

    token = create_token(user["_id"])

    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"]
        }
    })


# =====================================================
# GET CURRENT USER
# =====================================================

@app.route("/api/me", methods=["GET"])
@token_required
def get_current_user(current_user):

    return jsonify({
        "id": str(current_user["_id"]),
        "name": current_user["name"],
        "email": current_user["email"]
    })


# =====================================================
# CREATE TODO
# =====================================================

@app.route("/api/todos", methods=["POST"])
@token_required
def create_todo(current_user):

    data = request.get_json()

    title = data.get("title")
    description = data.get("description", "")

    if not title:

        return jsonify({
            "message": "Title is required"
        }), 400

    todo = {
        "user_id": current_user["_id"],
        "title": title,
        "description": description,
        "completed": False,
        "created_at": datetime.datetime.now(datetime.timezone.utc)
    }

    result = todos.insert_one(todo)

    return jsonify({
        "message": "Todo created successfully",
        "todo_id": str(result.inserted_id)
    }), 201


# =====================================================
# GET TODOS
# =====================================================

@app.route("/api/todos", methods=["GET"])
@token_required
def get_todos(current_user):

    user_todos = todos.find({
        "user_id": current_user["_id"]
    }).sort("created_at", -1)

    result = []

    for todo in user_todos:

        result.append({
            "id": str(todo["_id"]),
            "title": todo["title"],
            "description": todo.get("description", ""),
            "completed": todo.get("completed", False)
        })

    return jsonify(result)


# =====================================================
# UPDATE TODO
# =====================================================

@app.route("/api/todos/<todo_id>", methods=["PUT"])
@token_required
def update_todo(current_user, todo_id):

    data = request.get_json()

    try:
        object_id = ObjectId(todo_id)
    except Exception:

        return jsonify({
            "message": "Invalid Todo ID"
        }), 400

    todo = todos.find_one({
        "_id": object_id,
        "user_id": current_user["_id"]
    })

    if not todo:

        return jsonify({
            "message": "Todo not found"
        }), 404

    update_data = {}

    if "title" in data:
        update_data["title"] = data["title"]

    if "description" in data:
        update_data["description"] = data["description"]

    if "completed" in data:
        update_data["completed"] = data["completed"]

    todos.update_one(
        {
            "_id": object_id,
            "user_id": current_user["_id"]
        },
        {
            "$set": update_data
        }
    )

    return jsonify({
        "message": "Todo updated successfully"
    })


# =====================================================
# DELETE TODO
# =====================================================

@app.route("/api/todos/<todo_id>", methods=["DELETE"])
@token_required
def delete_todo(current_user, todo_id):

    try:
        object_id = ObjectId(todo_id)
    except Exception:

        return jsonify({
            "message": "Invalid Todo ID"
        }), 400

    result = todos.delete_one({
        "_id": object_id,
        "user_id": current_user["_id"]
    })

    if result.deleted_count == 0:

        return jsonify({
            "message": "Todo not found"
        }), 404

    return jsonify({
        "message": "Todo deleted successfully"
    })


# =====================================================
# LOGOUT
# =====================================================

@app.route("/api/logout", methods=["POST"])
@token_required
def logout(current_user):

    return jsonify({
        "message": "Logout successful"
    })


# =====================================================
# RUN APPLICATION
# =====================================================

if __name__ == "__main__":

    app.run(
        debug=True,
        port=5000
    )