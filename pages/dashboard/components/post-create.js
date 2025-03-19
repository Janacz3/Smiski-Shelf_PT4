document.addEventListener("DOMContentLoaded", function () {
    // Create the HTML structure dynamically
    const postInputContainer = document.createElement("div");
    postInputContainer.classList.add("post-input");

    // Create and append the stylesheet dynamically
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/pages/dashboard/components/styles/post-create.css";
    document.head.appendChild(link);

    // Retrieve the username from localStorage
    const storedUsername = localStorage.getItem("username") || "User";

    postInputContainer.innerHTML = `
    <div>
        <!-- Small Post Input Box -->
        <div id="smallPostInput" class="post-create-container">
            <div class="user-profile">
                <img src="../../../no-profile.png" alt="User Profile">
                <span class="username">${storedUsername}</span>
            </div>
            <input type="text" class="post-input" placeholder="What's on your mind?">

            <!-- Post Options (Visible in Small Post Box) -->
            <div class="post-options">
                <div class="post-option"><img src="../../../live.png" alt="Live video"> Live video</div>
                <div class="post-option"><img src="../../../photos.png" alt="Photo/video"> Photo/video</div>
                <div class="post-option"><img src="../../../feeling.png" alt="Feeling/activity"> Feeling/activity</div>
            </div>
        </div>

        <!-- Modal -->
        <div id="postModal" class="modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Create post</h2>
                <div class="user-profile">
                    <img src="../../../no-profile.png" alt="User Profile">
                    <span class="username">${storedUsername}</span>
                </div>
                <textarea placeholder="What's on your mind, ${storedUsername}?" class="modal-textarea"></textarea>
                
                <!-- Post Options (Inside Modal) -->
                <div class="post-options">
                    <div class="post-option"><img src="../../../live.png" alt="Live video"> Live video</div>
                    <div class="post-option"><img src="../../../photos.png" alt="Photo/video"> Photo/video</div>
                    <div class="post-option"><img src="../../../feeling.png" alt="Feeling/activity"> Feeling/activity</div>
                </div>
                
                <button class="post-button">Post</button>
            </div>
        </div>
    </div>`;

    const container = document.querySelector("#postContainer"); // Ensure your HTML has this container
    if (container) {
        container.appendChild(postInputContainer);
    } else {
        console.error("Container #postContainer not found!");
    }

    // Modal functionality
    const smallPostInput = document.getElementById("smallPostInput");
    const postModal = document.getElementById("postModal");
    const closeModal = document.querySelector(".close-modal");

    if (smallPostInput && postModal && closeModal) {
        smallPostInput.addEventListener("click", function () {
            postModal.style.display = "flex";
        });

        closeModal.addEventListener("click", function () {
            postModal.style.display = "none";
        });

        window.addEventListener("click", function (event) {
            if (event.target === postModal) {
                postModal.style.display = "none";
            }
        });
    }

    console.log("post-create.js loaded!");
});
