from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DATABASE = "database/library.db"

# -------------------- USERS --------------------
@app.route("/api/users", methods=["GET"])
def get_users():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT userID, userName, email FROM User")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([{"userID": r[0], "userName": r[1], "email": r[2]} for r in rows])

@app.route("/api/users", methods=["POST"])
def add_user():
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO User (userName, phoneNumber, email) VALUES (?, ?, ?)",
                   (data["userName"], data["phoneNumber"], data["email"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "User added successfully"}), 201

# -------------------- LIBRARY ITEMS --------------------
@app.route("/api/libraryitems")
def get_library_items():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM LibraryItem")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([{
        "itemID": r[0], "title": r[1], "itemType": r[2], "availability": r[3],
        "location": r[4], "ISBN": r[5], "author": r[6], "artist": r[7],
        "trackCount": r[8], "issueNumber": r[9], "ISSN": r[10]
    } for r in rows])

@app.route("/api/libraryitems", methods=["POST"])
def add_library_item():
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO LibraryItem 
        (title, itemType, availability, location, ISBN, author, artist, trackCount, issueNumber, ISSN) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (data["title"], data["itemType"], data["availability"], data["location"],
          data.get("ISBN"), data.get("author"), data.get("artist"), 
          data.get("trackCount"), data.get("issueNumber"), data.get("ISSN")))
    conn.commit()
    conn.close()
    return jsonify({"message": "Library item added"}), 201

# -------------------- BORROWS --------------------
@app.route("/api/borrows", methods=["POST"])
def add_borrow():
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO Borrows (userID, itemID, borrowDate, dueDate, returnDate, fine, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)""",
        (data["userID"], data["itemID"], data["borrowDate"], data["dueDate"],
         data.get("returnDate"), data.get("fine", 0), data["status"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "Borrow record added successfully"}), 201

@app.route("/api/borrows/<int:borrow_id>", methods=["PUT"])
def update_borrow(borrow_id):
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE Borrows SET userID=?, itemID=?, borrowDate=?, dueDate=?, returnDate=?, fine=?, status=?
        WHERE borrowID=?""",
        (data["userID"], data["itemID"], data["borrowDate"], data["dueDate"],
         data.get("returnDate"), data["fine"], data["status"], borrow_id))
    conn.commit()
    conn.close()
    return jsonify({"message": "Borrow record updated"})

# -------------------- DONATES --------------------
@app.route("/api/donates", methods=["POST"])
def add_donation():
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO Donates (userID, itemID, donationDate)
        VALUES (?, ?, ?)""",
        (data["userID"], data["itemID"], data["donationDate"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "Donation recorded"}), 201

# -------------------- EVENTS --------------------
@app.route("/api/events")
def get_events():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Event")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([{
        "eventID": r[0], "eventName": r[1], "eventType": r[2], "audience": r[3],
        "date": r[4], "personnelID": r[5], "roomID": r[6]
    } for r in rows])

# -------------------- VOLUNTEER (Personnel) --------------------
@app.route("/api/personnel", methods=["POST"])
def add_volunteer():
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Personnel (userID, position, salary) VALUES (?, ?, ?)",
                   (data["userID"], data["position"], data["salary"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "Volunteer added"}), 201

# -------------------- HELP REQUEST --------------------
@app.route("/api/helprequests", methods=["POST"])
def add_help_request():
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO HelpRequest (userID, request, status) VALUES (?, ?, ?)",
                   (data["userID"], data["request"], data["status"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "Help request added"}), 201
# -------------------- ATTENDS --------------------
@app.route("/api/attends", methods=["POST"])
def add_attendance():
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Attends (userID, eventID) VALUES (?, ?)",
                   (data["userID"], data["eventID"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "Attendance recorded"}), 201

@app.route("/")
def home():
    return "Library Management System API is running!"

if __name__ == "__main__":
    app.run(debug=True)
