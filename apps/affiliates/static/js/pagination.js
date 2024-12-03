document.addEventListener("DOMContentLoaded", function() {
    const rowsPerPage = 3;
    const tableBody = document.getElementById("contacts-table-body");
    const paginationControls = document.getElementById("pagination-controls");
    const rows = Array.from(tableBody.querySelectorAll("tr"));
    const totalPages = Math.ceil(rows.length / rowsPerPage);

    function displayPage(page) {
        tableBody.innerHTML = "";
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const pageRows = rows.slice(start, end);

        pageRows.forEach(row => tableBody.appendChild(row));
        updatePaginationControls(page);
    }

    function updatePaginationControls(currentPage) {
        paginationControls.innerHTML = "";

        if (currentPage > 1) {
            const prevLink = document.createElement("a");
            prevLink.href = "#";
            prevLink.textContent = "Previous";
            prevLink.addEventListener("click", function(event) {
                event.preventDefault();
                displayPage(currentPage - 1);
            });
            paginationControls.appendChild(prevLink);
        }

        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement("a");
            pageLink.href = "#";
            pageLink.textContent = i;
            if (i === currentPage) {
                pageLink.classList.add("current");
            }
            pageLink.addEventListener("click", function(event) {
                event.preventDefault();
                displayPage(i);
            });
            paginationControls.appendChild(pageLink);
        }

        if (currentPage < totalPages) {
            const nextLink = document.createElement("a");
            nextLink.href = "#";
            nextLink.textContent = "Next";
            nextLink.addEventListener("click", function(event) {
                event.preventDefault();
                displayPage(currentPage + 1);
            });
            paginationControls.appendChild(nextLink);
        }
    }

    displayPage(1);
});