from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
from datetime import datetime, timedelta


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
@app.route("/library-items", methods=["GET"])
def get_library_items():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("""
        SELECT 
            li.itemID, li.title, li.itemType, li.availability, li.location, 
            li.ISBN, li.author, li.artist, li.trackCount, li.issueNumber, li.ISSN
        FROM LibraryItem li
        WHERE li.availability > 0
        ORDER BY 
            CASE li.itemType
                WHEN 'Book' THEN 1
                WHEN 'Magazine' THEN 2
                WHEN 'CD' THEN 3
                ELSE 4
            END;
    """)
    items = cursor.fetchall()
    conn.close()

    item_list = []
    for item in items:
        item_list.append({
            "itemID": item[0],
            "title": item[1],
            "itemType": item[2],
            "availability": item[3],
            "location": item[4],
            "ISBN": item[5],
            "author": item[6],
            "artist": item[7],
            "trackCount": item[8],
            "issueNumber": item[9],
            "ISSN": item[10]
        })

    return jsonify(item_list)

@app.route("/borrowed-items/<int:user_id>", methods=["GET"])
def get_borrowed_items(user_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("""
        SELECT li.itemID, li.title, li.itemType, li.author, li.artist, li.ISBN, li.ISSN, li.trackCount, li.location, b.borrowDate, b.dueDate
        FROM LibraryItem li
        JOIN Borrows b ON li.itemID = b.itemID
        WHERE b.userID = ? AND b.returnDate IS NULL
    """, (user_id,))
    rows = cursor.fetchall()
    conn.close()

    borrowed = []
    for row in rows:
        borrowed.append({
            "itemID": row[0],
            "title": row[1],
            "itemType": row[2],
            "author": row[3],
            "artist": row[4],
            "ISBN": row[5],
            "ISSN": row[6],
            "trackCount": row[7],
            "location": row[8],
            "borrowDate": row[9],
            "dueDate": row[10]
        })

    return jsonify(borrowed)
@app.route("/borrow", methods=["POST"])
def borrow_item():
    data = request.get_json()
    user_id = data.get("userID")
    item_id = data.get("itemID")

    print(f"📥 Backend received borrow request → user: {user_id}, item: {item_id}")

    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        cursor.execute("""
            SELECT COUNT(*) FROM Borrows 
            WHERE userID = ? AND returnDate IS NULL
        """, (user_id,))
        active_borrow_count = cursor.fetchone()[0]

        if active_borrow_count >= 5:
            return jsonify({
                "success": False,
                "message": "Borrow limit reached. You can only borrow up to 5 items."
            }), 400

        cursor.execute("SELECT availability FROM LibraryItem WHERE itemID = ?", (item_id,))
        availability = cursor.fetchone()
        print(f"📦 Current availability BEFORE borrow: {availability[0] if availability else 'N/A'}")

        if not availability or availability[0] <= 0:
            return jsonify({"success": False, "message": "Item not available"}), 400

        cursor.execute("""
            SELECT 1 FROM Borrows 
            WHERE userID = ? AND itemID = ? AND returnDate IS NULL
        """, (user_id, item_id))
        if cursor.fetchone():
            return jsonify({"success": False, "message": "You already borrowed this item."}), 400

        cursor.execute("""
            INSERT INTO Borrows (userID, itemID, borrowDate, dueDate, status)
            VALUES (?, ?, DATE('now'), DATE('now', '+14 days'), 'borrowed')
        """, (user_id, item_id))

        cursor.execute("SELECT title FROM LibraryItem WHERE itemID = ?", (item_id,))
        title = cursor.fetchone()[0]

        conn.commit()
        conn.close()

        return jsonify({
            "success": True,
            "message": "Item borrowed successfully",
            "title": title
        })

    except Exception as e:
        print("❌ Borrow error:", e)
        return jsonify({"success": False, "message": str(e)}), 500
@app.route("/return", methods=["POST"])
def return_item():
    data = request.get_json()
    user_id = data.get("userID")
    item_id = data.get("itemID")

    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        # Get the title BEFORE updating
        cursor.execute("SELECT title FROM LibraryItem WHERE itemID = ?", (item_id,))
        title_row = cursor.fetchone()
        title = title_row[0] if title_row else "Item"

        # Update borrow record
        cursor.execute("""
            UPDATE Borrows
            SET returnDate = DATE('now'), status = 'returned'
            WHERE userID = ? AND itemID = ? AND returnDate IS NULL
        """, (user_id, item_id))

        conn.commit()
        conn.close()

        return jsonify({
            "success": True,
            "message": "Item returned successfully.",
            "title": title
        })

    except Exception as e:
        print("Return error:", e)
        return jsonify({"success": False, "message": str(e)}), 500
@app.route("/returned-items/<int:user_id>", methods=["GET"])
def get_returned_items(user_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("""
        SELECT li.itemID, li.title, li.itemType, li.author, li.artist, li.ISBN, li.ISSN, li.trackCount, li.location, b.borrowDate, b.dueDate, b.returnDate, b.fine
        FROM LibraryItem li
        JOIN Borrows b ON li.itemID = b.itemID
        WHERE b.userID = ? AND b.returnDate IS NOT NULL
    """, (user_id,))
    rows = cursor.fetchall()
    conn.close()

    returned = []
    for row in rows:
        returned.append({
            "itemID": row[0],
            "title": row[1],
            "itemType": row[2],
            "author": row[3],
            "artist": row[4],
            "ISBN": row[5],
            "ISSN": row[6],
            "trackCount": row[7],
            "location": row[8],
            "borrowDate": row[9],
            "dueDate": row[10],
            "returnDate": row[11],
            "fine": row[12]
        })

    return jsonify(returned)



# -------------------- EVENTS --------------------




# -------------------- HELP REQUEST --------------------


# -------------------- ATTENDS --------------------

# -------------------- DONATES --------------------


@app.route("/future-items", methods=["GET"])
def get_future_items():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("""
        SELECT f.itemID, f.arrivalDate, l.title, l.itemType 
        FROM FutureItem f
        JOIN LibraryItem l ON f.itemID = l.itemID
        ORDER BY f.arrivalDate
    """)
    rows = cursor.fetchall()
    conn.close()

    future_items = []
    for row in rows:
        future_items.append({
            "itemID": row[0],
            "arrivalDate": row[1],
            "title": row[2],
            "itemType": row[3]
        })

    return jsonify(future_items)
@app.route("/add-future-item", methods=["POST"])
def add_future_item():
    data = request.get_json()

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO LibraryItem (title, itemType, availability, location, ISBN, author, artist, trackCount, issueNumber, ISSN)
        VALUES (?, ?, 0, 'TBD', ?, ?, ?, ?, ?, ?)
    """, (
        data.get("title"),
        data.get("itemType"),
        data.get("ISBN"),
        data.get("author"),
        data.get("artist"),
        data.get("trackCount"),
        data.get("issueNumber"),
        data.get("ISSN")
    ))
    new_id = cursor.lastrowid
    conn.commit()
    conn.close()

    return jsonify({"message": "Item added successfully", "itemID": new_id}), 201
@app.route("/donate-item", methods=["POST"])
def donate_item():
    data = request.get_json()
    user_id = data.get("userID")
    item_id = data.get("itemID")

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO Donates (userID, itemID, donationDate)
        VALUES (?, ?, DATE('now'))
    """, (user_id, item_id))

    conn.commit()
    conn.close()

    return jsonify({"message": "Donation recorded"}), 201

from datetime import datetime

@app.route("/process-arrivals", methods=["POST"])
def process_arrivals():
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        today = datetime.now().date()

        # Get all items from FutureItem where arrivalDate <= today
        cursor.execute("""
            SELECT itemID FROM FutureItem
            WHERE arrivalDate <= DATE('now')
        """)
        arrivals = cursor.fetchall()

        if not arrivals:
            conn.close()
            return jsonify({"message": "No items ready to be processed today."})

        # For each item: increase availability and remove from FutureItem
        for (item_id,) in arrivals:
            cursor.execute("""
                UPDATE LibraryItem
                SET availability = availability + 1
                WHERE itemID = ?
            """, (item_id,))

            cursor.execute("DELETE FROM FutureItem WHERE itemID = ?", (item_id,))

        conn.commit()
        conn.close()

        return jsonify({
            "message": f"{len(arrivals)} item(s) processed and moved to available.",
            "processedItemIDs": [item[0] for item in arrivals]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/", methods=["GET"])
def index():
    return jsonify({"message": "The api is running"})






if __name__ == "__main__":
    app.run(debug=True)

