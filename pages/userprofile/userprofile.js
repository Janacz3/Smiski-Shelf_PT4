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

function enableEditing() {
    document.getElementById("profile-name").style.display = "none";
    document.getElementById("edit-name").style.display = "inline";
    document.getElementById("edit-name").value = document.getElementById("profile-name").textContent;

    document.getElementById("profile-username").style.display = "none";
    document.getElementById("edit-username").style.display = "inline";
    document.getElementById("edit-username").value = document.getElementById("profile-username").textContent;

    document.getElementById("profile-email").style.display = "none";
    document.getElementById("edit-email").style.display = "inline";
    document.getElementById("edit-email").value = document.getElementById("profile-email").textContent;

    document.getElementById("profile-bio").style.display = "none";
    document.getElementById("edit-bio").style.display = "inline";
    document.getElementById("edit-bio").value = document.getElementById("profile-bio").textContent;

    document.querySelector(".save-button").style.display = "inline";
}

async function saveChanges() {
    const updatedData = {
        name: document.getElementById("edit-name").value,
        username: document.getElementById("edit-username").value,
        email: document.getElementById("edit-email").value,
        bio: document.getElementById("edit-bio").value
    };

    try {
        const response = await fetch("/update-profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById("profile-name").textContent = updatedData.name;
            document.getElementById("profile-name").style.display = "inline";
            document.getElementById("edit-name").style.display = "none";

            document.getElementById("profile-username").textContent = updatedData.username;
            document.getElementById("profile-username").style.display = "inline";
            document.getElementById("edit-username").style.display = "none";

            document.getElementById("profile-email").textContent = updatedData.email;
            document.getElementById("profile-email").style.display = "inline";
            document.getElementById("edit-email").style.display = "none";

            document.getElementById("profile-bio").textContent = updatedData.bio;
            document.getElementById("profile-bio").style.display = "inline";
            document.getElementById("edit-bio").style.display = "none";

            document.querySelector(".save-button").style.display = "none";
            alert("Profile updated successfully!");
        } else {
            throw new Error("Failed to update profile.");
        }
    } catch (error) {
        alert(error.message);
    }
}

