function initializeDatePicker() {
    const dateInput = document.getElementById('dateInput');
    const dateDisplay = document.getElementById('dateDisplay');

    if (!dateInput || !dateDisplay) {
        return;
    }

    const today = new Date();
    const formattedDate = formatDateForInput(today);
    dateInput.value = formattedDate;

    updateDateDisplay(today);

    dateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        updateDateDisplay(selectedDate);
    });
}

function formatDateForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function updateDateDisplay(date) {
    const dateDisplay = document.getElementById('dateDisplay');

    if (!dateDisplay || isNaN(date.getTime())) {
        return;
    }

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.textContent = date.toLocaleDateString('en-US', options);
}

function getFormattedDateForAPI() {
    const dateInput = document.getElementById('dateInput');

    if (!dateInput || !dateInput.value) {
        return '';
    }

    const date = new Date(dateInput.value);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}${month}${year}`;
}

document.addEventListener('DOMContentLoaded', initializeDatePicker);


