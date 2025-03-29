from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3


app = Flask(__name__)
CORS(app)


DATABASE = "database/library.db"


# -------------------- USERS --------------------
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    name = data.get("name")
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Check if user exists with matching email and name
    cursor.execute("SELECT userID, userName, email FROM User WHERE email = ? AND userName = ?", 
                  (email, name))
    user = cursor.fetchone()
    conn.close()
    
    if user:
        return jsonify({
            "success": True,
            "user": {
                "userID": user[0],
                "name": user[1],
                "email": user[2]
            }
        })
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO User (userName, phoneNumber, email) VALUES (?, ?, ?)",
                   (data["userName"], data["phoneNumber"], data["email"]))
    user_id = cursor.lastrowid  
    conn.commit()
    conn.close()
    return jsonify({
        "message": "User added successfully",
        "userID": user_id
    }), 201

# -------------------- Personnel --------------------
@app.route("/check-personnel", methods=["POST"])
def check_personnel():
    data = request.get_json()
    user_id = data.get("userID")
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Check if user exists in Personnel table (any position)
    cursor.execute("""
        SELECT position FROM Personnel 
        WHERE userID = ?
    """, (user_id,))
    
    result = cursor.fetchone()
    conn.close()
    
    if result:
        return jsonify({
            "success": True,
            "isPersonnel": True,
            "position": result[0]  # Returns the position of the user
        })
    else:
        return jsonify({
            "success": True,
            "isPersonnel": False,
            "position": None
        })

@app.route("/volunteer", methods=["POST"])
def add_volunteer():
    data = request.get_json()
    user_id = data.get("userID")
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
  
    # Check if already in Personnel table (any position)
    cursor.execute("""
        SELECT position FROM Personnel 
        WHERE userID = ?
    """, (user_id,))
    
    existing_record = cursor.fetchone()
    
    if existing_record:
        conn.close()
        return jsonify({
            "success": False,
            "message": f"User is already registered as {existing_record[0]}",
            "isPersonnel": True,
            "position": existing_record[0]
        }), 400
            
    # Add as volunteer
    cursor.execute("""
        INSERT INTO Personnel (userID, position, salary) 
        VALUES (?, 'Volunteer', 0)
    """, (user_id,))
    conn.commit()
    conn.close()
    
    return jsonify({
        "success": True,
        "message": "Volunteer added successfully",
        "isPersonnel": True,
        "position": "Volunteer"
    }), 201

# -------------------- LIBRARY ITEMS --------------------


# -------------------- EVENTS --------------------




# -------------------- HELP REQUEST --------------------


# -------------------- ATTENDS --------------------


@app.route("/", methods=["GET"])
def index():
    return jsonify({"message": "The api is running"})






if __name__ == "__main__":
    app.run(debug=True)

