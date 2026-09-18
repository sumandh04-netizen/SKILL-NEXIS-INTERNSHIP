from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from functools import wraps
import jwt
import datetime
import os


# ==========================================
# LOAD ENVIRONMENT VARIABLES
# ==========================================

load_dotenv()


# ==========================================
# CREATE FLASK APPLICATION
# ==========================================

app = Flask(__name__)

# Allow frontend to communicate with backend
CORS(app)

bcrypt = Bcrypt(app)


# ==========================================
# CONFIGURATION
# ==========================================

MONGO_URI = os.getenv(
    "MONGO_URI",
    "mongodb://localhost:27017/"
)

JWT_SECRET = os.getenv(
    "JWT_SECRET",
    "change_this_secret_key"
)


# ==========================================
# MONGODB CONNECTION
# ==========================================

try:

    client = MongoClient(
        MONGO_URI,
        serverSelectionTimeoutMS=5000
    )

    # Test MongoDB connection
    client.admin.command("ping")

    print("MongoDB connected successfully!")

except Exception as e:

    print("MongoDB connection failed!")
    print("Error:", e)


# Database
db = client["authentication_db"]

# Collection
users = db["users"]


# ==========================================
# JWT TOKEN VERIFICATION
# ==========================================

def token_required(function):

    @wraps(function)
    def decorated(*args, **kwargs):

        # Get Authorization header
        auth_header = request.headers.get(
            "Authorization"
        )

        # Check token exists
        if not auth_header:

            return jsonify({
                "message":
                "Authorization token is required"
            }), 401


        # Check Bearer format
        if not auth_header.startswith("Bearer "):

            return jsonify({
                "message":
                "Use Bearer token format"
            }), 401


        # Extract token
        token = auth_header.split(
            " ",
            1
        )[1]


        try:

            # Decode JWT
            data = jwt.decode(
                token,
                JWT_SECRET,
                algorithms=["HS256"]
            )


            # Find user
            current_user = users.find_one({
                "email": data["email"]
            })


            if not current_user:

                return jsonify({
                    "message":
                    "User not found"
                }), 401


        except jwt.ExpiredSignatureError:

            return jsonify({
                "message":
                "Token has expired"
            }), 401


        except jwt.InvalidTokenError:

            return jsonify({
                "message":
                "Invalid token"
            }), 401


        # Continue to protected route
        return function(
            current_user,
            *args,
            **kwargs
        )


    return decorated


# ==========================================
# HOME ROUTE
# ==========================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({

        "message":
        "User Authentication API is running",

        "status":
        "success",

        "endpoints": [

            "GET /",

            "POST /register",

            "POST /login",

            "GET /profile"

        ]

    }), 200


# ==========================================
# REGISTER USER
# ==========================================

@app.route(
    "/register",
    methods=["POST"]
)
def register():

    # Get JSON data
    data = request.get_json(
        silent=True
    ) or {}


    # Get values
    name = str(
        data.get("name", "")
    ).strip()

    email = str(
        data.get("email", "")
    ).strip().lower()

    password = str(
        data.get("password", "")
    )


    # ======================================
    # VALIDATION
    # ======================================

    if not name:

        return jsonify({
            "message":
            "Name is required"
        }), 400


    if not email:

        return jsonify({
            "message":
            "Email is required"
        }), 400


    if not password:

        return jsonify({
            "message":
            "Password is required"
        }), 400


    # Name validation
    if len(name) < 2:

        return jsonify({
            "message":
            "Name must contain at least 2 characters"
        }), 400


    # Password validation
    if len(password) < 6:

        return jsonify({
            "message":
            "Password must contain at least 6 characters"
        }), 400


    # Simple email validation
    if "@" not in email or "." not in email:

        return jsonify({
            "message":
            "Please enter a valid email address"
        }), 400


    # ======================================
    # CHECK EXISTING USER
    # ======================================

    existing_user = users.find_one({
        "email": email
    })


    if existing_user:

        return jsonify({
            "message":
            "User already exists"
        }), 409


    # ======================================
    # HASH PASSWORD
    # ======================================

    password_hash = (
        bcrypt
        .generate_password_hash(password)
        .decode("utf-8")
    )


    # ======================================
    # CREATE USER
    # ======================================

    user = {

        "name": name,

        "email": email,

        "password": password_hash

    }


    # Insert into MongoDB
    users.insert_one(user)


    return jsonify({

        "message":
        "User registered successfully"

    }), 201


# ==========================================
# LOGIN USER
# ==========================================

@app.route(
    "/login",
    methods=["POST"]
)
def login():

    # Get JSON data
    data = request.get_json(
        silent=True
    ) or {}


    # Get values
    email = str(
        data.get("email", "")
    ).strip().lower()

    password = str(
        data.get("password", "")
    )


    # ======================================
    # VALIDATION
    # ======================================

    if not email or not password:

        return jsonify({

            "message":
            "Email and password are required"

        }), 400


    # ======================================
    # FIND USER
    # ======================================

    user = users.find_one({

        "email": email

    })


    if not user:

        return jsonify({

            "message":
            "Invalid email or password"

        }), 401


    # ======================================
    # CHECK PASSWORD
    # ======================================

    password_valid = (
        bcrypt
        .check_password_hash(
            user["password"],
            password
        )
    )


    if not password_valid:

        return jsonify({

            "message":
            "Invalid email or password"

        }), 401


    # ======================================
    # CREATE JWT TOKEN
    # ======================================

    now = datetime.datetime.now(
        datetime.timezone.utc
    )


    token = jwt.encode(

        {

            "email": email,

            "iat": now,

            "exp":
            now + datetime.timedelta(
                hours=1
            )

        },

        JWT_SECRET,

        algorithm="HS256"

    )


    # ======================================
    # RETURN TOKEN
    # ======================================

    return jsonify({

        "message":
        "Login successful",

        "token":
        token

    }), 200


# ==========================================
# PROTECTED PROFILE ROUTE
# ==========================================

@app.route(
    "/profile",
    methods=["GET"]
)
@token_required
def profile(current_user):

    return jsonify({

        "message":
        "Access granted",

        "user": {

            "name":
            current_user["name"],

            "email":
            current_user["email"]

        }

    }), 200


# ==========================================
# LOGOUT INFORMATION
# ==========================================

@app.route(
    "/logout",
    methods=["POST"]
)
@token_required
def logout(current_user):

    return jsonify({

        "message":
        "Logout successful. Remove the JWT token from the client."

    }), 200


# ==========================================
# RUN APPLICATION
# ==========================================

if __name__ == "__main__":

    print("--------------------------------------")
    print("User Authentication API")
    print("--------------------------------------")
    print("Server: http://127.0.0.1:5000")
    print("MongoDB: authentication_db")
    print("--------------------------------------")

    app.run(

        host="127.0.0.1",

        port=5000,

        debug=True

    )