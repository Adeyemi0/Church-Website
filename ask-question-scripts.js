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
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        category: document.getElementById('category').value,
        prayer: document.getElementById('prayer').value, 
        confidential: document.getElementById('confidential').checked 
    };
    
    // Show loading state
    const submitBtn = prayerRequestForm.querySelector('.submit-btn');
    const originalBtnContent = '<span>Send Prayer Request</span><i class="fa-solid fa-hand-holding-heart"></i>'; 
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalBtnContent;
        submitBtn.disabled = false;
        
        // Show success message
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Amen! Your prayer request has been submitted successfully. Our prayer team will lift you and your needs up to the Lord. Blessings!';
        
        // Reset form
        prayerRequestForm.reset();
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide message after 8 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 8000);
        
        // Log form data to console (for testing)
        console.log('Prayer Request submitted:', formData);
        
    }, 1500);
    
    // In production, replace the setTimeout above with actual form submission:
    /*
    fetch('your-api-endpoint.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        submitBtn.innerHTML = originalBtnContent;
        submitBtn.disabled = false;
        
        if (data.success) {
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Amen! Your prayer request has been submitted successfully. Our prayer team will lift you and your needs up to the Lord. Blessings!';
            prayerRequestForm.reset();
        } else {
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Sorry, there was an error submitting your prayer request. Please try again.';
        }
        
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    })
    .catch(error => {
        submitBtn.innerHTML = originalBtnContent;
        submitBtn.disabled = false;
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Sorry, there was an error submitting your prayer request. Please try again.';
        console.error('Error:', error);
    });
    */
});

// Form validation enhancements
const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

inputs.forEach(input => {
    // Add real-time validation feedback
    input.addEventListener('blur', () => {
        // The 'required' attribute on the input field in the HTML handles core validation.
        // This JavaScript section applies styling only if 'required' is present and the field is empty.
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
