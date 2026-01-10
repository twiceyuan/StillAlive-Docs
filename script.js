// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');

    setTheme(theme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
    updateScreenshot(theme);
}

function updateThemeIcon(theme) {
    // Icon is now controlled by CSS based on [data-theme] attribute
    // No JavaScript manipulation needed
}

function updateScreenshot(theme) {
    const screenshot = document.getElementById('appScreenshot');
    if (screenshot) {
        screenshot.src = theme === 'dark' ? 'images/dark-screenshot.png' : 'images/light-screenshot.png';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Initialize theme before page loads
initTheme();

document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Fade-in animations for elements
    const animatedElements = document.querySelectorAll('.feature-card, .hero-content, .hero-visual');
    animatedElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
});

// Add these styles dynamically for JS-enabled animations
const style = document.createElement('style');
style.textContent = `
    .fade-in-up {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .fade-in-up.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .feature-card.visible {
        transition-delay: 0.1s;
    }
    
    .feature-card:nth-child(2).visible {
        transition-delay: 0.2s;
    }
    
    .feature-card:nth-child(3).visible {
        transition-delay: 0.3s;
    }

    .feature-card:nth-child(4).visible {
        transition-delay: 0.4s;
    }
`;
document.head.appendChild(style);
