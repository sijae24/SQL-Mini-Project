import sqlite3
import os

def run_sql_script(cursor, filepath):
    with open(filepath, "r", encoding="utf-8") as file:
        sql = file.read()
        cursor.executescript(sql)

def create_database():
    base_path = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(base_path, "database", "library.db")  

    if os.path.exists(db_path):
        os.remove(db_path)

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    run_sql_script(cursor, os.path.join(base_path, "database", "schema.sql"))
    run_sql_script(cursor, os.path.join(base_path, "database", "triggers.sql"))
    run_sql_script(cursor, os.path.join(base_path, "database", "insertions.sql"))

    conn.commit()
    conn.close()
    print("✅ Database created and initialized successfully.")


if __name__ == "__main__":
    create_database()
