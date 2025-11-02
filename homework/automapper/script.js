// Toggle sidebar for mobile
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.querySelector('.mobile-menu-btn');

    if (window.innerWidth <= 768 &&
        sidebar.classList.contains('active') &&
        !sidebar.contains(event.target) &&
        !menuBtn.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});

// Initialize date picker with today's date
function initializeDatePicker() {
    const dateInput = document.getElementById('dateInput');
    const dateDisplay = document.getElementById('dateDisplay');
    
    // Set today's date as default
    const today = new Date();
    const formattedDate = formatDateForInput(today);
    dateInput.value = formattedDate;
    
    // Update display
    updateDateDisplay(today);
    
    // Add event listener for date changes
    dateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        updateDateDisplay(selectedDate);
    });
}

// Format date for input field (YYYY-MM-DD)
function formatDateForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Format date for display
function updateDateDisplay(date) {
    const dateDisplay = document.getElementById('dateDisplay');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.textContent = date.toLocaleDateString('en-US', options);
}

// Get formatted date for API (DDMMYYYY)
function getFormattedDateForAPI() {
    const dateInput = document.getElementById('dateInput');
    const date = new Date(dateInput.value);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}${month}${year}`;
}

// Get day name for API
function getDayName() {
    const dateInput = document.getElementById('dateInput');
    const date = new Date(dateInput.value);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

// Generate periods data
function generatePeriodsData() {
    return [
        { number: 1, time: '8:00 AM - 9:00 AM', type: 'period' },
        { number: 2, time: '9:00 AM - 10:00 AM', type: 'period' },
        { number: 3, time: '10:00 AM - 11:00 AM', type: 'period' },
        { number: 4, time: '11:30 AM - 12:30 PM', type: 'period' },
        { number: 5, time: '12:30 PM - 1:30 PM', type: 'period' },
        { number: 6, time: '1:30 PM - 2:30 PM', type: 'period' },
        { number: 'Tiffin', time: '11:00 AM - 11:30 AM', type: 'tiffin' },
        { number: 'End', time: '2:30 PM', type: 'end' }
    ];
}

// Render periods
function renderPeriods() {
    const periodsData = generatePeriodsData();
    const container = document.getElementById('periodsContainer');

    container.innerHTML = periodsData.map(period => {
        const periodClass = period.type === 'tiffin' ? 'tiffin-period' : 
                            period.type === 'end' ? 'end-period' : '';
        
        return `
            <div class="period-card ${periodClass}">
                <div class="period-header">
                    <span class="period-number">${period.type === 'period' ? 'Period ' : ''}${period.number}</span>
                    <span class="period-time">${period.time}</span>
                </div>
                <div class="homework-input-container" data-period="${period.number}">
                    <!-- Input area with add button -->
                    <div class="homework-input-area">
                        <textarea class="homework-main-input" placeholder="Enter homework item..." oninput="handleMainInput(this)" onkeydown="handleMainInputEnter(event, this)"></textarea>
                        <button class="add-homework-btn" onclick="addHomeworkFromInput(this)" disabled>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                            </svg>
                        </button>
                    </div>
                    <!-- Homework list -->
                    <div class="homework-list"></div>
                </div>
            </div>
        `;
    }).join('');
}

// Handle main input changes
function handleMainInput(textarea) {
    const addBtn = textarea.parentElement.querySelector('.add-homework-btn');
    const value = textarea.value.trim();
    
    if (value !== '') {
        addBtn.disabled = false;
    } else {
        addBtn.disabled = true;
    }
}

// Add homework from main input
function addHomeworkFromInput(button) {
    const container = button.closest('.homework-input-container');
    const mainInput = container.querySelector('.homework-main-input');
    const value = mainInput.value.trim();
    
    if (value === '') return;
    
    // Create homework item
    const homeworkItem = createHomeworkItem(value);
    const homeworkList = container.querySelector('.homework-list');
    
    // Add to the end of the list
    homeworkList.appendChild(homeworkItem);
    
    // Clear main input and disable button
    mainInput.value = '';
    button.disabled = true;
    
    // Initialize drag for new item
    initDragAndDrop();
}

// Handle Enter key in main input
function handleMainInputEnter(event, textarea) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        const addBtn = textarea.parentElement.querySelector('.add-homework-btn');
        if (!addBtn.disabled) {
            addHomeworkFromInput(addBtn);
        }
    }
}

// Create homework item element
function createHomeworkItem(text) {
    const homeworkItem = document.createElement('div');
    homeworkItem.className = 'homework-item';
    homeworkItem.innerHTML = `
        <div class="drag-handle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                <path d="M9 3h6v2H9zm0 8h6v2H9zm0 8h6v2H9z" fill="currentColor"/>
            </svg>
        </div>
        <span class="homework-bullet">•</span>
        <div class="homework-text">${text}</div>
        <button class="delete-homework" onclick="deleteHomeworkItem(this)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
        </button>
    `;
    return homeworkItem;
}

// Delete homework item with slide animation
function deleteHomeworkItem(button) {
    const homeworkItem = button.closest('.homework-item');
    homeworkItem.classList.add('deleting');
    setTimeout(() => {
        homeworkItem.remove();
    }, 300);
}

// Drag and drop functionality
let draggedItem = null;

function initDragAndDrop() {
    const dragHandles = document.querySelectorAll('.drag-handle');
    
    dragHandles.forEach(handle => {
        handle.addEventListener('mousedown', function(e) {
            draggedItem = this.parentElement;
            draggedItem.classList.add('dragging');
            
            // Prevent text selection during drag
            e.preventDefault();
        });
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!draggedItem) return;
        
        // Find the homework item under the cursor
        const mouseY = e.clientY;
        const container = draggedItem.closest('.homework-list');
        const items = Array.from(container.querySelectorAll('.homework-item:not(.dragging)'));
        
        for (let i = 0; i < items.length; i++) {
            const rect = items[i].getBoundingClientRect();
            const midpoint = rect.top + rect.height / 2;
            
            if (mouseY < midpoint) {
                // Insert before this item
                container.insertBefore(draggedItem, items[i]);
                return;
            }
        }
        
        // If we're at the end, append
        container.appendChild(draggedItem);
    });
    
    document.addEventListener('mouseup', function() {
        if (draggedItem) {
            draggedItem.classList.remove('dragging');
            draggedItem = null;
        }
    });
}

// Get homework data for all periods
function getHomeworkData() {
    const periods = [];
    const periodContainers = document.querySelectorAll('.homework-input-container');
    
    periodContainers.forEach(container => {
        const periodNumber = container.getAttribute('data-period');
        const homeworkItems = [];
        
        const textElements = container.querySelectorAll('.homework-text');
        textElements.forEach(el => {
            homeworkItems.push(el.textContent.trim());
        });
        
        periods.push({
            period: periodNumber,
            homework: homeworkItems
        });
    });
    
    return periods;
}

// Submit homework
async function submitHomework() {
    const submitBtn = document.getElementById('submitBtn');
    const statusMessage = document.getElementById('statusMessage');
    const statusText = document.getElementById('statusText');
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="animation: spin 1s linear infinite;">
            <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
        </svg>
        Submitting...
    `;
    
    try {
        const homeworkData = getHomeworkData();
        const date = getFormattedDateForAPI();
        const day = getDayName();
        
        // Create API calls for each period
        const apiCalls = homeworkData.map(periodData => {
            const payload = {
                date: date,
                day: day,
                period: periodData.period,
                homework: periodData.homework
            };
            
            // Make parallel API calls (fire and forget)
            return fetch('https://example.com/api/automapper', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            }).catch(error => {
                console.error(`Error submitting period ${periodData.period}:`, error);
            });
        });
        
        // Wait for all API calls to complete (but don't block)
        await Promise.allSettled(apiCalls);
        
        // Show success message
        statusMessage.className = 'status-message success show';
        statusText.textContent = 'Homework submitted successfully!';
        
        // Hide status message after 3 seconds
        setTimeout(() => {
            statusMessage.classList.remove('show');
        }, 3000);
        
    } catch (error) {
        console.error('Error submitting homework:', error);
        
        // Show error message
        statusMessage.className = 'status-message error show';
        statusText.textContent = 'Error submitting homework. Please try again.';
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
            Submit Homework
        `;
    }
}

// Add spin animation for loading
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeDatePicker();
    renderPeriods();
});