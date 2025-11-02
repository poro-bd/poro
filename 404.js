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

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const blinkOverlay = btn.querySelector('.blink-overlay');
            if (blinkOverlay) {
                blinkOverlay.classList.add('blink-animation');
                setTimeout(() => {
                    blinkOverlay.classList.remove('blink-animation');
                    window.location.href = btn.href;
                }, 600);
            }
        });
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
});