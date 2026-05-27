// Initialize Lucide Icons
lucide.createIcons();

// Set Current Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');

mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    const icon = mobileNav.classList.contains('active') ? 'x' : 'menu';
    mobileMenuBtn.innerHTML = `<i data-lucide="${icon}"></i>`;
    lucide.createIcons();
});

// Close mobile menu when clicking a link
const mobileLinks = mobileNav.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileMenuBtn.innerHTML = `<i data-lucide="menu"></i>`;
        lucide.createIcons();
    });
});

// Scroll Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', reveal);
// Trigger reveal on load
reveal();

// Form Submission (Simulation)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        // Simulating loading state
        btn.innerHTML = 'Enviando... <i data-lucide="loader-2" class="spin"></i>';
        lucide.createIcons();
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = 'Mensagem Enviada! <i data-lucide="check"></i>';
            btn.style.background = '#27c93f';
            lucide.createIcons();
            
            contactForm.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                lucide.createIcons();
            }, 3000);
        }, 1500);
    });
}

// Add simple CSS for the spinner
const style = document.createElement('style');
style.innerHTML = `
    .spin {
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
