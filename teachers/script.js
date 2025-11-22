let allTeachers = [];
let currentPage = 1;
const itemsPerPage = 6;
let filteredTeachers = [];

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
    filteredTeachers = allTeachers.filter(teacher => {
        const matchesSearch = teacher.name.toLowerCase().includes(searchTerm) ||
                                (teacher.title && teacher.title.toLowerCase().includes(searchTerm));
        const matchesSubject = !subjectFilter || teacher.title === subjectFilter;
        return matchesSearch && matchesSubject;
    });

    // Sort
    if (sortBy === 'name') {
        filteredTeachers.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'subject') {
        filteredTeachers.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
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
        <div class="teacher-card" onclick="openModal('${teacher.phonenumber}')">
            <div class="teacher-avatar-wrapper">
                <img src="${teacher.photourl || 'https://i.pravatar.cc/150'}" alt="${teacher.name}" class="teacher-avatar">
            </div>
            <h3 class="teacher-name">${teacher.name}</h3>
            <p class="teacher-profession">${teacher.title || 'N/A'}</p>
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

// Render rating stars
function renderRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    let starsHtml = '';

    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star" style="color: #FFD700;"></i>'; // Gold star
    }
    if (halfStar) {
        starsHtml += '<i class="fas fa-star-half-alt" style="color: #FFD700;"></i>'; // Half gold star
    }
    for (let i = 0; i < (5 - fullStars - (halfStar ? 1 : 0)); i++) {
        starsHtml += '<i class="far fa-star" style="color: #FFD700;"></i>'; // Empty star
    }
    return starsHtml;
}

// Open modal
async function openModal(phonenumber) {
    document.getElementById('teacherModal').classList.add('active');
    document.body.style.overflow = 'hidden';

    // Clear previous content and show loading indicator
    document.getElementById('modalAvatar').src = '';
    document.getElementById('modalName').textContent = 'Loading...';
    document.getElementById('modalProfession').textContent = '';
    document.getElementById('modalPhone').textContent = '';
    document.getElementById('modalPhone').href = '#';
    document.getElementById('modalEmail').textContent = '';
    document.getElementById('modalEmail').href = '#';
    document.getElementById('modalNotes').innerHTML = '';
    document.getElementById('modalRating').innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    document.getElementById('modalAdditionalNotes').innerHTML = '';

    const session = sessionStorage.getItem('session');
    if (!session) {
        console.error("No session found. Please log in.");
        document.getElementById('modalName').textContent = 'Error: Not logged in';
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/webhook/poro-teacher`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session: session, phonenumber: phonenumber })
        });

        if (response.ok) {
            const data = await response.json();
            const teacher = data[0]; // Backend returns an array, take the first item

            if (teacher) {
                document.getElementById('modalAvatar').src = teacher.photourl || 'https://i.pravatar.cc/150';
                document.getElementById('modalName').textContent = teacher.name;
                document.getElementById('modalProfession').textContent = teacher.title || 'N/A';
                document.getElementById('modalPhone').textContent = teacher.phonenumber;
                document.getElementById('modalPhone').href = `tel:${teacher.phonenumber}`;

                const emailSection = document.getElementById('modalEmail').closest('.modal-section');
                const notesSection = document.getElementById('modalNotes').closest('.modal-section');
                const additionalNotesSection = document.getElementById('additionalNotesSection');
                const collegeEIINSection = document.getElementById('collegeEIINSection');

                if (teacher.email) {
                    document.getElementById('modalEmail').textContent = teacher.email;
                    document.getElementById('modalEmail').href = `mailto:${teacher.email}`;
                    emailSection.style.display = 'block';
                } else {
                    emailSection.style.display = 'none';
                }
                
                if (teacher.notes && teacher.notes.length > 0) {
                    const notesList = document.getElementById('modalNotes');
                    notesList.innerHTML = teacher.notes.map(note => `<li>${note}</li>`).join('');
                    notesSection.style.display = 'block';
                } else {
                    notesSection.style.display = 'none';
                }

                if (teacher.details) {
                    document.getElementById('modalDetails').textContent = teacher.details;
                    detailsSection.style.display = 'block';
                } else {
                    detailsSection.style.display = 'none';
                }

                if (teacher.additionalnotes && teacher.additionalnotes.length > 0) {
                    const additionalNotesList = document.getElementById('modalAdditionalNotes');
                    additionalNotesList.innerHTML = teacher.additionalnotes.map(note => `<li>${note}</li>`).join('');
                    additionalNotesSection.style.display = 'block';
                } else {
                    additionalNotesSection.style.display = 'none';
                }

                document.getElementById('modalRating').innerHTML = teacher.rating ? renderRatingStars(teacher.rating) : 'N/A';
            } else {
                document.getElementById('modalName').textContent = 'Teacher not found';
                document.getElementById('modalRating').innerHTML = '';
            }
        } else if (response.status === 404) {
            document.getElementById('modalName').textContent = 'Teacher not found';
            document.getElementById('modalRating').innerHTML = '';
        } else {
            console.error('Failed to fetch specific teacher:', response.status, response.statusText);
            document.getElementById('modalName').textContent = 'Error fetching details';
            document.getElementById('modalRating').innerHTML = '';
        }
    } catch (error) {
        console.error('Error fetching specific teacher:', error);
        document.getElementById('modalName').textContent = 'Network error';
        document.getElementById('modalRating').innerHTML = '';
    }
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

async function fetchTeachers() {
    const session = sessionStorage.getItem('session');
    if (!session) {
        // Handle not logged in case
        console.error("No session found. Please log in.");
        // Maybe redirect to login page
        // window.location.href = '/login';
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/webhook/poro-teacher`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session: session })
        });

        if (response.ok) {
            allTeachers = await response.json();
            filteredTeachers = [...allTeachers];
            currentPage = getPageFromURL();
            renderTeachers();
            renderPagination();
        } else {
            console.error('Failed to fetch teachers:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error fetching teachers:', error);
    }
}


// Initialize
window.addEventListener('DOMContentLoaded', function() {
    fetchTeachers();
});

// Handle browser back/forward
window.addEventListener('popstate', function() {
    currentPage = getPageFromURL();
    renderTeachers();
    renderPagination();
});
