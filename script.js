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

if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
        const isActive = mobileNav.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
        const icon = isActive ? 'x' : 'menu';
        mobileMenuBtn.innerHTML = `<i data-lucide="${icon}"></i>`;
        lucide.createIcons();
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
            mobileMenuBtn.innerHTML = `<i data-lucide="menu"></i>`;
            lucide.createIcons();
        });
    });
}

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

// Form Submission & Redirection to contato@alvant.com.br
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        const name = document.getElementById('name') ? document.getElementById('name').value : '';
        const userEmail = document.getElementById('email') ? document.getElementById('email').value : '';
        const produto = document.getElementById('produto') ? document.getElementById('produto').value : '';
        const assunto = document.getElementById('assunto') ? document.getElementById('assunto').value : (produto || 'Contato via Site Alvant');
        const mensagem = document.getElementById('message') ? document.getElementById('message').value : (document.getElementById('empresa') ? `Empresa/Detalhamento: ${document.getElementById('empresa').value}` : '');
        
        // Simulating loading state
        btn.innerHTML = 'Enviando... <i data-lucide="loader-2" class="spin"></i>';
        lucide.createIcons();
        btn.disabled = true;
        
        // Construct mailto link to contato@alvant.com.br
        const mailtoSubject = encodeURIComponent(`[Contato Site Alvant] ${assunto}`);
        const mailtoBody = encodeURIComponent(
            `Nome: ${name}\n` +
            `E-mail de Contato: ${userEmail}\n` +
            `Assunto/Produto: ${assunto}\n\n` +
            `Mensagem / Detalhes:\n${mensagem}`
        );
        
        setTimeout(() => {
            // Trigger mailto client to contato@alvant.com.br
            window.location.href = `mailto:contato@alvant.com.br?subject=${mailtoSubject}&body=${mailtoBody}`;
            
            btn.innerHTML = 'Solicitação Enviada! <i data-lucide="check"></i>';
            btn.style.background = '#27c93f';
            lucide.createIcons();
            
            contactForm.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                lucide.createIcons();
            }, 4000);
        }, 1200);
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

// Draggable WhatsApp Floating Button using Modern Pointer Events (Prevents Draglock)
const waBtn = document.getElementById('whatsapp-float');
if (waBtn) {
    let isDragging = false;
    let dragMoved = false;
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;

    // Desativa o drag de imagem nativo do link pelo navegador
    waBtn.addEventListener('dragstart', (e) => e.preventDefault());

    waBtn.addEventListener('pointerdown', (e) => {
        isDragging = true;
        dragMoved = false;
        
        try {
            waBtn.setPointerCapture(e.pointerId);
        } catch (err) {}
        
        const rect = waBtn.getBoundingClientRect();
        startX = e.clientX;
        startY = e.clientY;
        initialLeft = rect.left;
        initialTop = rect.top;
        
        waBtn.style.transition = 'none';
    });

    waBtn.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        if (Math.hypot(deltaX, deltaY) > 6) {
            dragMoved = true;
        }

        if (dragMoved) {
            let newLeft = initialLeft + deltaX;
            let newTop = initialTop + deltaY;

            const maxLeft = window.innerWidth - waBtn.offsetWidth - 10;
            const maxTop = window.innerHeight - waBtn.offsetHeight - 10;
            
            newLeft = Math.max(10, Math.min(newLeft, maxLeft));
            newTop = Math.max(10, Math.min(newTop, maxTop));

            waBtn.style.left = `${newLeft}px`;
            waBtn.style.top = `${newTop}px`;
            waBtn.style.bottom = 'auto';
            waBtn.style.right = 'auto';
        }
    });

    const releasePointer = (e) => {
        if (isDragging) {
            isDragging = false;
            try {
                waBtn.releasePointerCapture(e.pointerId);
            } catch (err) {}
            waBtn.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
        }
    };

    waBtn.addEventListener('pointerup', releasePointer);
    waBtn.addEventListener('pointercancel', releasePointer);

    waBtn.addEventListener('click', (e) => {
        if (dragMoved) {
            e.preventDefault();
            e.stopPropagation();
            dragMoved = false;
        }
    });
}
