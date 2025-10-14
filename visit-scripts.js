// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-nav-toggle');
const navbar = document.querySelector('.navbar');
const dropdowns = document.querySelectorAll('.dropdown');

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

// Mobile Dropdown Toggle
dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
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
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Back to Top Button - Show/Hide on scroll
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

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
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});