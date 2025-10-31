// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Menu Tab Functionality
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCategories = document.querySelectorAll('.menu-category');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and categories
        menuTabs.forEach(t => t.classList.remove('active'));
        menuCategories.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding category
        const category = tab.getAttribute('data-category');
        document.getElementById(category).classList.add('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Reservation Form Handling
const reservationForm = document.getElementById('reservation-form');

reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(reservationForm);
    const reservationData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        date: formData.get('date'),
        time: formData.get('time'),
        guests: formData.get('guests')
    };
    
    // Simple validation
    if (!reservationData.name || !reservationData.email || !reservationData.phone || 
        !reservationData.date || !reservationData.time || !reservationData.guests) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate reservation submission
    showNotification('Reservation submitted! We will contact you soon.', 'success');
    reservationForm.reset();
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        font-family: 'Rajdhani', sans-serif;
        font-weight: 600;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Consolidated DOMContentLoaded - all initialization in one place
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.menu-item, .feature, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add hover effects to menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.background = 'rgba(255, 255, 255, 0.05)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.background = 'transparent';
        });
    });

    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Form input animations
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // Add accessibility improvements
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            button.setAttribute('aria-label', button.textContent);
        }
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #ffffff';
            this.style.outlineOffset = '2px';
        });
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const stars = document.querySelector('.stars');
    
    if (hero && stars) {
        const rate = scrolled * -0.5;
        stars.style.transform = `translateY(${rate}px)`;
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Close any open notifications
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
});

// Video control - pause until 15 seconds (when BAR VADER appears)
let videoInitialized = false;
const pageLoadTime = Date.now();

function initVideo() {
    // Prevent multiple initializations
    if (videoInitialized) {
        return;
    }

    const heroVideo = document.getElementById('heroVideo');
    
    if (!heroVideo) {
        // Retry if video isn't loaded yet (max 10 attempts)
        let retries = 0;
        const maxRetries = 10;
        const retryInterval = setInterval(() => {
            retries++;
            const video = document.getElementById('heroVideo');
            if (video || retries >= maxRetries) {
                clearInterval(retryInterval);
                if (video) {
                    initVideo();
                }
            }
        }, 100);
        return;
    }
    
    videoInitialized = true;
    
    // Remove autoplay and pause video on first frame
    heroVideo.removeAttribute('autoplay');
    heroVideo.currentTime = 0;
    heroVideo.pause();
    
    // Function to ensure video stays paused
    const pauseOnFirstFrame = () => {
        if (Date.now() - pageLoadTime < 15000) {
            heroVideo.currentTime = 0;
            heroVideo.pause();
        }
    };
    
    // Pause video when it loads
    heroVideo.addEventListener('loadedmetadata', pauseOnFirstFrame, { once: true });
    heroVideo.addEventListener('loadeddata', pauseOnFirstFrame, { once: true });
    heroVideo.addEventListener('canplay', pauseOnFirstFrame, { once: true });
    
    // Prevent video from playing before 15 seconds
    heroVideo.addEventListener('play', function preventEarlyPlay(e) {
        const timeSinceLoad = Date.now() - pageLoadTime;
        if (timeSinceLoad < 15000) {
            e.preventDefault();
            heroVideo.pause();
            heroVideo.currentTime = 0;
        } else {
            // Remove listener once we're past 15 seconds
            heroVideo.removeEventListener('play', preventEarlyPlay);
        }
    });
    
    // Start video after 15 seconds (when crawl finishes and BAR VADER appears)
    setTimeout(() => {
        heroVideo.play().catch(error => {
            console.log('Video play error:', error);
            // Retry play after a short delay
            setTimeout(() => heroVideo.play(), 500);
        });
    }, 15000);
    
    // Handle video loop
    heroVideo.addEventListener('ended', () => {
        heroVideo.currentTime = 0;
        heroVideo.play();
    }, { once: false });
}

// Initialize video when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideo);
} else {
    initVideo();
}
