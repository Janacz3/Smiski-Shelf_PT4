document.addEventListener("DOMContentLoaded", async () => {
    const postFeed = document.querySelector("#postFeed"); // Ensure this exists
    if (!postFeed) {
        console.error("❌ #postFeed container not found!");
        return;
    }

    async function retrievePosts() {
        try {
            const response = await fetch("http://localhost:3000/posts");
            const postsData = await response.json();

            if (Array.isArray(postsData)) {
                renderPosts(postsData);
            }
        } catch (error) {
            console.error("🚨 Error fetching posts:", error);
        }
    }

    function renderPosts(posts) {
        const postFeed = document.querySelector("#postFeed");
        postFeed.innerHTML = ""; // Clear previous posts
    
        posts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
    
            postElement.innerHTML = `
                <div class="post-header">
                    <img src="../../../no-profile.png" alt="User Profile">
                    <span class="username">${post.username}</span>
                    <span class="timestamp">• ${post.timestamp}</span>
                </div>
                <p>${post.text}</p>
                <div class="post-footer">
                    <span class="like"><i class="fa fa-heart"></i> ${post.likes}</span>
                    <span class="comment"><i class="fa fa-comment"></i> ${post.comments}</span>
                    <span class="retweet"><i class="fa fa-retweet"></i> ${post.retweets}</span>
                </div>
            `;
    
            postFeed.appendChild(postElement);
        });
    }
    

    retrievePosts();
});
