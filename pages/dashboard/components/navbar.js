document.addEventListener("DOMContentLoaded", function () {
    // Dynamically add the CSS file
    const head = document.head;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/pages/dashboard/components/navbar.css"; // Ensure this path is correct
    head.appendChild(link);

    // Create a div element to hold the navbar
    const navbarContainer = document.createElement("div");
    navbarContainer.innerHTML = `
        <nav class="navbar">
            <div class="logosearch">
                <img src="/logo.png" class="dashboard-logo" alt="Logo">
                <div class="search-bar-container">
                    <input type="text" placeholder="Search" class="search-bar">
                    <i class="fas fa-search icon search-icon"></i>
                </div>
            </div>
            <div class="main-nav">
                <i class="fas fa-home icon"></i>
                <i class="fas fa-video icon"></i>
                <i class="fas fa-smile icon"></i>
            </div>
            <div class="profile-container">
                <div class="profile-pic" id="profile-pic"></div>
                <div class="dropdown-menu" id="dropdown-menu">
                    <div class="dropdown-item" id="user-name">👤 Username</div>
                    <div class="dropdown-item logout" id="logout-btn">🚪 Logout</div>
                </div>
            </div>
        </nav>
    `;

    // Append navbar to the body
    document.body.prepend(navbarContainer);

    // Add interactivity for the dropdown
    const profilePic = document.getElementById("profile-pic");
    const dropdownMenu = document.getElementById("dropdown-menu");
    const logoutBtn = document.getElementById("logout-btn");
    const userName = document.getElementById("user-name");

    // 🔹 Get username from localStorage (set during login)
    const username = localStorage.getItem("username");
    if (username) {
        userName.textContent = `👤 ${username}`; // ✅ Update username dynamically
    } else {
        userName.textContent = "👤 User";
    }

    // Toggle Dropdown
    profilePic.addEventListener("click", () => {
        dropdownMenu.classList.toggle("open");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (event) => {
        if (!profilePic.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove("open");
        }
    });

    // Handle Logout
    logoutBtn.addEventListener("click", () => {
        alert("Logging out...");
        localStorage.removeItem("username"); // ✅ Clear stored username
        localStorage.removeItem("token"); // ✅ Clear stored token
        window.location.href = "/login.html"; // ✅ Redirect to login page
    });
});
