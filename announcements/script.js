const announcementsData = [
    {
        id: 1,
        title: 'Mid-Term Examinations Schedule Released',
        description: 'The mid-term examination schedule for all classes has been finalized. Please review the dates carefully and prepare accordingly.',
        author: 'Dr. Robert Smith',
        role: 'Principal',
        avatar: 'https://i.pravatar.cc/150?img=13',
        time: '2 hours ago',
        timestamp: Date.now() - 7200000,
        priority: 'high',
        category: 'academic',
        unread: true,
        points: [
            'Exams will begin from November 15th, 2024',
            'Duration: 2 hours per subject',
            'Students must arrive 30 minutes before exam time',
            'Carry admit card and ID proof mandatory',
            'No electronic devices allowed in exam hall'
        ],
        tags: ['Exams', 'Important', 'Academic'],
        attachments: [
            { name: 'Exam_Schedule_2024.pdf', size: '245 KB' }
        ]
    },
    {
        id: 2,
        title: 'Annual Sports Day - Registration Open',
        description: 'We are excited to announce our Annual Sports Day scheduled for next month. All students are encouraged to participate in various sporting events.',
        author: 'Coach Sarah Williams',
        role: 'Sports Coordinator',
        avatar: 'https://i.pravatar.cc/150?img=5',
        time: '5 hours ago',
        timestamp: Date.now() - 18000000,
        priority: 'medium',
        category: 'events',
        unread: true,
        points: [
            'Event Date: December 10th, 2024',
            'Registration deadline: November 20th',
            'Multiple categories: Track, Field, Team Sports',
            'Participation certificates for all students',
            'Winners will receive medals and prizes'
        ],
        tags: ['Sports', 'Registration', 'Events'],
        attachments: [
            { name: 'Sports_Day_Registration_Form.pdf', size: '180 KB' },
            { name: 'Event_Categories.pdf', size: '125 KB' }
        ]
    },
    {
        id: 3,
        title: 'New Library Books Added',
        description: 'The school library has received a fresh collection of books across various genres. Students can now borrow these books starting this week.',
        author: 'Ms. Patricia Johnson',
        role: 'Librarian',
        avatar: 'https://i.pravatar.cc/150?img=9',
        time: '1 day ago',
        timestamp: Date.now() - 86400000,
        priority: 'low',
        category: 'academic',
        unread: false,
        points: [
            'Over 500 new books added',
            'Genres: Fiction, Science, History, Biography',
            'Digital catalogue available on school portal',
            'Extended borrowing period: 3 weeks',
            'Book recommendation service available'
        ],
        tags: ['Library', 'Books', 'Reading'],
        attachments: []
    },
    {
        id: 4,
        title: 'Parent-Teacher Meeting Schedule',
        description: 'The quarterly parent-teacher meeting has been scheduled to discuss student progress and academic performance.',
        author: 'Dr. Robert Smith',
        role: 'Principal',
        avatar: 'https://i.pravatar.cc/150?img=13',
        time: '2 days ago',
        timestamp: Date.now() - 172800000,
        priority: 'high',
        category: 'academic',
        unread: false,
        points: [
            'Date: November 25th, 2024',
            'Time: 9:00 AM - 4:00 PM',
            'Prior appointment booking required',
            'Progress reports will be distributed',
            'Individual 15-minute sessions with each teacher'
        ],
        tags: ['Parents', 'Meeting', 'Important'],
        attachments: [
            { name: 'PTM_Appointment_Form.pdf', size: '95 KB' }
        ]
    },
    {
        id: 5,
        title: 'Science Fair 2024 - Call for Projects',
        description: 'Students are invited to participate in the annual Science Fair. This is an excellent opportunity to showcase your innovative projects and scientific research.',
        author: 'Prof. Michael Chen',
        role: 'Science Department Head',
        avatar: 'https://i.pravatar.cc/150?img=33',
        time: '3 days ago',
        timestamp: Date.now() - 259200000,
        priority: 'medium',
        category: 'academic',
        unread: false,
        points: [
            'Submission deadline: December 1st, 2024',
            'Categories: Physics, Chemistry, Biology, Environmental Science',
            'Both individual and group projects accepted',
            'Cash prizes and certificates for winners',
            'Mentorship available from faculty members'
        ],
        tags: ['Science', 'Competition', 'Projects'],
        attachments: [
            { name: 'Science_Fair_Guidelines.pdf', size: '320 KB' },
            { name: 'Project_Template.docx', size: '45 KB' }
        ]
    },
    {
        id: 6,
        title: 'Winter Break Holiday Notice',
        description: 'Please note the winter break schedule. School will remain closed during this period, and classes will resume in January.',
        author: 'Administration Office',
        role: 'Admin Team',
        avatar: 'https://i.pravatar.cc/150?img=25',
        time: '4 days ago',
        timestamp: Date.now() - 345600000,
        priority: 'medium',
        category: 'events',
        unread: false,
        points: [
            'Winter break: December 20th - January 5th',
            'School reopens: January 6th, 2025',
            'Holiday homework will be assigned',
            'Emergency contact numbers will be active',
            'Online doubt clearing sessions available'
        ],
        tags: ['Holiday', 'Winter Break', 'Schedule'],
        attachments: []
    },
    {
        id: 7,
        title: 'Career Counseling Session',
        description: 'A special career counseling session has been organized for senior students to help them make informed decisions about their future education and career paths.',
        author: 'Dr. Lisa Anderson',
        role: 'Career Counselor',
        avatar: 'https://i.pravatar.cc/150?img=20',
        time: '5 days ago',
        timestamp: Date.now() - 432000000,
        priority: 'low',
        category: 'academic',
        unread: false,
        points: [
            'Date: November 18th, 2024',
            'Time: 2:00 PM - 5:00 PM',
            'Guest speakers from various industries',
            'One-on-one counseling sessions available',
            'Information about college admissions and scholarships'
        ],
        tags: ['Career', 'Counseling', 'Students'],
        attachments: [
            { name: 'Career_Options_Guide.pdf', size: '890 KB' }
        ]
    },
    {
        id: 8,
        title: 'Updated COVID-19 Safety Guidelines',
        description: 'In light of recent health advisories, we have updated our COVID-19 safety protocols. Please familiarize yourself with the new guidelines.',
        author: 'Health & Safety Committee',
        role: 'Safety Team',
        avatar: 'https://i.pravatar.cc/150?img=15',
        time: '1 week ago',
        timestamp: Date.now() - 604800000,
        priority: 'high',
        category: 'general',
        unread: false,
        points: [
            'Masks recommended in crowded areas',
            'Hand sanitizers available at all entry points',
            'Regular disinfection of common areas',
            'Students showing symptoms must stay home',
            'Virtual learning option available if needed'
        ],
        tags: ['Health', 'Safety', 'COVID-19'],
        attachments: [
            { name: 'Safety_Guidelines_Updated.pdf', size: '215 KB' }
        ]
    }
];

let currentFilter = 'all';

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Close sidebar when clicking outside
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

// Filter announcements
function filterAnnouncements(filter) {
    currentFilter = filter;
    
    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    
    renderAnnouncements();
}

// Get filtered announcements
function getFilteredAnnouncements() {
    switch(currentFilter) {
        case 'unread':
            return announcementsData.filter(a => a.unread);
        case 'high':
            return announcementsData.filter(a => a.priority === 'high');
        case 'academic':
            return announcementsData.filter(a => a.category === 'academic');
        case 'events':
            return announcementsData.filter(a => a.category === 'events');
        default:
            return announcementsData;
    }
}

// Update counts
function updateCounts() {
    document.getElementById('count-all').textContent = announcementsData.length;
    document.getElementById('count-unread').textContent = announcementsData.filter(a => a.unread).length;
    document.getElementById('count-high').textContent = announcementsData.filter(a => a.priority === 'high').length;
    document.getElementById('count-academic').textContent = announcementsData.filter(a => a.category === 'academic').length;
    document.getElementById('count-events').textContent = announcementsData.filter(a => a.category === 'events').length;
}

// Mark as read
function markAsRead(id) {
    const announcement = announcementsData.find(a => a.id === id);
    if (announcement) {
        announcement.unread = false;
        renderAnnouncements();
        updateCounts();
    }
}

// Render announcements
function renderAnnouncements() {
    const container = document.getElementById('announcementsList');
    const filtered = getFilteredAnnouncements();
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                    </svg>
                </div>
                <p class="empty-text">No announcements found</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filtered.map(announcement => `
        <div class="announcement-card ${announcement.unread ? 'unread' : ''}">
            <div class="announcement-header">
                <div class="announcement-meta">
                    <img src="${announcement.avatar}" alt="${announcement.author}" class="author-avatar">
                    <div class="announcement-info">
                        <div class="announcement-author">${announcement.author}</div>
                        <div class="announcement-role">${announcement.role}</div>
                    </div>
                </div>
                <div class="announcement-time">
                    <span class="time-text">${announcement.time}</span>
                    <span class="priority-badge priority-${announcement.priority}">
                        ${announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)} Priority
                    </span>
                </div>
            </div>
            
            <div class="announcement-body">
                <h3 class="announcement-title">${announcement.title}</h3>
                <p class="announcement-description">${announcement.description}</p>
                
                ${announcement.points.length > 0 ? `
                    <ul class="announcement-points">
                        ${announcement.points.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                ` : ''}
                
                ${announcement.tags.length > 0 ? `
                    <div class="announcement-tags">
                        ${announcement.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
                
                ${announcement.attachments.length > 0 ? `
                    <div class="attachment-section">
                        <div class="attachment-title">ATTACHMENTS (${announcement.attachments.length})</div>
                        ${announcement.attachments.map(attachment => `
                            <div class="attachment-item">
                                <div class="attachment-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                                    </svg>
                                </div>
                                <div class="attachment-info">
                                    <div class="attachment-name">${attachment.name}</div>
                                    <div class="attachment-size">${attachment.size}</div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="rgba(255,255,255,0.5)">
                                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                                </svg>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            
            <div class="announcement-footer">
                <div class="footer-actions">
                    ${announcement.unread ? `
                        <button class="action-btn" onclick="markAsRead(${announcement.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                            </svg>
                            Mark as Read
                        </button>
                    ` : ''}
                    <button class="action-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                        </svg>
                        Share
                    </button>
                </div>
                <span class="time-text">Posted ${announcement.time}</span>
            </div>
        </div>
    `).join('');
}

// Initialize
updateCounts();
renderAnnouncements();