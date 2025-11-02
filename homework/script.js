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

// Modal functions
function openModal() {
    document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
}

// Close modal when clicking outside
document.getElementById('modalOverlay').addEventListener('click', function(event) {
    if (event.target === this) {
        closeModal();
    }
});

// Toggle day card
function toggleDay(element) {
    const allCards = document.querySelectorAll('.day-card');
    const clickedCard = element.closest('.day-card');

    allCards.forEach(card => {
        if (card !== clickedCard) {
            card.classList.remove('active');
        }
    });

    clickedCard.classList.toggle('active');
}

// Generate days data
function generateDaysData() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const today = new Date();
    const daysData = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const dayName = days[date.getDay()];
        const dateStr = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

        daysData.push({
            name: dayName,
            date: dateStr,
            periods: generatePeriods(dayName)
        });
    }

    return daysData;
}

// Generate periods for a day
function generatePeriods(dayName) {
    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'];
    const teachers = [
        { name: 'Dr. Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
        { name: 'Prof. Michael Chen', avatar: 'https://i.pravatar.cc/150?img=33' },
        { name: 'Ms. Emily Davis', avatar: 'https://i.pravatar.cc/150?img=5' },
        { name: 'Mr. James Wilson', avatar: 'https://i.pravatar.cc/150?img=12' },
        { name: 'Dr. Lisa Anderson', avatar: 'https://i.pravatar.cc/150?img=9' },
        { name: 'Prof. Robert Taylor', avatar: 'https://i.pravatar.cc/150?img=14' }
    ];

    const homeworkExamples = [
        ['Complete exercises 1-5 on page 42', 'Review chapter 3 for quiz'],
        ['Read pages 45-52', 'Answer questions 1-3'],
        ['Solve problems 1-10', 'Prepare lab report'],
        ['Write essay on given topic', 'Study vocabulary'],
        ['Complete worksheet', 'Research project due next week'],
        ['Watch documentary', 'Prepare presentation']
    ];

    const periods = [];
    const times = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'];

    for (let i = 0; i < 6; i++) {
        periods.push({
            number: `Period ${i + 1}`,
            time: `${times[i]} - ${times[i + 1]}`,
            subject: subjects[i],
            teacher: teachers[i],
            homework: homeworkExamples[i]
        });

        if (i === 2) {
            periods.push({
                number: 'Tiffin Break',
                time: '11:00 AM - 11:30 AM',
                isTiffin: true
            });
        }
    }

    periods.push({
        number: 'End of Day',
        time: '3:00 PM',
        isEnd: true
    });

    return periods;
}

// Render days
function renderDays() {
    const daysData = generateDaysData();
    const container = document.getElementById('daysContainer');

    container.innerHTML = daysData.map((day, index) => `
        <div class="day-card ${index === 0 ? 'active' : ''}">
            <div class="day-header" onclick="toggleDay(this)">
                <div class="day-info">
                    <div class="day-name">${day.name}</div>
                    <div class="day-date">${day.date}</div>
                </div>
                <div class="day-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                    </svg>
                </div>
            </div>
            <div class="day-content">
                <div class="periods-list">
                    ${day.periods.map(period => {
                        if (period.isTiffin) {
                            return `
                                <div class="period-item tiffin-period">
                                    <div class="period-header">
                                        <span class="period-number">${period.number}</span>
                                        <span class="period-time">${period.time}</span>
                                    </div>
                                </div>
                            `;
                        } else if (period.isEnd) {
                            return `
                                <div class="period-item" style="background: rgba(76, 175, 80, 0.1); border-color: rgba(76, 175, 80, 0.3);">
                                    <div class="period-header">
                                        <span class="period-number" style="color: #4caf50;">${period.number}</span>
                                        <span class="period-time">${period.time}</span>
                                    </div>
                                </div>
                            `;
                        } else {
                            return `
                                <div class="period-item">
                                    <div class="period-header">
                                        <span class="period-number">${period.number}</span>
                                        <span class="period-time">${period.time}</span>
                                    </div>
                                    <div class="period-details">
                                        <img src="${period.teacher.avatar}" alt="${period.teacher.name}" class="teacher-avatar">
                                        <div class="period-info">
                                            <div class="subject-name">${period.subject}</div>
                                            <div class="teacher-name">${period.teacher.name}</div>
                                            <ul class="homework-list">
                                                ${period.homework.map(hw => `<li class="homework-item">${hw}</li>`).join('')}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }
                    }).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize
renderDays();