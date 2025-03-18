document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("register-form");
    const message = document.getElementById("message");
    const goToLoginBtn = document.getElementById("go-to-login");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value; // ✅ Added username
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!username || !email || !password) {
            message.textContent = "All fields are required!";
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }) // ✅ Include username
            });

            const data = await response.json();
            message.textContent = data.message;

            if (response.ok) {
                setTimeout(() => {
                    window.location.href = "../login/login.html"; // ✅ Redirect after successful registration
                }, 2000);
            }

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
