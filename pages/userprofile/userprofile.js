const displayName = document.getElementById("display-name");
const displayEmail = document.getElementById("display-email");
const profileName = document.getElementById("profile-name");
const profileUsername = document.getElementById("profile-username");
const profileEmail = document.getElementById("profile-email");

// 🔹 Get user info from localStorage (set during login)
const username = localStorage.getItem("username") || "User";
const email = localStorage.getItem("email") || "email@example.com";

// ✅ Update UI with user details
displayName.textContent = username;
profileName.textContent = username;
profileUsername.textContent = username;
displayEmail.textContent = email;
profileEmail.textContent = email;

function goBack() {
    window.location.href = "../dashboard/dashboard.html"; // Change this to your actual dashboard file
}

