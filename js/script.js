// static/js/script.js

// ========================================
// NAVIGATION MENU
// ========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const closeMenu = document.getElementById('closeMenu');

// Open menu with hamburger
if (hamburger) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click from bubbling
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});
// ========================================
// HERO SLIDER
// ========================================
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');

let currentSlide = 0;
let slideInterval;

// Function to show a specific slide
function showSlide(n) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Handle wraparound
    if (n >= slides.length) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = n;
    }
    
    // Add active class to current slide and indicator
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Next slide
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Previous slide
function previousSlide() {
    showSlide(currentSlide - 1);
}

// Auto-play slider
function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

// Event listeners for slider controls
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideShow();
        startSlideShow(); // Restart auto-play
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        previousSlide();
        stopSlideShow();
        startSlideShow(); // Restart auto-play
    });
}

// Event listeners for indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
        stopSlideShow();
        startSlideShow(); // Restart auto-play
    });
});

// Pause slider on hover
const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopSlideShow);
    sliderContainer.addEventListener('mouseleave', startSlideShow);
}

// Start the slideshow when page loads
if (slides.length > 0) {
    startSlideShow();
}

// ========================================
// KEYBOARD NAVIGATION FOR SLIDER
// ========================================
document.addEventListener('keydown', (e) => {
    if (slides.length > 0) {
        if (e.key === 'ArrowLeft') {
            previousSlide();
            stopSlideShow();
            startSlideShow();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopSlideShow();
            startSlideShow();
        }
    }
});

// ========================================
// SMOOTH SCROLLING
// ========================================
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

// ========================================
// FORM VALIDATION
// ========================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            e.preventDefault();
            alert('Please fill in all required fields.');
            return false;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return false;
        }
    });
}

// ========================================
// FLASH MESSAGE AUTO-DISMISS
// ========================================
const flashMessages = document.querySelectorAll('.flash-message');
flashMessages.forEach(message => {
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            message.remove();
        }, 300);
    }, 5000); // Auto-dismiss after 5 seconds
});

// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// SCROLL ANIMATIONS (Optional Enhancement)
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-item, .certificate-item, .skill-category');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ========================================
// LOGO CLICK TO HOME
// ========================================
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', () => {
        window.location.href = '/';
    });
}

// ========================================
// PREVENT CONTEXT MENU ON IMAGES (Optional)
// ========================================
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        // Uncomment to disable right-click on images
        // e.preventDefault();
    });
});

// ========================================
// ACTIVE PAGE HIGHLIGHTING
// ========================================
const currentPath = window.location.pathname;
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
    }
});

// ========================================
// PERFORMANCE: Preload next slide image
// ========================================
if (slides.length > 1) {
    const nextSlideIndex = (currentSlide + 1) % slides.length;
    const nextSlideImage = slides[nextSlideIndex].style.backgroundImage;
    if (nextSlideImage) {
        const img = new Image();
        img.src = nextSlideImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
    }
}

// ========================================
// ACCESSIBILITY: Focus management
// ========================================
navMenu.addEventListener('transitionend', () => {
    if (navMenu.classList.contains('active')) {
        closeMenu.focus();
    }
});

// Trap focus within menu when open
navMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.focus();
    }
});

console.log('Portfolio JavaScript loaded successfully!');