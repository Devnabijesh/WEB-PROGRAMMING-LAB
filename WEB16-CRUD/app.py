
from flask import Flask, render_template, request, redirect
import sqlite3

app = Flask(__name__)

def connect():
    return sqlite3.connect("records.db")

def create_table():
    con = connect()
    con.execute("""
        CREATE TABLE IF NOT EXISTS records(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT
        )
    """)
    con.commit()
    con.close()

@app.route("/", methods=["GET", "POST"])
def home():
    con = connect()

    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]

        con.execute(
            "INSERT INTO records(name, email) VALUES(?,?)",
            (name, email)
        )
        con.commit()

    records = con.execute("SELECT * FROM records").fetchall()
    con.close()

    return render_template("index.html", records=records)

@app.route("/edit/<int:id>", methods=["GET", "POST"])
def edit(id):
    con = connect()

    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]

        con.execute(
            "UPDATE records SET name=?, email=? WHERE id=?",
            (name, email, id)
        )
        con.commit()
        con.close()
        return redirect("/")

    record = con.execute(
        "SELECT * FROM records WHERE id=?", (id,)
    ).fetchone()

    con.close()
    return render_template("edit.html", record=record)

@app.route("/delete/<int:id>", methods=["POST"])
def delete(id):
    con = connect()
    con.execute("DELETE FROM records WHERE id=?", (id,))
    con.commit()
    con.close()

    return redirect("/")

if __name__ == "__main__":
    create_table()
    app.run(debug=True)
