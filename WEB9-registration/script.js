
function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

document.getElementById("registerForm").onsubmit = function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    document.getElementById("nameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";

    let valid = true;

    if (name === "") {
        document.getElementById("nameError").innerHTML = "Name is required";
        valid = false;
    }

    if (!validEmail(email)) {
        document.getElementById("emailError").innerHTML = "Enter valid email";
        valid = false;
    }

    if (password.length < 8) {
        document.getElementById("passwordError").innerHTML =
            "Password must contain at least 8 characters";
        valid = false;
    }

    if (valid) alert("Registration successful!");
};

document.getElementById("loginForm").onsubmit = function(e) {
    e.preventDefault();

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value;

    document.getElementById("loginEmailError").innerHTML = "";
    document.getElementById("loginPasswordError").innerHTML = "";

    let valid = true;

    if (!validEmail(email)) {
        document.getElementById("loginEmailError").innerHTML =
            "Enter valid email";
        valid = false;
    }

    if (password === "") {
        document.getElementById("loginPasswordError").innerHTML =
            "Password is required";
        valid = false;
    }

    if (valid) alert("Login successful!");
};
