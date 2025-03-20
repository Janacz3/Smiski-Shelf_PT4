import { openStoryModal, closeModalButton } from '/pages/dashboard/functions/create-stories/story-modal.js';

document.addEventListener('DOMContentLoaded', () => {
    const createStoryButton = document.getElementById('createStoryButton');
    const closeModalButtonElement = document.getElementById('closeModalButton');
    const overlay = document.getElementById('overlay');

    // Open modal
    if (createStoryButton) {
        createStoryButton.addEventListener('click', () => {
            openStoryModal();
        });
    }

    // Close modal
    if (closeModalButtonElement) {
        closeModalButtonElement.addEventListener('click', () => {
            closeModalButton();
        });
    }

    // Close modal when clicking on the overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            closeModalButton();
        });
    }
});