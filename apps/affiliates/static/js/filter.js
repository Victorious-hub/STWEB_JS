document.addEventListener("DOMContentLoaded", function() {
    const filterInput = document.getElementById("filter-input");
    const filterButton = document.getElementById("filter-button");
    const tableBody = document.getElementById("contacts-table-body");
    const rows = Array.from(tableBody.querySelectorAll("tr"));

    filterButton.addEventListener("click", function() {
        const filterText = filterInput.value.toLowerCase();
        rows.forEach(row => {
            const cells = Array.from(row.querySelectorAll("td"));
            const rowText = cells.map(cell => cell.textContent.toLowerCase()).join(" ");
            if (rowText.includes(filterText)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
});