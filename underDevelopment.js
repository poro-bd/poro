(function() {
    'use strict';

    // Inject CSS styles
    const style = document.createElement('style');
    style.textContent = `
        .under-development-overlay {
            position: fixed;
            top: 0;
            left: 280px;
            right: 0;
            bottom: 0;
            background: rgba(28, 55, 91, 0.95);
            backdrop-filter: blur(10px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 999;
            animation: fadeIn 0.5s ease;
        }

        @media (max-width: 768px) {
            .under-development-overlay {
                left: 0;
            }
        }

        .under-development-content {
            text-align: center;
            padding: 40px;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            max-width: 500px;
            margin: 20px;
        }

        .under-development-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 30px;
            background: linear-gradient(135deg, #ff6b6b 0%, #f093fb 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: pulse 2s ease-in-out infinite;
        }

        .under-development-icon svg {
            width: 40px;
            height: 40px;
            fill: white;
        }

        .under-development-title {
            font-size: 2rem;
            font-weight: 700;
            background: linear-gradient(90deg, #ff6b6b 0%, #ee5a6f 50%, #f093fb 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 15px;
        }

        .under-development-message {
            font-size: 1.1rem;
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.6;
            margin-bottom: 20px;
        }

        .under-development-subtitle {
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.6);
            font-style: italic;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
    `;
    document.head.appendChild(style);

    // Create overlay HTML
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'under-development-overlay';
        overlay.innerHTML = `
            <div class="under-development-content">
                <div class="under-development-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                    </svg>
                </div>
                <h1 class="under-development-title">Under Development</h1>
                <p class="under-development-message">
                    This page is currently under development. We're working hard to bring you new features and improvements.
                </p>
                <p class="under-development-subtitle">
                    Please check back soon!
                </p>
            </div>
        `;
        return overlay;
    }

    // Initialize overlay when DOM is ready
    function init() {
        // Wait for main content to be available
        const mainContent = document.querySelector('.main-content');
        if (!mainContent) {
            // If main content not found, try again after a short delay
            setTimeout(init, 100);
            return;
        }

        // Create and append overlay
        const overlay = createOverlay();
        document.body.appendChild(overlay);

        // Adjust overlay position on window resize
        function adjustOverlay() {
            const sidebar = document.querySelector('.sidebar');
            const overlay = document.querySelector('.under-development-overlay');
            
            if (overlay && sidebar) {
                if (window.innerWidth <= 768) {
                    overlay.style.left = '0';
                } else {
                    overlay.style.left = '280px';
                }
            }
        }

        window.addEventListener('resize', adjustOverlay);
        adjustOverlay();
    }

    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();


