// Initialize functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initDownloadFunctionality();
    initScrollToTopFunctionality();
    initMobileNavigation();
    initHeaderScroll();
});

/**
 * Initializes the download functionality for audio messages.
 */
function initDownloadFunctionality() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const messageCard = this.closest('.message-card');
            const fileId = messageCard.getAttribute('data-file-id');
            const filename = messageCard.getAttribute('data-filename');
            
            downloadAudioFile(fileId, filename, messageCard, this);
        });
    });
}

/**
 * Function to download audio file from Google Drive.
 * Uses Google Drive's direct download link format.
 */
function downloadAudioFile(fileId, filename, cardElement, buttonElement) {
    // Add downloading state
    cardElement.classList.add('downloading');
    const originalText = buttonElement.querySelector('span').textContent;
    buttonElement.querySelector('span').textContent = 'Downloading...';
    
    // Create Google Drive direct download URL
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    link.setAttribute('target', '_blank');
    link.style.display = 'none';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(link);
    }, 100);
    
    // Show success feedback
    setTimeout(() => {
        cardElement.classList.remove('downloading');
        cardElement.classList.add('downloaded');
        buttonElement.querySelector('span').textContent = 'Downloaded!';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            cardElement.classList.remove('downloaded');
            buttonElement.querySelector('span').textContent = originalText;
        }, 3000);
    }, 500);
}

/**
 * Initializes the scroll to top button's visibility and click event.
 */
function initScrollToTopFunctionality() {
    const backToTopButton = document.querySelector('.back-to-top');

    if (!backToTopButton) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Initializes mobile navigation toggle functionality.
 */
function initMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navbar = document.querySelector('.navbar');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (mobileToggle && navbar) {
        mobileToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            
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
                
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    });
}

/**
 * Initializes header scroll effect.
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