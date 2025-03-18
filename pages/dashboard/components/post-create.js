console.log("post-create.js loaded!");

document.addEventListener("DOMContentLoaded", function () {
    // Create the HTML structure dynamically
    const postInputContainer = document.createElement('div');
    postInputContainer.classList.add('post-input');

    // Create and append the stylesheet dynamically
    const link = document.createElement("link"); // Define link here
    link.rel = "stylesheet";
    link.href = "./pages/dashboard/components/styles/post-create.css";
    document.head.appendChild(link); // Append to head

    postInputContainer.innerHTML = `
      <div>
        <div class="flex-centered-container">
          <div class="user-circle">
            <img src="/images/usericon.png" alt="user">
          </div>
          <div class="home-post-modal">
            <div class="w-full">
              <input class="w-full" type="text" placeholder="What's on your mind?">
            </div>
          </div>
        </div>
        <div class="post-options">
          <i class="material-icons option-icon">live_tv</i> Live video
          <i class="material-icons option-icon">photo_camera</i> Photo/video
          <i class="fa fa-smile option-icon"></i> Feeling/activity
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
