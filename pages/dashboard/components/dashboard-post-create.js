document.addEventListener("DOMContentLoaded", function() {
    const postModal = document.getElementById("postModal");
    const modalTrigger = document.querySelector(".post-modal-trigger input");
    const closeModal = document.getElementById("closeModal");

    if (modalTrigger && postModal && closeModal) {
        modalTrigger.addEventListener("click", () => {
            postModal.style.display = "flex";
        });

        closeModal.addEventListener("click", () => {
            postModal.style.display = "none";
        });

        window.addEventListener("click", (event) => {
            if (event.target === postModal) {
                postModal.style.display = "none";
            }
        });
    } else {
        console.error("Modal elements not found. Check HTML structure.");
    }
});
