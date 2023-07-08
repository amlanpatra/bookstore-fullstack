import sqlite3
import json


def createTablesAndAddDummyData():
    conn = sqlite3.connect("database.db")  # Connect to the SQLite

    # create table "book"
    conn.execute(
        "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY, title TEXT, author TEXT,description TEXT, cover_image TEXT, price REAL, rating REAL, category TEXT, genre TEXT, publication_date TEXT)"
    )

    # create table "user"
    conn.execute(
        "CREATE TABLE IF NOT EXISTS users (userid INTEGER PRIMARY KEY, username TEXT)"
    )

    # create table "cartItems"
    conn.execute(
        "CREATE TABLE IF NOT EXISTS cartitems(userid INTEGER, bookid INTEGER, FOREIGN KEY (userid) REFERENCES users(userid), FOREIGN KEY (bookid) references books(id))"
    )

    # insert data into table "books"
    conn.execute(
        "INSERT INTO books (id, title, author,description, cover_image, price, rating, category, genre, publication_date) VALUES (?,?,?,?,?,?,?,?,?,?)",
        (
            12,
            "G2z",
            "book author",
            "book description",
            "https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJlZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
            100.10,
            3,
            "fiction",
            "biography",
            "2023-01-01",
        ),
    )
    conn.execute(
        "INSERT INTO books (id, title, author,description, cover_image, price, rating, category, genre, publication_date) VALUES (?,?,?,?,?,?,?,?,?,?)",
        (
            13,
            "Gomez",
            "G2z",
            "book description",
            "https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJlZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
            100.10,
            3,
            "fiction",
            "romance",
            "2023-01-01",
        ),
    )

    # insert data into table "users"
    conn.execute(
        "INSERT INTO users (userid, username) VALUES (?,?)",
        (101, "Amlan"),
    )

    # insert data into table "cartitems"
    conn.execute(
        "INSERT INTO cartitems (userid, bookid) VALUES (?,?)",
        (101, 13),
    )

    conn.commit()
    conn.close()


def executeQuery(query="SELECT * FROM books"):
    # print(query)
    try:
        conn = sqlite3.connect("database.db")
        cursor = conn.execute(query)
        if "SELECT" not in query.upper().split()[0]:
            conn.commit()
            conn.close()
            return

        rows = cursor.fetchall()
        conn.commit()
        conn.close()
        results = []
        for row in rows:
            result = {}
            for idx, col in enumerate(cursor.description):
                result[col[0]] = row[idx]
            results.append(result)
        json_data = json.dumps(results)

        # log = "\n".join(row for row in rows)
        # print(f"result for query : {query} : {rows}")
        return results

    except Exception as e:
        print(f"error : {e}")
