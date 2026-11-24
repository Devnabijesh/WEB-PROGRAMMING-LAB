
from flask import Flask, render_template, request, redirect, session, flash
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = "my_secret_key"

def connect():
    return sqlite3.connect("users.db")

def create_table():
    con = connect()
    con.execute("""
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            email TEXT UNIQUE,
            password TEXT
        )
    """)
    con.commit()
    con.close()

@app.route("/")
def home():
    if "user" in session:
        return redirect("/dashboard")
    return redirect("/login")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"].strip()
        email = request.form["email"].strip()
        password = request.form["password"]

        if not username or not email or len(password) < 8:
            flash("Enter all details. Password must be at least 8 characters.")
            return redirect("/register")

        hashed_password = generate_password_hash(password)

        try:
            con = connect()
            con.execute(
                "INSERT INTO users(username, email, password) VALUES(?,?,?)",
                (username, email, hashed_password)
            )
            con.commit()
            con.close()

            flash("Registration successful! Please log in.")
            return redirect("/login")

        except sqlite3.IntegrityError:
            flash("Username or email already exists.")
            return redirect("/register")

    return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"].strip()
        password = request.form["password"]

        con = connect()
        user = con.execute(
            "SELECT * FROM users WHERE username=?", (username,)
        ).fetchone()
        con.close()

        if user and check_password_hash(user[3], password):
            session["user"] = user[1]
            return redirect("/dashboard")

        flash("Invalid username or password.")

    return render_template("login.html")

@app.route("/dashboard")
def dashboard():
    if "user" not in session:
        return redirect("/login")

    return render_template("dashboard.html", username=session["user"])

@app.route("/logout")
def logout():
    session.pop("user", None)
    flash("You have logged out successfully.")
    return redirect("/login")

if __name__ == "__main__":
    create_table()
    app.run(debug=True)
