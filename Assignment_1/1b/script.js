function validateForm() {
    var name = document.getElementById("Name").value;
    var username = document.getElementById("Username").value;
    var password = document.getElementById("Password").value;
    var email = document.getElementById("Email").value;

    if (
        
        name === "" ||
        username === "" ||
        password === "" ||
        email === "" 
    ) {
        alert("Please fill in all required fields");
        return false;
    }

   
    if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
        alert("Please enter a valid name with only letters");
        return false;
    }
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        alert("Please enter a valid email address");
        return false;
    }

    if (
        !password ||
        password.length < 8
    ) {
        alert(
            "Please enter a valid password with at least 8 characters, one digit, and one special character"
        );
        return false;
    }

    return true;
}


// script.js

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault();

        if (validateForm()) {

            var name = document.getElementById("Name").value;
            var username = document.getElementById("Username").value;
            var password = document.getElementById("Password").value;
            var email = document.getElementById("Email").value;
            var gender = document.querySelector('input[name="Gender"]:checked') ? document.querySelector('input[name="Gender"]:checked').value : "";


            var user = {
                name: name,
                username: username,
                password: password,
                email: email,
                gender: gender,
            };


            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://127.0.0.1:5500", true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {

                    console.log(xhr.responseText);
                }
            };


            var userJSON = JSON.stringify(user);

            // Send the POST request with user data
            xhr.send(userJSON);


            var users = JSON.parse(localStorage.getItem("users")) || [];
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));


            window.location.href = "data-list.html";
        }
    });
});
