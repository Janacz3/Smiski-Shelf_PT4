document.addEventListener("DOMContentLoaded", async () => {
    // Create the post feed container
    const postFeed = document.createElement("div");
    postFeed.id = "postFeed";
    postFeed.classList.add("post-feed");
    document.body.appendChild(postFeed);

    // Fetch and display posts
    async function retrievePosts() {
        try {
            const response = await fetch("http://localhost:3000/posts"); // Adjust API URL
            const postsData = await response.json();

            if (Array.isArray(postsData)) {
                renderPosts(postsData);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    function renderPosts(posts) {
        postFeed.innerHTML = ""; // Clear existing posts

        posts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");

            postElement.innerHTML = `
                <div class="post-header">
                    <span class="username">${post.creatorID.name}</span>
                    <span class="timestamp">${new Date(post.createdAt).toLocaleString()}</span>
                </div>
                <div class="post-content">${post.text}</div>
            `;

            postFeed.appendChild(postElement);
        });
    }

    // Append CSS dynamically
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "styles.css"; // Ensure the CSS file is correctly linked
    document.head.appendChild(link);

    // Fetch and render posts on page load
    retrievePosts();
});
