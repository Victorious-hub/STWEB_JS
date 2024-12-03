document.addEventListener("DOMContentLoaded", function() {
    const addContactLink = document.getElementById("add-contact-link");
    const popupOverlay = document.getElementById("popup-overlay");
    const popupForm = document.getElementById("popup-form");
    const newContactForm = document.getElementById("new-contact-form");

    addContactLink.addEventListener("click", function(event) {
        event.preventDefault();
        popupOverlay.style.display = "block";
        popupForm.style.display = "block";
    });

    popupOverlay.addEventListener("click", function() {
        popupOverlay.style.display = "none";
        popupForm.style.display = "none";
    });

    newContactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        popupOverlay.style.display = "none";
        popupForm.style.display = "none";
    });
});