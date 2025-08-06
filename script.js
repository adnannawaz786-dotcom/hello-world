// Hello World Interactive Script
// Modern JavaScript with smooth animations and interactivity

document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const greeting = document.querySelector('.greeting');
    const description = document.querySelector('.description');
    const interactiveBtn = document.querySelector('.interactive-btn');
    const container = document.querySelector('.container');
    
    // Error handling for missing elements
    if (!greeting || !description || !interactiveBtn || !container) {
        console.warn('Some DOM elements not found. Script may not work as expected.');
        return;
    }

    // Animation sequence on page load
    function initializeAnimations() {
        // Stagger animations for smooth entrance
        setTimeout(() => {
            greeting.style.opacity = '1';
            greeting.style.transform = 'translateY(0)';
        }, 300);

        setTimeout(() => {
            description.style.opacity = '1';
            description.style.transform = 'translateY(0)';
        }, 600);

        setTimeout(() => {
            interactiveBtn.style.opacity = '1';
            interactiveBtn.style.transform = 'translateY(0)';
        }, 900);
    }

    // Interactive button functionality
    let clickCount = 0;
    const messages = [
        "Hello World! 👋",
        "Welcome to coding! 🚀",
        "Keep exploring! ✨",
        "You're awesome! 🌟",
        "Code with passion! 💻"
    ];

    function handleButtonClick() {
        clickCount++;
        const messageIndex = (clickCount - 1) % messages.length;
        
        // Update greeting text with smooth transition
        greeting.style.transform = 'scale(0.95)';
        greeting.style.opacity = '0.7';
        
        setTimeout(() => {
            greeting.textContent = messages[messageIndex];
            greeting.style.transform = 'scale(1)';
            greeting.style.opacity = '1';
        }, 200);

        // Add ripple effect to button
        createRippleEffect(interactiveBtn, event);
        
        // Update button text
        updateButtonText();
        
        // Add celebration effect every 5 clicks
        if (clickCount % 5 === 0) {
            createCelebrationEffect();
        }
    }

    function updateButtonText() {
        const buttonTexts = [
            "Click me again!",
            "One more time!",
            "Keep going!",
            "Amazing!",
            "Try again!"
        ];
        
        const textIndex = (clickCount - 1) % buttonTexts.length;
        interactiveBtn.textContent = buttonTexts[textIndex];
    }

    // Ripple effect for button clicks
    function createRippleEffect(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event ? event.clientX - rect.left - size / 2 : rect.width / 2 - size / 2;
        const y = event ? event.clientY - rect.top - size / 2 : rect.height / 2 - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Celebration effect
    function createCelebrationEffect() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'];
        
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                createConfetti(colors[Math.floor(Math.random() * colors.length)]);
            }, i * 100);
        }
    }

    function createConfetti(color) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${color};
            top: -10px;
            left: ${Math.random() * 100}vw;
            z-index: 1000;
            border-radius: 50%;
            pointer-events: none;
            animation: confetti-fall ${2 + Math.random() * 2}s ease-out forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }

    // Keyboard accessibility
    function handleKeyPress(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleButtonClick();
        }
    }

    // Mouse movement parallax effect
    function handleMouseMove(event) {
        if (window.innerWidth < 768) return; // Skip on mobile for performance
        
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;
        
        const xPercent = (clientX / innerWidth - 0.5) * 2;
        const yPercent = (clientY / innerHeight - 0.5) * 2;
        
        container.style.transform = `
            perspective(1000px) 
            rotateX(${yPercent * 2}deg) 
            rotateY(${xPercent * 2}deg)
            translateZ(0)
        `;
    }

    // Reset parallax on mouse leave
    function resetParallax() {
        container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    }

    // Theme toggle functionality
    function initializeThemeToggle() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Listen for system theme changes
        prefersDark.addEventListener('change', (e) => {
            document.body.classList.toggle('dark-theme', e.matches);
        });
        
        // Set initial theme
        if (prefersDark.matches) {
            document.body.classList.add('dark-theme');
        }
    }

    // Performance optimization: Throttle mouse events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Event listeners
    interactiveBtn.addEventListener('click', handleButtonClick);
    interactiveBtn.addEventListener('keypress', handleKeyPress);
    document.addEventListener('mousemove', throttle(handleMouseMove, 16)); // ~60fps
    container.addEventListener('mouseleave', resetParallax);

    // Initialize everything
    initializeAnimations();
    initializeThemeToggle();

    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes confetti-fall {
            0% {
                transform: translateY(-10px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .container {
            transition: transform 0.1s ease-out;
        }
        
        .greeting, .description, .interactive-btn {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);

    // Console welcome message
    console.log('%c🎉 Hello World App Loaded Successfully!', 'color: #4ecdc4; font-size: 16px; font-weight: bold;');
    console.log('%cTip: Try clicking the button multiple times!', 'color: #45b7d1; font-size: 12px;');
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(() => console.log('SW registered'))
            .catch(() => console.log('SW registration failed'));
    });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Export any functions that need to be tested
    };
}