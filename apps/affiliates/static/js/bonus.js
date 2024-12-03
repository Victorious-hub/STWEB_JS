document.addEventListener("DOMContentLoaded", function() {
    const bonusButton = document.getElementById("bonus-button");
    const bonusMessage = document.getElementById("bonus-message");

    bonusButton.addEventListener("click", function() {
        const selectedContacts = document.querySelectorAll(".select-contact:checked");
        const lastNames = Array.from(selectedContacts).map(checkbox => {
            return checkbox.closest("tr").querySelector("td:nth-child(4)").textContent;
        });

        if (lastNames.length > 0) {
            bonusMessage.textContent = `Bonus awarded to: ${lastNames.join(", ")}`;
        } else {
            bonusMessage.textContent = "No contacts selected for bonus.";
        }
    });
});