document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Unauthorized! Please log in first.");
        window.location.href = "/login.html"; // Redirect to login
        return;
    }

    fetch("http://localhost:3000/dashboard", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Invalid token") {
            alert("Session expired. Please log in again.");
            localStorage.removeItem("token"); // Clear invalid token
            window.location.href = "/login.html";
        } else {
            console.log("Dashboard Loaded:", data);
            document.getElementById("welcomeMessage").innerText = `Welcome, ${data.user.email}`;
        }
    })
    .catch(error => console.error("Error:", error));
});

document.addEventListener("DOMContentLoaded", function () {
    const greetingSpan = document.querySelector(".greeting");
    const username = localStorage.getItem("username");

    if (username) {
        greetingSpan.textContent = `Hello, ${username}!`; // ✅ Display username
    } else {
        greetingSpan.textContent = "Hello, User!";
    }
});