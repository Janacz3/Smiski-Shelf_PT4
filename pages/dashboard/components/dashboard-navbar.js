document.addEventListener("DOMContentLoaded", function () {
    console.log("JS Loaded!"); // Debugging step

    const profilePic = document.getElementById("profilePic");
    const dropdownMenu = document.getElementById("dropdownMenu");

    if (!profilePic || !dropdownMenu) {
        console.error("Profile picture or dropdown menu not found!");
        return;
    }

    profilePic.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevents closing when clicking the profile
        dropdownMenu.classList.toggle("hidden");
        console.log("Dropdown toggled"); // Debugging step
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!profilePic.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.add("hidden");
        }
    });
});
