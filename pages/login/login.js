document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const verificationCode = document.getElementById("verification-code")?.value;

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, verificationCode }),
        });

        const data = await response.json();

        if (response.ok) {
            if (data.requireVerification) {
                // Show verification code section
                document.getElementById("verification-section").style.display = "block";
                document.getElementById("verification-code").focus();
            } else {
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username);
                window.location.href = "/dashboard/dashboard.html";
            }
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("Something went wrong. Please try again.");
    }
});