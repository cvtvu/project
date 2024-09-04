document.addEventListener('DOMContentLoaded', function() {
    function handleRowCopy(event) {
        if (event.target.tagName.toLowerCase() === 'button') {
            var button = event.target;
            var row = button.closest('tr');

            if (row.classList.contains('copied')) {
                return;
            }

            row.classList.add('copied');

            //copy to select table
            var clonedRow = row.cloneNode(true);
            var selectedTable = document.querySelector('#selected');
            selectedTable.appendChild(clonedRow);

            //count as signed one
            var cells = clonedRow.querySelectorAll('td');
            if (cells.length > 5) {
                var quantityCell = cells[5];
                var quantity = parseInt(quantityCell.textContent);
                quantityCell.textContent = `${quantity + 1}`;
            }

            var cells = row.querySelectorAll('td');
            if (cells.length > 5) {
                var quantityCell = cells[5];
                var quantity = parseInt(quantityCell.textContent);
                quantityCell.textContent = `${quantity + 1}`;
            }

            // Update the button text
            var clonedButton = clonedRow.querySelector('button');
            clonedButton.innerHTML = "Hủy";
            clonedButton.classList.remove('select-button');
            clonedButton.classList.add('remove-button');
            clonedButton.addEventListener('click', handleRowRemove);

            //update regist-info
            updateRegistrationCount();
        }
    }

    function handleRowRemove(event) {
        if (event.target.tagName.toLowerCase() === 'button') {
            var button = event.target;
            var row = button.closest('tr');

            // Remove the row from the selected table
            row.remove();

            //remove rows copied class list
            var originalRow = document.querySelector('#return').querySelector(`tr[data-id="${row.dataset.id}"]`);
            if (originalRow) {
                originalRow.classList.remove('copied');
            }
            //decrease quantity data when unsign
            var cells = originalRow.querySelectorAll('td');
            if (cells.length > 5) {
                var quantityCell = cells[5];
                var quantity = parseInt(quantityCell.textContent);
                quantityCell.textContent = `${quantity - 1}`;
            }
            //update regist-info
            updateRegistrationCount();
        }
    }

    function updateRegistrationCount() {
        var selectedTable = document.querySelector('#selected');
        var rows = selectedTable.querySelectorAll('tr').length - 1;
        
        var totalCredits = 0;
        selectedTable.querySelectorAll('tr').forEach(row => {
            var cells = row.querySelectorAll('td');
            if (cells.length > 4) {
                var creditsCell = cells[3];
                var credits = parseInt(creditsCell.textContent);
                totalCredits += credits;
            }
        });

        var resultLegend = document.querySelector('.result');
        if (resultLegend) {
            resultLegend.textContent = `Kết quả đăng ký: ${rows} môn, ${totalCredits} tín chỉ`;
        }
    }

    function disableButtons() {
        var removeButtons = document.querySelectorAll('.remove-button');
        var selectButtons = document.querySelectorAll('.select-button');
        removeButtons.forEach(button => {
            button.disabled = true;
        });
        selectButtons.forEach(button => {
            button.disabled = true;
        });
    }

    function enableButtons() {
        var removeButtons = document.querySelectorAll('.remove-button');
        var selectButtons = document.querySelectorAll('.select-button');
        removeButtons.forEach(button => {
            button.disabled = false;
        });
        selectButtons.forEach(button => {
            button.disabled = false;
        });
    }

    //init event listener for select-button
    document.querySelectorAll('.select-button').forEach(button => {
        button.addEventListener('click', handleRowCopy);
    });

    //saving part
    var registerButton = document.querySelector('#registerButton');
    if (registerButton) {
        registerButton.addEventListener('click', function() {
            if(registerButton.innerHTML === "ĐĂNG KÝ") {
                registerButton.innerHTML = "HỦY ĐĂNG KÝ";
                disableButtons();
                //copy saved-data to local storage
                const selectedRows = document.querySelectorAll('#selected tr:not(:first-child)');
                const data = Array.from(selectedRows).map(row => {
                    const cells = row.querySelectorAll('td');
                    return [cells[1].textContent, cells[2].textContent, cells[3].textContent]; // Columns 2nd to 4th
                });
                localStorage.setItem('selectedRows', JSON.stringify(data));

                alert("đăng ký thành công");
            }
            else {
                registerButton.innerHTML = "ĐĂNG KÝ";
                enableButtons();
                localStorage.removeItem('selectedRows');
            }
        });
    }

    // Set unique identifiers for rows against repetition
    document.querySelectorAll('#return tr').forEach((row, index) => {
        if (index > 0) {
            row.dataset.id = index;
        }
    });

});