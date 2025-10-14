// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
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
                mobileToggle.classList.add('fa-bars');
                mobileToggle.classList.remove('fa-times');
                
                // Close any open dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    });

    // Header scroll effect
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

    // Back to Top Button - Show/Hide on scroll
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

    // Active Navigation Link on Scroll - UPDATED LOGIC
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.navbar a');

    if (sections.length > 0 && navLinksAll.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.scrollY;
            
            // 1. Determine the current section ID
            sections.forEach(section => {
                // Use a larger offset for better accuracy, e.g., half the screen height
                const sectionTop = section.offsetTop;
                if (scrollPosition >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            // 2. Set the active class on the corresponding link
            navLinksAll.forEach(link => {
                link.classList.remove('active');

                const href = link.getAttribute('href');

                // Case 1: Link to a section on the same page (e.g., #ministries)
                // Check if the link's href is an anchor AND includes the current section ID.
                // We ensure 'current' is not an empty string to fix the bug.
                if (current && href.startsWith('#') && href.includes(current)) {
                    link.classList.add('active');
                }
                
                // Case 2: The 'Home' link (home.html)
                // If scroll is near the top (e.g., within 100px), set 'Home' as active
                if (scrollPosition < 100 && href === 'home.html') {
                    link.classList.add('active');
                }
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for dropdown toggles
            if (this.classList.contains('dropdown-toggle')) {
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
});
