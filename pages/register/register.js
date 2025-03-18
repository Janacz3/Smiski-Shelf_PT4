document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("register-form");
    const message = document.getElementById("message");
    const goToLoginBtn = document.getElementById("go-to-login");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!email || !password) {
            message.textContent = "All fields are required!";
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            message.textContent = data.message;

        } catch (error) {
            message.textContent = "Error registering!";
            console.error("Error:", error);
        }
    });

    // ✅ Handle Redirect to Login When Clicked
    goToLoginBtn.addEventListener("click", function () {
        window.location.href = "../login/login.html";
    });
});
