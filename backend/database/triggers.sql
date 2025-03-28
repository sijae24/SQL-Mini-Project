import sqlite3
conn = sqlite3.connect("database/library.db")
c = conn.cursor()
c.execute("""
    SELECT itemID, title
    FROM LibraryItem
    WHERE itemType = 'FutureItem'
    AND itemID NOT IN (SELECT itemID FROM FutureItem);
""")
print(c.fetchall())
conn.close()
