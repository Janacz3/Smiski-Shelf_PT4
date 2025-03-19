document.addEventListener("DOMContentLoaded", function () {
    // Create the HTML structure dynamically
    const postInputContainer = document.createElement('div');
    postInputContainer.classList.add('post-input');

    // Create and append the stylesheet dynamically
    const link = document.createElement("link"); // Define link here
    link.rel = "stylesheet";
    link.href = "/pages/dashboard/components/styles/post-create.css";
    document.head.appendChild(link); // Append to head

    postInputContainer.innerHTML = `
    
<div>
    <!-- Small Post Input Box -->
    <div id="smallPostInput" class="post-create-container">
        <div class="user-profile">
            <img src="../../../no-profile.png" alt="User Profile">
            <span class="username">John Doe</span>
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
                <span class="username">John Doe</span>
            </div>
            <textarea placeholder="What's on your mind, John Doe?" class="modal-textarea"></textarea>
            
            <!-- Post Options (Inside Modal) -->
            <div class="post-options">
                <div class="post-option"><img src="../../../live.png" alt="Live video"> Live video</div>
                <div class="post-option"><img src="../../../photos.png" alt="Photo/video"> Photo/video</div>
                <div class="post-option"><img src="../../../feeling.png" alt="Feeling/activity"> Feeling/activity</div>
            </div>
            
            <button class="post-button">Post</button>
        </div>
    </div>
</div>


    `;

    const container = document.querySelector("#postContainer"); // Ensure your HTML has this container
    if (container) {
        container.appendChild(postInputContainer);
    } else {
        console.error("Container #postContainer not found!");
    }
    

    // JavaScript interaction (for example, focusing the input field)
    const inputField = document.querySelector(".home-post-modal input");

    if (inputField) {
        inputField.addEventListener("focus", () => {
            console.log("Input field focused");
        });
    }
});

console.log("post-create.js loaded!");

document.addEventListener("DOMContentLoaded", function () {
    const smallPostInput = document.getElementById("smallPostInput");
    const postModal = document.getElementById("postModal");
    const closeModal = document.querySelector(".close-modal");

    // Show modal when clicking the input box
    smallPostInput.addEventListener("click", function () {
        postModal.style.display = "flex";
    });

    // Close modal when clicking the close button
    closeModal.addEventListener("click", function () {
        postModal.style.display = "none";
    });

    // Close modal when clicking outside of it
    window.addEventListener("click", function (event) {
        if (event.target === postModal) {
            postModal.style.display = "none";
        }
    });
});

