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

// Form Submission Handler
const prayerRequestForm = document.getElementById('prayerRequestForm'); 
const formMessage = document.getElementById('formMessage');

prayerRequestForm.addEventListener('submit', (e) => {
    // Show loading state
    const submitBtn = prayerRequestForm.querySelector('.submit-btn');
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // The form will submit naturally via FormSubmit
    // No need to prevent default since we're using the service
});

// Form validation enhancements
const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

inputs.forEach(input => {
    // Add real-time validation feedback
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#e74c3c';
        } else {
            input.style.borderColor = '#e0e0e0';
        }
    });
    
    input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(231, 76, 60)') {
            input.style.borderColor = '#e0e0e0';
        }
    });
});
