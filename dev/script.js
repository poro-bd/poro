document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successModal = document.getElementById('successModal');
    const backHomeBtn = document.getElementById('backHomeBtn');
    const bookCallBtn = document.getElementById('bookCallBtn');
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[\S@]+@[\S@]+\.[\S@]+$/;
        return emailRegex.test(email);
    }
    
    // ADDED: Custom Select Logic
    const customSelectTrigger = document.getElementById('customSelectTrigger');
    const customSelectOptions = document.getElementById('customSelectOptions');
    const selectedOptionText = document.getElementById('selectedOptionText');
    const hiddenInput = document.getElementById('interested_in');

    customSelectTrigger.addEventListener('click', function() {
        customSelectOptions.classList.toggle('open');
        customSelectTrigger.classList.toggle('focus'); // For styling focus state
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', function(event) {
        if (!customSelectTrigger.contains(event.target) && !customSelectOptions.contains(event.target)) {
            customSelectOptions.classList.remove('open');
            customSelectTrigger.classList.remove('focus');
        }
    });

    // Handle option selection
    const options = document.querySelectorAll('.custom-select-option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            selectedOptionText.textContent = value;
            hiddenInput.value = value; // Update hidden input
            customSelectOptions.classList.remove('open');
            customSelectTrigger.classList.remove('focus');
        });
    });

    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const interested_in = hiddenInput.value; // Get value from hidden input
        const notes = document.getElementById('notes').value.trim();
        
        // Validate email
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Validate selection
        if (!interested_in) {
                alert('Please select a field you are interested in');
                return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.textContent = '';
        
        // Prepare data payload
        const payload = {
            name: name,
            email: email,
            interested_in: interested_in,
            addNotes: notes
        };
        
        // Send POST request (fire and forget)
        fetch('https://example.com/api  ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }).catch(error => {
            // We don't care about errors, just fire and forget
            console.log('Request sent (fire and forget)');
        });
        
        // Show success modal after 0.5s
        setTimeout(function() {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Send Message';
            
            successModal.classList.add('active');
        }, 500);
    });
    
    // Modal button handlers
    backHomeBtn.addEventListener('click', function() {
        const blinkOverlay = backHomeBtn.querySelector('.blink-overlay');
        if (blinkOverlay) {
            blinkOverlay.classList.add('blink-animation');
            setTimeout(() => {
                blinkOverlay.classList.remove('blink-animation');
                window.location.href = '/';
            }, 600);
        }
    });
    
    bookCallBtn.addEventListener('click', function() {
        const blinkOverlay = bookCallBtn.querySelector('.blink-overlay');
        if (blinkOverlay) {
            blinkOverlay.classList.add('blink-animation');
            setTimeout(() => {
                blinkOverlay.classList.remove('blink-animation');
                window.open('https://calendly.com/asayman/consultancy', '_blank');
            }, 600);
        }
    });

    const buttons = document.querySelectorAll('.social-link, .calendly-link, .back-link');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const blinkOverlay = button.querySelector('.blink-overlay');
            if (blinkOverlay) {
                blinkOverlay.classList.add('blink-animation');
                setTimeout(() => {
                    blinkOverlay.classList.remove('blink-animation');
                    window.open(button.href, '_blank');
                }, 600);
            }
        });
    });
});
