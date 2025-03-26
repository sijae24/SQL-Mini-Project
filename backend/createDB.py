import sqlite3


def create_database():
    # Connect to SQLite database
    conn = sqlite3.connect("library.db")
    cursor = conn.cursor()

    # Enable foreign key constraints
    cursor.execute("PRAGMA foreign_keys = ON")

    # Create tables
    create_tables(cursor)

    # Commit and close connection
    conn.commit()
    conn.close()
    print("Database created successfully!")


def create_tables(cursor):
    # User table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS User (
        userID INTEGER PRIMARY KEY AUTOINCREMENT,
        userName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL CHECK(
            email LIKE '%@%.%' AND  
            length(email) >= 5      
        ),
        phoneNumber TEXT NOT NULL CHECK(length(phoneNumber) >= 10)
    )   
    """)

    # Personnel table (subclass of User)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Personnel (
        personnelID INTEGER PRIMARY KEY,
        position TEXT NOT NULL,
        salary REAL DEFAULT 0,
        FOREIGN KEY (personnelID) REFERENCES User(userID)
    )
    """)

    # LibraryItem table (superclass)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS LibraryItem (
        itemID INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        itemType TEXT NOT NULL CHECK(itemType IN ('Book', 'CD', 'Magazine', 'Journal', 'FutureItem')),
        location TEXT NOT NULL,
        availability INTEGER DEFAULT 1 CHECK(availability >= 0)
    )
    """)

    # Book table (subclass)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Book (
        itemID INTEGER PRIMARY KEY,
        ISBN TEXT UNIQUE NOT NULL,
        author TEXT NOT NULL,
        FOREIGN KEY (itemID) REFERENCES LibraryItem(itemID)
    )
    """)

    # CD table (subclass)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS CD (
        itemID INTEGER PRIMARY KEY,
        trackCount INTEGER NOT NULL CHECK(trackCount > 0),
        artist TEXT NOT NULL,
        FOREIGN KEY (itemID) REFERENCES LibraryItem(itemID)
    )
    """)

    # Magazine table (subclass)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Magazine (
        itemID INTEGER PRIMARY KEY,
        issueNumber INTEGER NOT NULL,
        FOREIGN KEY (itemID) REFERENCES LibraryItem(itemID)
    )
    """)

    # Journal table (subclass)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Journal (
        itemID INTEGER PRIMARY KEY,
        ISSN TEXT UNIQUE NOT NULL,
        FOREIGN KEY (itemID) REFERENCES LibraryItem(itemID)
    )
    """)

    # FutureItem table (subclass)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS FutureItem (
        itemID INTEGER PRIMARY KEY,
        arrivalDate DATE NOT NULL CHECK(arrivalDate >= date('now')),
        FOREIGN KEY (itemID) REFERENCES LibraryItem(itemID)
    )
    """)

    # Room table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Room (
        roomID INTEGER PRIMARY KEY AUTOINCREMENT,
        roomName TEXT NOT NULL UNIQUE,
        capacity INTEGER NOT NULL CHECK(capacity > 0)
    )
    """)

    # Event table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Event (
        eventID INTEGER PRIMARY KEY AUTOINCREMENT,
        personnelID INTEGER NOT NULL,
        roomID INTEGER NOT NULL,
        eventName TEXT NOT NULL,
        eventType TEXT NOT NULL,
        audience TEXT NOT NULL,
        date DATE NOT NULL CHECK(date >= DATE('now')),
        FOREIGN KEY (personnelID) REFERENCES Personnel(personnelID),
        FOREIGN KEY (roomID) REFERENCES Room(roomID)
    )
    """)

    # Borrows table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Borrows (
        borrowID INTEGER PRIMARY KEY AUTOINCREMENT,
        userID INTEGER NOT NULL,
        itemID INTEGER NOT NULL,
        borrowDate DATE DEFAULT CURRENT_TIMESTAMP,
        dueDate DATE NOT NULL CHECK(dueDate > borrowDate),
        returnDate DATE,
        fine REAL DEFAULT 0 CHECK(fine >= 0),
        status TEXT NOT NULL DEFAULT 'Active' CHECK(status IN ('Active', 'Returned', 'Overdue')),
        FOREIGN KEY (userID) REFERENCES User(userID),
        FOREIGN KEY (itemID) REFERENCES LibraryItem(itemID),
        UNIQUE(userID, itemID)
    )
    """)

    # Attends table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Attends (
        userID INTEGER NOT NULL,
        eventID INTEGER NOT NULL,
        PRIMARY KEY (userID, eventID),
        FOREIGN KEY (userID) REFERENCES User(userID),
        FOREIGN KEY (eventID) REFERENCES Event(eventID)
    )
    """)

    # HelpRequest table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS HelpRequest (
        requestID INTEGER PRIMARY KEY AUTOINCREMENT,
        userID INTEGER NOT NULL,
        request TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'Open' CHECK(status IN ('Open', 'In Progress', 'Resolved')),
        FOREIGN KEY (userID) REFERENCES User(userID)
    )
    """)


if __name__ == "__main__":
    create_database()
