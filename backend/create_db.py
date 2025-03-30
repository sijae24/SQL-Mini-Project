import sqlite3
import os

def run_sql_script(cursor, filepath):
    with open(filepath, 'r') as f:
        sql = f.read()
        cursor.executescript(sql)

def create_database():
    base_path = os.path.join(os.path.dirname(__file__), "database")
    db_path = os.path.join(base_path, "library.db")
    conn = sqlite3.connect(db_path)
    conn.execute("PRAGMA foreign_keys = ON") 
    cursor = conn.cursor()

    run_sql_script(cursor, os.path.join(base_path, "schema.sql"))
    run_sql_script(cursor, os.path.join(base_path, "insertions.sql"))
    run_sql_script(cursor, os.path.join(base_path, "triggers.sql"))

    conn.commit()
    conn.close()
    print("Database created successfully!")

if __name__ == "__main__":
    create_database()
