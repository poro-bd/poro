// Enhanced button animations
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(40px)';
        btn.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 400 + (index * 250));
    });
    
    // Add subtle pulse effect to primary button
    const primaryBtn = document.querySelector('.btn-primary');
    if (primaryBtn) {
        setInterval(() => {
            primaryBtn.style.transform = 'translateY(-5px) scale(1.04)';
            setTimeout(() => {
                primaryBtn.style.transform = 'translateY(0) scale(1)';
            }, 800);
        }, 12000);
    }

    const dashboardBtn = document.getElementById('dashboard-btn');
    const devBtn = document.getElementById('dev-btn');
    const dashboardBlinkOverlay = dashboardBtn.querySelector('.blink-overlay');
    const devBlinkOverlay = devBtn.querySelector('.blink-overlay');

    dashboardBtn.addEventListener('click', (e) => {
        e.preventDefault();
        dashboardBlinkOverlay.classList.add('blink-animation');
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 600);
    });

    devBtn.addEventListener('click', (e) => {
        e.preventDefault();
        devBlinkOverlay.classList.add('blink-animation');
        setTimeout(() => {
            window.location.href = '/dev';
        }, 600);
    });
});