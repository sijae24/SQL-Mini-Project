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
| POST       | `/login`                      | User login                    |
| POST       | `/register`                   | Register a new user           |
| POST       | `/check-personnel`            | Check personnel status        |
| POST       | `/volunteer`                  | Add a volunteer               |
| GET        | `/library-items`              | List all library items        |
| GET        | `/borrowed-items/<user_id>`   | Get borrowed items for user   |
| POST       | `/borrow`                     | Borrow an item                |
| POST       | `/return`                     | Return a borrowed item        |
| GET        | `/returned-items/<user_id>`   | Get returned items for user   |
| GET        | `/api/donates`                | Get all donations             |
| POST       | `/donate-item`                | Donate an item                |
| POST       | `/process-arrivals`           | Process future item arrivals  |
| GET        | `/future-items`               | Get all future items          |
| POST       | `/add-future-item`            | Add a new future item         |
| GET        | `/events`                     | Get all events                |
| GET        | `/registered-events/<user_id>`| Get registered events for user|
| POST       | `/register-event`             | Register to an event          |
| POST       | `/unregister-event`           | Unregister from an event      |
| POST       | `/help`                       | Submit a help request         |
| GET        | `/previous-requests/<user_id>`| Get previous help requests    |
| GET        | `/`                           | API status check              |

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
