// Initialize functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCopyFunctionality();
    initScrollToTopFunctionality();
    initMobileNavigation();
    initHeaderScroll();
});

/**
 * Initializes the copy to clipboard functionality for bank details.
 */
function initCopyFunctionality() {
    const copyButtons = document.querySelectorAll('.copy-icon-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const copyItem = this.closest('.copy-item');
            const textToCopy = copyItem.getAttribute('data-copy');
            
            copyToClipboard(textToCopy, copyItem, this);
        });
    });
}

/**
 * Function to copy text to clipboard using the modern API.
 * Includes visual feedback and a fallback method.
 */
function copyToClipboard(text, itemElement, buttonElement) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showCopySuccess(itemElement, buttonElement);
        }).catch(err => {
            console.error('Failed to copy with modern API:', err);
            fallbackCopy(text, itemElement, buttonElement);
        });
    } else {
        fallbackCopy(text, itemElement, buttonElement);
    }
}

/**
 * Fallback copy method for older browsers using document.execCommand('copy').
 */
function fallbackCopy(text, itemElement, buttonElement) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(itemElement, buttonElement);
        } else {
            alert('Could not automatically copy. Please manually copy this text: ' + text);
        }
    } catch (err) {
        console.error('Fallback copy failed:', err);
        alert('Could not automatically copy. Please manually copy this text: ' + text);
    }
    
    document.body.removeChild(textArea);
}

/**
 * Shows the success feedback on the copied element.
 */
function showCopySuccess(itemElement, buttonElement) {
    const originalIcon = buttonElement.innerHTML;
    
    itemElement.classList.add('copied');
    buttonElement.innerHTML = '<i class="fas fa-check"></i>';
    
    setTimeout(() => {
        itemElement.classList.remove('copied');
        buttonElement.innerHTML = originalIcon;
    }, 2000);
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