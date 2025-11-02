// Teachers data
const teachersData = [
    {
        id: 1,
        name: 'Dr. Sarah Johnson',
        profession: 'Mathematics',
        phone: '+1 (555) 123-4567',
        email: 'sarah.johnson@school.edu',
        avatar: 'https://i.pravatar.cc/150?img=1',
        notes: [
            'Excellent at explaining complex algebra concepts',
            'Very patient and approachable',
            'Office hours: Monday & Wednesday 3-5 PM',
            'Responds to emails within 24 hours'
        ]
    },
    {
        id: 2,
        name: 'Prof. Michael Chen',
        profession: 'Physics',
        phone: '+1 (555) 234-5678',
        email: 'michael.chen@school.edu',
        avatar: 'https://i.pravatar.cc/150?img=33',
        notes: [
            'Makes physics fun with practical experiments',
            'Strict about deadlines but fair grading',
            'Best teacher for mechanics and thermodynamics',
            'Holds extra revision sessions before exams'
        ]
    },
    {
        id: 3,
        name: 'Ms. Emily Davis',
        profession: 'Chemistry',
        phone: '+1 (555) 345-6789',
        email: 'emily.davis@school.edu',
        avatar: 'https://i.pravatar.cc/150?img=5',
        notes: [
            'Lab safety is her top priority',
            'Great at organic chemistry explanations',
            'Provides detailed study materials',
            'Available for doubt clearing on Fridays'
        ]
    },
    {
        id: 4,
        name: 'Mr. James Wilson',
        profession: 'Biology',
        phone: '+1 (555) 456-7890',
        email: 'james.wilson@school.edu',
        avatar: 'https://i.pravatar.cc/150?img=12',
        notes: [
            'Passionate about ecology and evolution',
            'Organizes great field trips',
            'Encourages research projects',
            'Very supportive of student initiatives'
        ]
    },
    {
        id: 5,
        name: 'Dr. Lisa Anderson',
        profession: 'English',
        phone: '+1 (555) 567-8901',
        email: 'lisa.anderson@school.edu',
        avatar: 'https://i.pravatar.cc/150?img=9',
        notes: [
            'Excellent literature analysis skills',
            'Helps improve writing and grammar',
            'Organizes monthly book club meetings',
            'Gives constructive feedback on essays'
        ]
    },
    {
        id: 6,
        name: 'Prof. Robert Taylor',
        profession: 'History',
        phone: '+1 (555) 678-9012',
        email: 'robert.taylor@school.edu',
        avatar: 'https://i.pravatar.cc/150?img=14',
        notes: [
            'Makes history engaging with stories',
            'Expert in world war history',
            'Assigns interesting research topics',
            'Uses multimedia in teaching'
        ]
    },
    {
        id: 7,
        name: 'Dr. Amanda White',
        profession: 'Mathematics',
        phone: '+1 (555) 789-0123',
        email: 'amanda.white@school.edu',
        avatar: 'https://i.pravatar.cc/150?img=20',
        notes: [
            'Specializes in calculus and statistics',
            'Provides extra practice problems',
            'Very organized and structured teaching',
            'Quick response to student queries'
        ]
    },
    {
        id: 8,
        name: 'Mr. David Brown',
        profession: 'Physics',
        phone: '+1 (555) 890-1234',
        email: 'david.brown@school.edu',
        avatar: 'https://i.pravatar.cc/150?img=15',
        notes: [
            'Great at quantum physics explanations',
            'Uses animations and simulations',
            'Encourages critical thinking',
            'Flexible with assignment submissions'
        ]
    },
    {
        id: 9,
        name: 'Ms. Jennifer Lee',
        profession: 'Chemistry',
        phone: '+1 (555) 901-2345',
        email: 'jennifer.lee@school.edu',
        avatar: 'https://i.pravatar.cc/150?img=25',
        notes: [
            'Expert in inorganic chemistry',
            'Patient with slow learners',
            'Provides exam tips and tricks',
            'Maintains detailed lab records'
        ]
    },
    {
        id: 10,
        name: 'Prof. Thomas Garcia',
        profession: 'Biology',
        phone: '+1 (555) 012-3456',
        email: 'thomas.garcia@school.edu',
        avatar: 'https://i.pravatar.cc/150?img=13',
        notes: [
            'Specializes in human anatomy',
            'Uses 3D models for teaching',
            'Conducts practical lab sessions',
            'Helpful with competitive exam prep'
        ]
    },
    {
        id: 11,
        name: 'Dr. Maria Rodriguez',
        profession: 'English',
        phone: '+1 (555) 123-4560',
        email: 'maria.rodriguez@school.edu',
        avatar: 'https://i.pravatar.cc/150?img=32',
        notes: [
            'Focus on creative writing skills',
            'Organizes poetry workshops',
            'Encourages public speaking',
            'Provides personalized feedback'
        ]
    },
    {
        id: 12,
        name: 'Mr. Christopher Martinez',
        profession: 'History',
        phone: '+1 (555) 234-5601',
        email: 'chris.martinez@school.edu',
        avatar: 'https://i.pravatar.cc/150?img=11',
        notes: [
            'Expert in ancient civilizations',
            'Uses documentary films in class',
            'Organizes museum visits',
            'Fair and transparent grading'
        ]
    }
];

let currentPage = 1;
const itemsPerPage = 6;
let filteredTeachers = [...teachersData];

// Get page from URL
function getPageFromURL() {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('p')) || 1;
    return page;
}

// Update URL with page
function updateURL(page) {
    const url = new URL(window.location);
    url.searchParams.set('p', page);
    window.history.pushState({}, '', url);
}

// Filter teachers
function filterTeachers() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const subjectFilter = document.getElementById('subjectFilter').value;
    const sortBy = document.getElementById('sortBy').value;

    // Filter
    filteredTeachers = teachersData.filter(teacher => {
        const matchesSearch = teacher.name.toLowerCase().includes(searchTerm) || 
                                teacher.profession.toLowerCase().includes(searchTerm);
        const matchesSubject = !subjectFilter || teacher.profession === subjectFilter;
        return matchesSearch && matchesSubject;
    });

    // Sort
    if (sortBy === 'name') {
        filteredTeachers.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'subject') {
        filteredTeachers.sort((a, b) => a.profession.localeCompare(b.profession));
    }

    currentPage = 1;
    updateURL(1);
    renderTeachers();
    renderPagination();
}

// Render teachers
function renderTeachers() {
    const grid = document.getElementById('teachersGrid');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const teachersToShow = filteredTeachers.slice(startIndex, endIndex);

    grid.innerHTML = teachersToShow.map(teacher => `
        <div class="teacher-card" onclick="openModal(${teacher.id})">
            <div class="teacher-avatar-wrapper">
                <img src="${teacher.avatar}" alt="${teacher.name}" class="teacher-avatar">
            </div>
            <h3 class="teacher-name">${teacher.name}</h3>
            <p class="teacher-profession">${teacher.profession}</p>
        </div>
    `).join('');
}

// Render pagination
function renderPagination() {
    const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
    const pagination = document.getElementById('pagination');

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let paginationHTML = `
        <button class="page-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
        </button>
    `;

    // Show page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `<span style="color: rgba(255,255,255,0.5);">...</span>`;
        }
    }

    paginationHTML += `
        <button class="page-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
        </button>
    `;

    pagination.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
    const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    updateURL(page);
    renderTeachers();
    renderPagination();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Open modal
function openModal(teacherId) {
    const teacher = teachersData.find(t => t.id === teacherId);
    if (!teacher) return;

    document.getElementById('modalAvatar').src = teacher.avatar;
    document.getElementById('modalName').textContent = teacher.name;
    document.getElementById('modalProfession').textContent = teacher.profession;
    document.getElementById('modalPhone').textContent = teacher.phone;
    document.getElementById('modalPhone').href = `tel:${teacher.phone}`;
    document.getElementById('modalEmail').textContent = teacher.email;
    document.getElementById('modalEmail').href = `mailto:${teacher.email}`;
    
    const notesList = document.getElementById('modalNotes');
    notesList.innerHTML = teacher.notes.map(note => `<li>${note}</li>`).join('');

    document.getElementById('teacherModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    document.getElementById('teacherModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on outside click
document.getElementById('teacherModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

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

// Initialize
window.addEventListener('DOMContentLoaded', function() {
    currentPage = getPageFromURL();
    renderTeachers();
    renderPagination();
});

// Handle browser back/forward
window.addEventListener('popstate', function() {
    currentPage = getPageFromURL();
    renderTeachers();
    renderPagination();
});