document.addEventListener('DOMContentLoaded', () => {
    // Insert current date
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        currentDateElement.textContent = new Date().toLocaleDateString();
    }

    // Menu toggle
    const navToggle = document.querySelector('.nav__toggle');
    const navElement = document.querySelector('nav'); // Target the nav element
    const navToggleIcon = navToggle.querySelector('i');

    if (navToggle && navElement && navToggleIcon) {
        navToggle.addEventListener('click', () => {
            navElement.classList.toggle('nav__menu--visible'); // Toggle class on nav
            if (navElement.classList.contains('nav__menu--visible')) {
                navToggleIcon.classList.remove('fa-bars');
                navToggleIcon.classList.add('fa-times');
            } else {
                navToggleIcon.classList.remove('fa-times');
                navToggleIcon.classList.add('fa-bars');
            }
        });
    }

    const themeSwitcher = document.querySelector('.theme-switcher');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    };

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }

    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
});
