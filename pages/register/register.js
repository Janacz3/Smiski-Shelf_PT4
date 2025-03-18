document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");
    const googleLoginBtn = document.getElementById("google-login-btn");

    // Handle manual registration (email & password)
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const response = await fetch("/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            alert("Registration successful! You can now log in.");
            window.location.href = "/dashboard"; // Redirect to dashboard
        } else {
            alert("Error: " + data.message);
        }
    });

    // Google OAuth Login
    googleLoginBtn.addEventListener("click", function () {
        window.location.href = "/auth/google"; // Redirect to backend Google Auth route
    });
});
