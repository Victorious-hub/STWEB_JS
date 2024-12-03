document.addEventListener("DOMContentLoaded", function() {
    const itemsPerPage = 3;
    const gridContainer = document.getElementById("grid-container");
    const paginationControls = document.getElementById("pagination-controls");
    const items = Array.from(gridContainer.querySelectorAll(".grid-item"));
    const totalPages = Math.ceil(items.length / itemsPerPage);
    let currentPage = 1;

    function displayPage(page) {
        gridContainer.innerHTML = "";
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = items.slice(start, end);

        pageItems.forEach(item => gridContainer.appendChild(item));
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