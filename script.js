// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => {
        if (n && hamburger && navMenu) {
            n.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        }
    });
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor) {
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
        }
    });
});

// Menu Tab Functionality
function initMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');

    if (menuTabs.length === 0) {
        console.log('Menu tabs not found');
        return;
    }

    menuTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Get the category ID from the clicked tab
            const categoryId = this.getAttribute('data-category');
            console.log('Tab clicked, category:', categoryId);
            
            // Get fresh references to all tabs and categories
            const allTabs = document.querySelectorAll('.menu-tab');
            const allCategories = document.querySelectorAll('.menu-category');
            
            console.log('Found tabs:', allTabs.length, 'Found categories:', allCategories.length);
            
            // Remove active class from all tabs
            allTabs.forEach(t => {
                t.classList.remove('active');
            });
            
            // Remove active class from all categories (CSS will hide them)
            allCategories.forEach(c => {
                c.classList.remove('active');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Find and show the corresponding category
            const categoryElement = document.getElementById(categoryId);
            
            if (categoryElement) {
                console.log('Found category element:', categoryId);
                // Add active class - CSS will show it
                categoryElement.classList.add('active');
                
                // Force a reflow to ensure CSS is applied
                categoryElement.offsetHeight;
            } else {
                console.error('Category element not found:', categoryId);
                // Try alternative selector
                const altElement = document.querySelector(`#${categoryId}.menu-category`);
                if (altElement) {
                    console.log('Found by alternative selector');
                    altElement.classList.add('active');
                    altElement.offsetHeight;
                }
            }
        });
    });
}

// Initialize menu tabs when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenuTabs);
} else {
    initMenuTabs();
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
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
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Close any open notifications
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
});

// Skip animation on click
let animationSkipped = false;

function skipAnimation() {
    if (animationSkipped) return;
    animationSkipped = true;

    // Hide Star Wars crawl
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        heroDescription.style.opacity = '0';
        heroDescription.style.visibility = 'hidden';
    }

    // Show BAR VADER text immediately
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.style.opacity = '1';
        heroText.style.transform = 'translateY(0)';
        heroText.style.animation = 'none';
    }

    // Show subtitle immediately
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0)';
        heroSubtitle.style.animation = 'none';
    }

    // Show buttons immediately
    const heroButtons = document.querySelector('.hero-buttons');
    if (heroButtons) {
        heroButtons.style.opacity = '1';
        heroButtons.style.transform = 'translateY(0)';
        heroButtons.style.animation = 'none';
    }

    // Show nav text immediately
    const navLogoText = document.querySelector('.nav-logo span');
    if (navLogoText) {
        navLogoText.style.opacity = '1';
        navLogoText.style.transform = 'translateY(0)';
        navLogoText.style.animation = 'none';
    }

    // Show video background immediately
    const heroVideoContainer = document.querySelector('.hero-video');
    if (heroVideoContainer) {
        heroVideoContainer.style.opacity = '1';
        heroVideoContainer.style.animation = 'none';
    }

    // Start video immediately
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        heroVideo.play().catch(error => {
            console.log('Video play error:', error);
            setTimeout(() => heroVideo.play(), 500);
        });
    }
}

// Add click handler to hero section to skip animation
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.cursor = 'pointer';
        
        // Add visual hint that it's clickable
        const skipHint = document.createElement('div');
        skipHint.textContent = 'Click to skip intro';
        skipHint.style.cssText = `
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            color: rgba(255, 255, 255, 0.6);
            font-family: 'Rajdhani', sans-serif;
            font-size: 0.9rem;
            letter-spacing: 2px;
            z-index: 10;
            pointer-events: none;
            animation: fadeInOut 3s ease-in-out infinite;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 0.8; }
            }
        `;
        document.head.appendChild(style);
        
        heroSection.appendChild(skipHint);
        
        // Hide hint after 10 seconds
        setTimeout(() => {
            if (skipHint.parentNode) {
                skipHint.style.transition = 'opacity 1s ease';
                skipHint.style.opacity = '0';
                setTimeout(() => {
                    if (skipHint.parentNode) {
                        skipHint.remove();
                    }
                }, 1000);
            }
        }, 10000);
        
        // Single click handler for skipping animation
        heroSection.addEventListener('click', () => {
            if (skipHint.parentNode) {
                skipHint.remove();
            }
            skipAnimation();
        });
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
        if (!animationSkipped && Date.now() - pageLoadTime < 15000) {
            heroVideo.currentTime = 0;
            heroVideo.pause();
        }
    };
    
    // Pause video when it loads
    heroVideo.addEventListener('loadedmetadata', pauseOnFirstFrame, { once: true });
    heroVideo.addEventListener('loadeddata', pauseOnFirstFrame, { once: true });
    heroVideo.addEventListener('canplay', pauseOnFirstFrame, { once: true });
    
    // Prevent video from playing before 15 seconds (unless animation was skipped)
    heroVideo.addEventListener('play', function preventEarlyPlay(e) {
        if (animationSkipped) {
            heroVideo.removeEventListener('play', preventEarlyPlay);
            return;
        }
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
