document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');

    // Preloader Timeout
    setTimeout(() => {
        preloader.classList.add('fade-out');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }, 2000);
    const header = document.querySelector('header');
    const propertyGrid = document.getElementById('property-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const contactForm = document.getElementById('contactForm');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Sticky Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Add mobile active styles if needed
    });

    // Property Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            const cards = document.querySelectorAll('.property-card');

            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Form Submission to WhatsApp
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('wa_name').value;
        const email = document.getElementById('wa_email').value;
        const phone = document.getElementById('wa_phone').value;
        const message = document.getElementById('wa_message').value;

        // WhatsApp Details
        const whatsappNumber = "919876543210"; // Replace with real number
        
        const text = `*New Inquiry from MRP Real Estate*%0A%0A` +
                     `*Name:* ${name}%0A` +
                     `*Email:* ${email}%0A` +
                     `*Phone:* ${phone}%0A` +
                     `*Message:* ${message}`;

        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${text}`;
        
        // Visual Feedback
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Redirecting to WhatsApp...';
        btn.disabled = true;

        setTimeout(() => {
            window.open(whatsappURL, '_blank');
            contactForm.reset();
            btn.innerText = originalText;
            btn.disabled = false;
        }, 800);
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});
