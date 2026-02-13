// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced navbar on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.03)';
    }

    lastScroll = currentScroll;
});

// Form submission with animation
const ctaForm = document.querySelector('.cta-form');
if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = ctaForm.querySelector('input[type="email"]').value;
        const button = ctaForm.querySelector('button');

        // Animate button
        button.textContent = 'You\'re In! 🎉';
        button.style.background = 'linear-gradient(135deg, #FBBF24, #FB923C)';

        // Show success message
        setTimeout(() => {
            alert(`Awesome! We'll email you at ${email} as soon as TempMate is ready to ship. Get excited! ☕`);
            ctaForm.reset();
            button.textContent = 'Get Early Access 🎉';
            button.style.background = 'linear-gradient(135deg, #10B981, #14B8A6)';
        }, 500);
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.querySelectorAll('.problem-card, .feature-row, .step, .testimonial-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Parallax effect for background shapes
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const shapes = document.querySelectorAll('.bg-circle');

    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
});

// Animated counter for waitlist number
function animateCounter() {
    const finalNumber = 2847;
    const duration = 2000;
    const increment = finalNumber / (duration / 16);
    let current = 0;

    // Find all instances of the counter in the page
    const counterElements = document.querySelectorAll('.cta-note');

    const timer = setInterval(() => {
        current += increment;
        if (current >= finalNumber) {
            current = finalNumber;
            clearInterval(timer);
        }

        counterElements.forEach(el => {
            if (el.textContent.includes('people on the waitlist')) {
                el.textContent = `✨ Join ${Math.floor(current).toLocaleString()} people on the waitlist • Free shipping on all pre-orders`;
            }
        });
    }, 16);
}

// Trigger counter animation when CTA section is visible
const ctaSection = document.querySelector('.cta');
if (ctaSection) {
    const ctaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                ctaObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    ctaObserver.observe(ctaSection);
}

// Add hover effects to image placeholders
document.querySelectorAll('.image-placeholder').forEach(placeholder => {
    placeholder.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });

    placeholder.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Video placeholder click effect
const videoPlaceholder = document.querySelector('.video-placeholder');
if (videoPlaceholder) {
    videoPlaceholder.style.cursor = 'pointer';
    videoPlaceholder.addEventListener('click', function() {
        alert('🎬 Video coming soon! We\'re putting the finishing touches on an awesome demo video.');
    });
}

// Add fun emoji reactions on button hovers
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.animation = 'wiggle 0.5s ease';
    });

    button.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// Add wiggle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes wiggle {
        0%, 100% { transform: rotate(0deg) translateY(-3px); }
        25% { transform: rotate(-2deg) translateY(-3px); }
        75% { transform: rotate(2deg) translateY(-3px); }
    }

    .fade-in {
        animation: fadeInUp 0.8s ease forwards;
    }
`;
document.head.appendChild(style);

// Easter egg: konami code for fun
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiPattern.length);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
            alert('☕ You found the secret! Coffee lovers unite! 🎉');
        }, 2000);
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('☕ Welcome to TempMate! Made with love for coffee enthusiasts 💚');
