// Function to open/close the modal
function toggleModal(modalId, show) {
    const modal = document.getElementById(modalId);
    if (show) {
        modal.classList.add('is-active');
    } else {
        modal.classList.remove('is-active');
    }
}

// Add event listener to the Sign Up button
document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.querySelector('.button.is-primary');
    signUpButton.addEventListener('click', () => toggleModal('signupModal', true));
});

// Add event listener to the Login button
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.button.is-light');
    loginButton.addEventListener('click', () => toggleModal('loginModal', true));
});

