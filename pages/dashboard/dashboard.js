//Open modal
document.addEventListener('DOMContentLoaded', () => {
    const createStoryButton = document.getElementById('createStoryButton');

    // Add click event listener to open the story modal
    createStoryButton.addEventListener('click', () => {
        if (typeof openStoryModal === 'function') {
            openStoryModal(); // Call the function from story-modal.js
        } else {
            console.error('openStoryModal function is not defined.');
        }
    });
});

//Close modal
document.addEventListener('DOMContentLoaded', () => {
    const closeModalButton = document.getElementById('closeModalButton');
    const overlay = document.getElementById('overlay');

    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeStoryModal);
    }

    if (overlay) {
        overlay.addEventListener('click', closeStoryModal); // Close modal when clicking on the overlay
    }
});