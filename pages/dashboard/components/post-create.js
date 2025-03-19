document.addEventListener("DOMContentLoaded", function () {
    // Create the HTML structure dynamically
    const postInputContainer = document.createElement("div");
    postInputContainer.classList.add("post-input");

    // Add stylesheet dynamically
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
            <input type="text" class="post-input-field" placeholder="What's on your mind?">

            <!-- Post Options -->
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
                <textarea id="postContent" placeholder="What's on your mind, ${storedUsername}?" class="modal-textarea"></textarea>

                <!-- File Upload -->
                <input type="file" id="fileInput" multiple>

                <!-- Post Options -->
                <div class="post-options">
                    <div class="post-option"><img src="../../../live.png" alt="Live video"> Live video</div>
                    <div class="post-option"><img src="../../../photos.png" alt="Photo/video"> Photo/video</div>
                    <div class="post-option"><img src="../../../feeling.png" alt="Feeling/activity"> Feeling/activity</div>
                </div>
                
                <button id="postButton" class="post-button">Post</button>
            </div>
        </div>
    </div>`;

    const container = document.querySelector("#postContainer"); 
    if (container) {
        container.appendChild(postInputContainer);
    } else {
        console.error("Container #postContainer not found!");
    }

    // Modal functionality
    const smallPostInput = document.getElementById("smallPostInput");
    const postModal = document.getElementById("postModal");
    const closeModal = document.querySelector(".close-modal");
    const postButton = document.getElementById("postButton");

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

    // Handle post submission
    postButton.addEventListener("click", async function () {
        const text = document.getElementById("postContent").value.trim();
        const fileInput = document.getElementById("fileInput");
        const files = fileInput.files;
    
        if (!text && files.length === 0) {
            alert("Post content or a file is required.");
            return;
        }
    
        const formData = new FormData();
        formData.append("text", text);  // ✅ Changed from "content" to "text"
        for (let i = 0; i < files.length; i++) {
            formData.append("media", files[i]);
        }
    
        // Retrieve token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to post.");
            return;
        }
    
        try {
            const response = await fetch("/create-post", {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${token}` // ✅ No manual Content-Type (FormData handles it)
                }
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert("✅ Post created successfully!");
                displayPost(data.post);
                postModal.style.display = "none";
            } else {
                alert("❌ Failed to create post: " + data.error);
            }
        } catch (error) {
            console.error("🚨 Error creating post:", error);
            alert("Something went wrong. Please try again.");
        }
    });
    
    

    // Function to display the post dynamically
    function displayPost(post) {
        const postFeed = document.querySelector("#postFeed");
        if (!postFeed) {
            console.error("Container #postFeed not found!");
            return;
        }
    
        const postElement = document.createElement("div");
        postElement.classList.add("post");
    
        let mediaContent = "";
        if (post.media && post.media.length > 0) { // ✅ Check if post.media exists
            mediaContent = `<div class="post-media">${post.media.map(file => `<img src="/uploads/${file}" alt="Post Image">`).join("")}</div>`;
        }
    
        postElement.innerHTML = `
            <div class="post-header">
                <img src="../../../no-profile.png" alt="User Profile">
                <span class="username">${post.username}</span>
            </div>
            <p>${post.content}</p>
            ${mediaContent}
        `;
    
        postFeed.prepend(postElement);
    }
    

    console.log("✅ post-create.js loaded!");
});
