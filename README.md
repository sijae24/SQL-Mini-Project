# Library Management System

A simple Library Management System built using **React (Vite) for the frontend** and **Flask for the backend**, styled with **TailwindCSS and DaisyUI**.


## 🚀 Setup Instructions


### 1️⃣ Backend Setup (Flask API)
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Create a virtual environment and activate it:
   - **Windows:**
     ```sh
     python -m venv venv
     venv\Scripts\activate
     ```
   if there are any errors with powershell, 
   ``` sh
   Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope CurrentUser
   ```
   - **Mac/Linux:**
     ```sh
     python -m venv venv
     source venv/bin/activate
     ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Run the Flask server:
   ```sh
   python app.py
   ```
   The backend should now be running at `http://127.0.0.1:5000/`

---

### 2️⃣ Frontend Setup (React + Vite)
1. Navigate to the frontend folder in another terminal:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React development server:
   ```sh
   npm run dev
   ```
   The frontend should now be running at `http://localhost:5173/`

---
## ✅ Running the Full Application
When the **backend (Flask)** and **frontend (React)** are now running, you can open your browser and go to
```
http://localhost:5173/
```
---
## 🔍 How to Test the Application
Once both the frontend and backend are running, follow these steps to test each feature:

1️⃣ Sign In or Sign Up
```sh
Go to http://localhost:5173/

Use an existing user (e.g., ashton.hall@outlook.com) or sign up with a new account.
```
2️⃣ Browse & Borrow Items
```sh
Visit the "Browse" tab.

Filter items by type or search by title.

Click "Borrow" on any available item.

Go to "Borrowed" tab to see active borrows.
```
3️⃣ Return an Item
```sh
Click "Return" in the "Borrowed" tab.

If returned late, the system will:

Automatically apply a fine.

Update the status to "returned late".
```
4️⃣ Donate Items (Click Library Icon in Top Left to Return to Home Page)
```sh   
Case 1: New Item

Go to "Donate" → "Donate New Item".

Fill out title, type, author, etc.

Arrival will be set to 7 days later.

Appears in Upcoming Donations.

Case 2: Existing Item with Availability > 0

Choose "Donate Existing Item".

Pick an item that is still available.

Only logged in Donates table.

Case 3: Existing Item with Availability = 0

Donate again → gets added to FutureItem.
```
5️⃣ Register for an Event
```sh   
Go to the "Events" tab.

Click "Register" on any event.

If there is space, the user will receive a success message at the top of the page.

If full, the user will receive an error message at the top of the page.
```
6️⃣ Volunteer
```sh     
Visit "Volunteer" tab.

If the user is not already part of the personnel, the user can click on register as a volunteer.

Once registered, you are added to the Personnel table as position = Volunteer.
```
7️⃣ Help Center
```sh 
Navigate to "Help" tab (three lines in top left corner).

Submit a help request.

Track status: Open, In Progress, Resolved.
```
---
## 🛠 Built With

### 🎨 Frontend  
[![ReactJS](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/) [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/) [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)  

### 🖥️ Backend  
[![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)  

### 🗄 Database  
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)  

---
