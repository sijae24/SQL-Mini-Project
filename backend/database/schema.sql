-- User Table
CREATE TABLE User (
    userID INTEGER PRIMARY KEY AUTOINCREMENT,
    userName TEXT NOT NULL,
    phoneNumber TEXT UNIQUE NOT NULL CHECK (length(phoneNumber) >= 10),
    email TEXT UNIQUE NOT NULL CHECK (email LIKE '%@%.%' AND length(email) >= 5)
);



-- Personnel Table
CREATE TABLE Personnel (
    userID INTEGER PRIMARY KEY,
    position TEXT NOT NULL,
    salary REAL NOT NULL CHECK (salary >= 0),
    FOREIGN KEY (userID) REFERENCES User(userID),
    CHECK (
        NOT (position = 'volunteer' AND salary != 0)
    )
);

-- LibraryItem Table
CREATE TABLE LibraryItem (
    itemID INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    itemType TEXT NOT NULL,           -- Book, CD, Magazine, Journal
    availability INTEGER NOT NULL CHECK (availability >= 0),
    location TEXT NOT NULL,           -- Physical or Online

    ISBN TEXT UNIQUE,                 -- for Books
    author TEXT,                      -- for Books
    trackCount INTEGER,              -- for CDs
    artist TEXT,                      -- for CDs
    issueNumber TEXT,                -- for Magazines
    ISSN TEXT UNIQUE                 -- for Journals
);

-- Donates Table
CREATE TABLE Donates (
    donationID INTEGER PRIMARY KEY,
    userID INTEGER,
    itemID INTEGER,
    donationDate DATE DEFAULT (DATE('now')),
    FOREIGN KEY (userID) REFERENCES User(userID),
    FOREIGN KEY (itemID) REFERENCES LibraryItem(itemID)
);


-- Borrows Table 
CREATE TABLE Borrows (
    borrowID INTEGER PRIMARY KEY,
    userID INTEGER NOT NULL,
    itemID INTEGER NOT NULL,
    borrowDate DATE NOT NULL,
    dueDate DATE NOT NULL,
    returnDate DATE,
    fine REAL DEFAULT 0 CHECK (fine >= 0),
    status TEXT NOT NULL,
    FOREIGN KEY (userID) REFERENCES User(userID),
    FOREIGN KEY (itemID) REFERENCES LibraryItem(itemID)
);

-- Prevent duplicate active borrows
CREATE UNIQUE INDEX unique_active_borrow
ON Borrows(userID, itemID)
WHERE returnDate IS NULL;

-- Room Table
CREATE TABLE Room (
    roomID INTEGER PRIMARY KEY,
    roomName TEXT NOT NULL,
    capacity INTEGER NOT NULL CHECK (capacity > 0)
);

-- Event Table
CREATE TABLE Event (
    eventID INTEGER PRIMARY KEY,
    eventName TEXT NOT NULL,
    eventType TEXT NOT NULL,
    audience TEXT,
    date DATE NOT NULL,
    personnelID INTEGER NOT NULL,
    roomID INTEGER NOT NULL,
    FOREIGN KEY (personnelID) REFERENCES Personnel(userID),
    FOREIGN KEY (roomID) REFERENCES Room(roomID)
);

-- HelpRequest Table
CREATE TABLE HelpRequest (
    requestID INTEGER PRIMARY KEY,
    userID INTEGER NOT NULL,
    request TEXT NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY (userID) REFERENCES User(userID)
);

-- Attends Table
CREATE TABLE Attends (
    userID INTEGER NOT NULL,
    eventID INTEGER NOT NULL,
    PRIMARY KEY (userID, eventID),
    FOREIGN KEY (userID) REFERENCES User(userID),
    FOREIGN KEY (eventID) REFERENCES Event(eventID)
);

-- FutureItem Table
CREATE TABLE FutureItem (
    itemID INTEGER PRIMARY KEY,
    arrivalDate DATE NOT NULL,
    FOREIGN KEY (itemID) REFERENCES LibraryItem(itemID)
);