document.addEventListener("DOMContentLoaded", function() {
    const tableBody = document.getElementById("contacts-table-body");
    const additionalBlock = document.getElementById("additional-block");
    const contactDescription = document.getElementById("contact-description");
    const contactFirstName = document.getElementById("contact-first-name");
    const contactEmail = document.getElementById("contact-email");
    const contactLastName = document.getElementById("contact-last-name");

    tableBody.addEventListener("click", function(event) {
        const row = event.target.closest("tr");
        if (row) {
            const cells = row.querySelectorAll("td");
            contactDescription.textContent = `Description: ${cells[0].textContent}`;
            contactFirstName.textContent = `First Name: ${cells[1].textContent}`;
            contactEmail.textContent = `Email: ${cells[2].textContent}`;
            contactLastName.textContent = `Last Name: ${cells[3].textContent}`;
            additionalBlock.style.display = "block";
        }
    });
});