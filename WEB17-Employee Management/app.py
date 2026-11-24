
from flask import Flask, render_template, request, redirect
import sqlite3

app = Flask(__name__)

def connect():
    return sqlite3.connect("employees.db")

def create_table():
    con = connect()
    con.execute("""
        CREATE TABLE IF NOT EXISTS employees(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            department TEXT,
            salary REAL
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
        department = request.form["department"]
        salary = request.form["salary"]

        con.execute(
            "INSERT INTO employees(name,email,department,salary) VALUES(?,?,?,?)",
            (name, email, department, salary)
        )
        con.commit()

    search = request.args.get("search", "")

    employees = con.execute(
        "SELECT * FROM employees WHERE name LIKE ? OR CAST(id AS TEXT) LIKE ?",
        ('%' + search + '%', '%' + search + '%')
    ).fetchall()

    con.close()
    return render_template("index.html", employees=employees, search=search)

@app.route("/edit/<int:id>", methods=["GET", "POST"])
def edit(id):
    con = connect()

    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]
        department = request.form["department"]
        salary = request.form["salary"]

        con.execute(
            "UPDATE employees SET name=?, email=?, department=?, salary=? WHERE id=?",
            (name, email, department, salary, id)
        )
        con.commit()
        con.close()
        return redirect("/")

    employee = con.execute(
        "SELECT * FROM employees WHERE id=?", (id,)
    ).fetchone()

    con.close()
    return render_template("edit.html", employee=employee)

@app.route("/delete/<int:id>", methods=["POST"])
def delete(id):
    con = connect()
    con.execute("DELETE FROM employees WHERE id=?", (id,))
    con.commit()
    con.close()
    return redirect("/")

if __name__ == "__main__":
    create_table()
    app.run(debug=True)
