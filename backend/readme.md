📚 Library Management System – Backend

This is the backend for the Mini-Project. It uses **Flask** (Python) and **SQLite** as the database. The backend exposes a complete RESTful API that supports all required operations for the frontend React application.

As already noted in the Setup Instructions:


1️⃣ Clone the Repository & Navigate to Backend Folder

        cd backend

2️⃣ Create a Virtual Environment and Activate It

        Windows:
            python -m venv venv
            venv\Scripts\activate
            
        Mac/Linux:

            python3 -m venv venv
            source venv/bin/activate

3️⃣ Install Dependencies

        pip install -r requirements.txt

4️⃣ Run the Flask Server

        python app.py

The backend should now be running at:

        http://127.0.0.1:5000/
        
API ENDPOINTS OVERVIEW:

| Method     | Endpoint                      | Description                   |
|------------|-------------------------------|-------------------------------|
| GET        | `/api/users`                  | Get all users                 |
| POST       | `/api/users`                  | Add a new user                |
| PUT        | `/api/users/<id>`             | Update an existing user       |
| DELETE     | `/api/users/<id>`             | Delete a user                 |
| GET        | `/api/personnel`              | Get all personnel             |
| POST       | `/api/personnel`              | Add a new personnel           |
| PUT        | `/api/personnel/<id>`         | Update a personnel            |
| DELETE     | `/api/personnel/<id>`         | Delete a personnel            |
| GET        | `/api/libraryitems`           | List all library items        |
| POST       | `/api/libraryitems`           | Add a new library item        |
| PUT        | `/api/libraryitems/<id>`      | Update a library item         |
| DELETE     | `/api/libraryitems/<id>`      | Delete a library item         |
| GET        | `/api/donates`                | Get all donations             |
| POST       | `/api/donates`                | Add a new donation            |
| DELETE     | `/api/donates/<id>`           | Delete a donation             |
| GET        | `/api/borrows`                | Get all borrow records        |
| POST       | `/api/borrows`                | Add a new borrow              |
| PUT        | `/api/borrows/<id>`           | Update a borrow record        |
| DELETE     | `/api/borrows/<id>`           | Delete a borrow record        |
| GET        | `/api/events`                 | Get all events                |
| POST       | `/api/events`                 | Add a new event               |
| PUT        | `/api/events/<id>`            | Update an event               |
| DELETE     | `/api/events/<id>`            | Delete an event               |
| GET        | `/api/rooms`                  | Get all rooms                 |
| POST       | `/api/rooms`                  | Add a new room                |
| PUT        | `/api/rooms/<id>`             | Update a room                 |
| DELETE     | `/api/rooms/<id>`             | Delete a room                 |
| GET        | `/api/helprequests`           | Get all help requests         |
| POST       | `/api/helprequests`           | Submit a help request         |
| PUT        | `/api/helprequests/<id>`      | Update a help request         |
| DELETE     | `/api/helprequests/<id>`      | Delete a help request         |
| GET        | `/api/attends`                | Get all event attendances     |
| POST       | `/api/attends`                | Add an attendance record      |
| DELETE     | `/api/attends`                | Remove an attendance record   |
| GET        | `/api/futureitems`            | Get all future items          |
| POST       | `/api/futureitems`            | Add a new future item         |
| PUT        | `/api/futureitems/<id>`       | Update a future item          |
| DELETE     | `/api/futureitems/<id>`       | Delete a future item          |

Includes:
- Users
- Personnel
- Events
- Borrows
- Donates
- Rooms
- Help Requests
- Future Items
- Attends


TRIGGERS:

The database uses SQLite triggers for:

    Auto-setting arrival dates on FutureItem donations

    Decreasing availability when borrowed

    Increasing availability when returned

    Auto-applying fines for late returns
