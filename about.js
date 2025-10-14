// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    initHeaderScroll();
    initBackToTop();
    initSmoothScrolling();
    initScrollAnimations();
});

/**
 * Initialize mobile navigation toggle functionality
 */
function initMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navbar = document.querySelector('.navbar');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (mobileToggle && navbar) {
        mobileToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            
            // Toggle between hamburger and X icon
            if (navbar.classList.contains('active')) {
                mobileToggle.classList.remove('fa-bars');
                mobileToggle.classList.add('fa-times');
            } else {
                mobileToggle.classList.remove('fa-times');
                mobileToggle.classList.add('fa-bars');
            }
        });
    }

    // Mobile Dropdown Toggle
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && !link.classList.contains('dropdown-toggle')) {
                navbar.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.classList.add('fa-bars');
                    mobileToggle.classList.remove('fa-times');
                }
                
                // Close any open dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    });
}

/**
 * Initialize header scroll effect
 */
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

/**
 * Initialize back to top button functionality
 */
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for dropdown toggles
            if (this.classList.contains('dropdown-toggle')) {
                return;
            }
            
            // Don't do anything for empty hash
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize scroll animations for sections
 */
function initScrollAnimations() {
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

    // Observe all major sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Observe value items
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}