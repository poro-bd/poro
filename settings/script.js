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

// Toggle switch
function toggleSwitch(element) {
    element.classList.toggle('active');
}

// Select theme
function selectTheme(element) {
    const allThemes = document.querySelectorAll('.theme-option');
    allThemes.forEach(theme => theme.classList.remove('active'));
    element.classList.add('active');
}