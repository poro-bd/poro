// Routine data
const scheduleData = {
    periods: [
        { period: 'Period 1', time: '8:00 AM - 9:00 AM' },
        { period: 'Period 2', time: '9:00 AM - 10:00 AM' },
        { period: 'Period 3', time: '10:00 AM - 11:00 AM' },
        { period: 'Period 4', time: '11:00 AM - 12:00 PM' },
        { period: 'Tiffin Break', time: '12:00 PM - 12:30 PM' },
        { period: 'Period 5', time: '12:30 PM - 1:30 PM' },
        { period: 'Period 6', time: '1:30 PM - 2:30 PM' },
        { period: 'End of Day', time: '2:30 PM' }
    ],
    subjects: {
        Mathematics: { teacher: 'Dr. Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
        Physics: { teacher: 'Prof. Michael Chen', avatar: '  https://i.pravatar.cc/150?img=33' },
        Chemistry: { teacher: 'Ms. Emily Davis', avatar: '  https://i.pravatar.cc/150?img=5' },
        Biology: { teacher: 'Mr. James Wilson', avatar: '  https://i.pravatar.cc/150?img=12' },
        English: { teacher: 'Dr. Lisa Anderson', avatar: '  https://i.pravatar.cc/150?img=9' },
        History: { teacher: 'Prof. Robert Taylor', avatar: '  https://i.pravatar.cc/150?img=14' },
        'Computer Science': { teacher: 'Mr. David Brown', avatar: '  https://i.pravatar.cc/150?img=15' },
        'Physical Education': { teacher: 'Coach Sarah Williams', avatar: '  https://i.pravatar.cc/150?img=20' }
    },
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    routine: {
        Sunday: ['Mathematics', 'Physics', 'Chemistry', 'Biology', null, 'English', 'History', null],
        Monday: ['Physics', 'Mathematics', 'English', 'Chemistry', null, 'Biology', 'Computer Science', null],
        Tuesday: ['Chemistry', 'Biology', 'Mathematics', 'Physics', null, 'History', 'English', null],
        Wednesday: ['Biology', 'Chemistry', 'Computer Science', 'Mathematics', null, 'Physics', 'English', null],
        Thursday: ['English', 'History', 'Physics', 'Chemistry', null, 'Mathematics', 'Biology', null],
        Friday: ['Mathematics', 'Computer Science', 'Biology', 'English', null, 'Physics', 'Chemistry', null],
        Saturday: ['History', 'English', 'Mathematics', 'Physical Education', null, 'Chemistry', 'Physics', null]
    }
};

// Get today's day name
function getTodayDayName() {
    return scheduleData.days[new Date().getDay()];
}

// Get date string in DD/MM/YYYY format
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Toggle sidebar
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

// Close sidebar on mobile click outside
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (window.innerWidth <= 768 && sidebar.classList.contains('active') &&
        !sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});

// Toggle day card (now allows multiple to be open)
function toggleDay(dayName) {
    const allCards = document.querySelectorAll('.day-card');
    const clickedCard = document.getElementById(`day-${dayName}`);

    allCards.forEach(card => {
        if (card !== clickedCard) {
            card.classList.remove('active');
        }
    });

    clickedCard.classList.toggle('active');
}

// Render days
function renderDays() {
    const today = getTodayDayName();
    const todayIndex = scheduleData.days.indexOf(today);
    const sortedDays = [];
    
    // Create sorted days starting from today
    for (let i = 0; i < scheduleData.days.length; i++) {
        const index = (todayIndex + i) % scheduleData.days.length;
        sortedDays.push(scheduleData.days[index]);
    }
    
    const container = document.getElementById('daysContainer');
    const todayDate = new Date();

    container.innerHTML = sortedDays.map((day, index) => {
        const isToday = day === today;
        const periods = scheduleData.routine[day];
        const date = new Date();
        date.setDate(todayDate.getDate() + index);
        const dateString = formatDate(date);

        return `
            <div class="day-card" id="day-${day}">
                <div class="day-header" onclick="toggleDay('${day}')">
                    <div class="day-info">
                        <div style="display: flex; align-items: center;">
                            <div class="day-name">${day}</div>
                            ${isToday ? '<span class="today-label">Today</span>' : ''}
                        </div>
                        <div class="day-date">${dateString}</div>
                    </div>
                    <div class="day-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                        </svg>
                    </div>
                </div>
                <div class="day-content">
                    <div class="periods-list">
                        ${scheduleData.periods.map((periodInfo, idx) => {
                            if (periodInfo.period === 'Tiffin Break') {
                                return `
                                    <div class="period-item tiffin-item">
                                        <span class="tiffin-text">☕ Tiffin Break (30 min)</span>
                                    </div>
                                `;
                            }
                            if (periodInfo.period === 'End of Day') {
                                return `
                                    <div class="period-item end-item">
                                        <span class="end-text">🏁 End of Day</span>
                                    </div>
                                `;
                            }

                            const subject = periods[idx];
                            if (!subject) {
                                return `
                                    <div class="period-item">
                                        <div class="period-time">${periodInfo.time}</div>
                                        <div class="period-details">
                                            <span class="empty-period">— No class —</span>
                                        </div>
                                    </div>
                                `;
                            }

                            const subj = scheduleData.subjects[subject];
                            return `
                                <div class="period-item">
                                    <div class="period-time">${periodInfo.time}</div>
                                    <div class="period-details">
                                        <div class="subject-name">${subject}</div>
                                        <div class="teacher-name">${subj.teacher}</div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Initialize
renderDays();