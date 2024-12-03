document.addEventListener("DOMContentLoaded", function() {
    const table = document.querySelector(".styled-table");
    const headers = table.querySelectorAll(".sortable");
    let sortDirection = 1;

    headers.forEach(header => {
        header.addEventListener("click", function() {
            const column = header.getAttribute("data-column");
            const rows = Array.from(table.querySelectorAll("tbody tr"));
            const columnIndex = Array.from(header.parentNode.children).indexOf(header);

            rows.sort((a, b) => {
                const cellA = a.children[columnIndex].textContent.trim();
                const cellB = b.children[columnIndex].textContent.trim();

                if (cellA < cellB) {
                    return -1 * sortDirection;
                }
                if (cellA > cellB) {
                    return 1 * sortDirection;
                }
                return 0;
            });

            sortDirection *= -1;
            headers.forEach(h => h.classList.remove("desc"));
            if (sortDirection === -1) {
                header.classList.add("desc");
            }

            rows.forEach(row => table.querySelector("tbody").appendChild(row));
        });
    });
});