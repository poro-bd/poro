// Enhanced button animations
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    const formInputs = document.querySelectorAll('.form-input');
    
    // Button animations
    buttons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(40px)';
        btn.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 400 + (index * 250));

        btn.addEventListener('click', (e) => {
            if (btn.type !== 'submit') {
                e.preventDefault();
                const blinkOverlay = btn.querySelector('.blink-overlay');
                if (blinkOverlay) {
                    blinkOverlay.classList.add('blink-animation');
                    setTimeout(() => {
                        blinkOverlay.classList.remove('blink-animation');
                        window.location.href = btn.href;
                    }, 600);
                }
            }
        });
    });
    
    // Form input animations
    formInputs.forEach((input, index) => {
        input.style.opacity = '0';
        input.style.transform = 'translateY(20px)';
        input.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            input.style.opacity = '1';
            input.style.transform = 'translateY(0)';
        }, 600 + (index * 150));
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
    
    // Form submission
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const id = document.getElementById('id').value;
        const password = document.getElementById('password').value;
        
        // Clear previous error
        errorMessage.textContent = '';
        
        // Show loading state
        const submitBtn = loginForm.querySelector('.btn-primary');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="btn-icon login-icon"><i class="fas fa-spinner fa-spin"></i></span> Logging in...';
        submitBtn.disabled = true;
        
        try {
            const BASE_URL = 'http://localhost:5678';
            const response = await fetch(`${BASE_URL}/webhook/poro-login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    pass: password
                })
            });
            
            if (response.status === 403) {
                errorMessage.textContent = 'Invalid ID or password';
            } else if (response.ok) {
                const data = await response.json();
                
                if (data.session) {
                    // Save session to sessionStorage
                    sessionStorage.setItem('session', data.session);
                    
                    // Get redirect path from query parameter
                    const urlParams = new URLSearchParams(window.location.search);
                    const redirectPath = urlParams.get('r');
                    
                    // Redirect user
                    if (redirectPath) {
                        window.location.href = redirectPath;
                    } else {
                        window.location.href = '/dashboard';
                    }
                } else {
                    errorMessage.textContent = 'Invalid response from server';
                }
            } else {
                errorMessage.textContent = 'Login failed. Please try again.';
            }
        } catch (error) {
            console.error('Login error:', error);
            errorMessage.textContent = 'Network error. Please check your connection.';
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
});