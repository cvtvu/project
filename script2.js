document.addEventListener('DOMContentLoaded', function() {
    const scoreTable = document.getElementById('scoreTable');

    // Retrieve selected rows data from local storage
    const selectedRowsData = JSON.parse(localStorage.getItem('selectedRows')) || [];

    selectedRowsData.forEach(rowData => {
        const row = document.createElement('tr');
        rowData.forEach(cellData => {
            const cell = document.createElement('td');
            cell.textContent = cellData;
            row.appendChild(cell);
        });
        scoreTable.appendChild(row);
    });

    localStorage.removeItem('selectedRows');


});