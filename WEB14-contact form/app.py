
from flask import Flask, render_template, request
import sqlite3

app = Flask(__name__, template_folder="templates")

@app.route("/", methods=["GET", "POST"])
def home():
    success = ""

    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]
        message = request.form["message"]

        con = sqlite3.connect("contact.db")
        con.execute("""
            CREATE TABLE IF NOT EXISTS contacts(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT,
                message TEXT
            )
        """)
        con.execute(
            "INSERT INTO contacts(name,email,message) VALUES(?,?,?)",
            (name, email, message)
        )
        con.commit()
        con.close()

        success = "Message submitted successfully!"

    return render_template("index.html", success=success)

if __name__ == "__main__":
    app.run(debug=True)

