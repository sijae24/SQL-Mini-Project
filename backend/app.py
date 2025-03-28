from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DATABASE = "database/library.db"

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

@app.route("/api/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("UPDATE User SET userName = ?, phoneNumber = ?, email = ? WHERE userID = ?",
                   (data["userName"], data["phoneNumber"], data["email"], user_id))
    conn.commit()
    conn.close()
    return jsonify({"message": "User updated successfully"})

@app.route("/api/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM User WHERE userID = ?", (user_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "User deleted successfully"})

@app.route("/api/personnel")
def get_personnel():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Personnel")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([{"userID": r[0], "position": r[1], "salary": r[2]} for r in rows])
@app.route("/api/personnel", methods=["POST"])
def add_personnel():
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Personnel (userID, position, salary) VALUES (?, ?, ?)",
                   (data["userID"], data["position"], data["salary"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "Personnel added"}), 201

@app.route("/api/personnel/<int:user_id>", methods=["PUT"])
def update_personnel(user_id):
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("UPDATE Personnel SET position = ?, salary = ? WHERE userID = ?",
                   (data["position"], data["salary"], user_id))
    conn.commit()
    conn.close()
    return jsonify({"message": "Personnel updated"})

@app.route("/api/personnel/<int:user_id>", methods=["DELETE"])
def delete_personnel(user_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Personnel WHERE userID = ?", (user_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Personnel deleted"})

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

@app.route("/api/libraryitems/<int:item_id>", methods=["PUT"])
def update_library_item(item_id):
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE LibraryItem SET 
        title = ?, itemType = ?, availability = ?, location = ?, ISBN = ?, 
        author = ?, artist = ?, trackCount = ?, issueNumber = ?, ISSN = ?
        WHERE itemID = ?
    """, (data["title"], data["itemType"], data["availability"], data["location"],
          data.get("ISBN"), data.get("author"), data.get("artist"), 
          data.get("trackCount"), data.get("issueNumber"), data.get("ISSN"), item_id))
    conn.commit()
    conn.close()
    return jsonify({"message": "Library item updated"})

@app.route("/api/libraryitems/<int:item_id>", methods=["DELETE"])
def delete_library_item(item_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM LibraryItem WHERE itemID = ?", (item_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Library item deleted"})
@app.route("/api/donates")
def get_donates():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Donates")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([{
        "donationID": r[0], "userID": r[1], "itemID": r[2], "donationDate": r[3]
    } for r in rows])
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

@app.route("/api/donates/<int:donation_id>", methods=["DELETE"])
def delete_donation(donation_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Donates WHERE donationID=?", (donation_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Donation deleted"})

@app.route("/api/borrows")
def get_borrows():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Borrows")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([{
        "borrowID": r[0], "userID": r[1], "itemID": r[2], "borrowDate": r[3],
        "dueDate": r[4], "returnDate": r[5], "fine": r[6], "status": r[7]
    } for r in rows])

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

@app.route("/api/borrows/<int:borrow_id>", methods=["DELETE"])
def delete_borrow(borrow_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Borrows WHERE borrowID=?", (borrow_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Borrow record deleted"})

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
@app.route("/api/events", methods=["POST"])
def add_event():
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO Event 
        (eventName, eventType, audience, date, personnelID, roomID)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (data["eventName"], data["eventType"], data["audience"],
          data["date"], data["personnelID"], data["roomID"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "Event added"}), 201

@app.route("/api/events/<int:event_id>", methods=["PUT"])
def update_event(event_id):
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE Event SET 
        eventName = ?, eventType = ?, audience = ?, date = ?, 
        personnelID = ?, roomID = ?
        WHERE eventID = ?
    """, (data["eventName"], data["eventType"], data["audience"],
          data["date"], data["personnelID"], data["roomID"], event_id))
    conn.commit()
    conn.close()
    return jsonify({"message": "Event updated"})

@app.route("/api/events/<int:event_id>", methods=["DELETE"])
def delete_event(event_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Event WHERE eventID = ?", (event_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Event deleted"})

@app.route("/api/rooms")
def get_rooms():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Room")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([{"roomID": r[0], "roomName": r[1], "capacity": r[2]} for r in rows])
@app.route("/api/rooms", methods=["POST"])
def add_room():
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Room (roomName, capacity) VALUES (?, ?)",
                   (data["roomName"], data["capacity"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "Room added"}), 201

@app.route("/api/rooms/<int:room_id>", methods=["PUT"])
def update_room(room_id):
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("UPDATE Room SET roomName = ?, capacity = ? WHERE roomID = ?",
                   (data["roomName"], data["capacity"], room_id))
    conn.commit()
    conn.close()
    return jsonify({"message": "Room updated"})

@app.route("/api/rooms/<int:room_id>", methods=["DELETE"])
def delete_room(room_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Room WHERE roomID = ?", (room_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Room deleted"})

@app.route("/api/helprequests")
def get_help_requests():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM HelpRequest")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([{"requestID": r[0], "userID": r[1], "request": r[2], "status": r[3]} for r in rows])
@app.route("/api/helprequests", methods=["POST"])
def add_help_request():
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO HelpRequest (userID, request, status)
        VALUES (?, ?, ?)""",
        (data["userID"], data["request"], data["status"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "Help request added"}), 201

@app.route("/api/helprequests/<int:request_id>", methods=["PUT"])
def update_help_request(request_id):
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE HelpRequest SET userID=?, request=?, status=?
        WHERE requestID=?""",
        (data["userID"], data["request"], data["status"], request_id))
    conn.commit()
    conn.close()
    return jsonify({"message": "Help request updated"})

@app.route("/api/helprequests/<int:request_id>", methods=["DELETE"])
def delete_help_request(request_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM HelpRequest WHERE requestID=?", (request_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Help request deleted"})

@app.route("/api/attends")
def get_attends():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Attends")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([{"userID": r[0], "eventID": r[1]} for r in rows])
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

@app.route("/api/attends", methods=["DELETE"])
def delete_attendance():
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Attends WHERE userID=? AND eventID=?",
                   (data["userID"], data["eventID"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "Attendance removed"})

@app.route("/api/futureitems")
def get_future_items():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM FutureItem")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([{"itemID": r[0], "arrivalDate": r[1]} for r in rows])
@app.route("/api/futureitems", methods=["POST"])
def add_future_item():
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO FutureItem (itemID, arrivalDate) VALUES (?, ?)",
                   (data["itemID"], data["arrivalDate"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "Future item added"}), 201

@app.route("/api/futureitems/<int:item_id>", methods=["PUT"])
def update_future_item(item_id):
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("UPDATE FutureItem SET arrivalDate = ? WHERE itemID = ?",
                   (data["arrivalDate"], item_id))
    conn.commit()
    conn.close()
    return jsonify({"message": "Future item updated"})

@app.route("/api/futureitems/<int:item_id>", methods=["DELETE"])
def delete_future_item(item_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM FutureItem WHERE itemID = ?", (item_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Future item deleted"})

@app.route("/")
def home():
    return "Library Management System API is running!"


if __name__ == "__main__":
    app.run(debug=True)


