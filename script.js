document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    const closeMenu = document.getElementById("closeMenu");

    function openMenu() {
        navMenu.classList.add("active");
        closeMenu.classList.add("active");
        document.body.style.overflow = "hidden";
        lenis.stop();

    }

    function closeNav() {
        navMenu.classList.remove("active");
        closeMenu.classList.remove("active");
        document.body.style.overflow = "";
        lenis.start();

    }

    hamburger.addEventListener("click", openMenu);
    closeMenu.addEventListener("click", closeNav);

    document.querySelectorAll(".nav-items a").forEach(link => {
        link.addEventListener("click", closeNav);
    });
    const header = document.getElementById('header');
    const wrapper = document.getElementById('header-wrapper');

    const triggerHeight = 150;

    if (window.innerWidth > 768) {

        window.addEventListener('scroll', () => {

            if (window.scrollY > triggerHeight) {
                wrapper.style.height = `${header.offsetHeight}px`;
                header.classList.add('is-fixed');
            } else {
                wrapper.style.height = 'auto';
                header.classList.remove('is-fixed');
            }

        });

    }


    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    const hoverTriggers = document.querySelectorAll('.hover-trigger');
    hoverTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hovered');
            cursorDot.style.opacity = '0';
        });
        trigger.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hovered');
            cursorDot.style.opacity = '1';
        });
    });

    const revealElements = document.querySelectorAll('.reveal-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});


// GSAP Animation
const isMobile = window.innerWidth < 768;

const lenis = new Lenis({
    duration: isMobile ? 2.5 : 1.6,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothTouch: true
});


lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);


const floaters = document.querySelectorAll('.floater');

floaters.forEach((floater) => {
    const speed = floater.getAttribute('data-speed') || 0.5;

    gsap.to(floater, {
        scrollTrigger: {
            trigger: floater,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        },
        y: -100 * speed,
        ease: "none"
    });
});

gsap.from(".fade-left", {
    x: -100,
    opacity: 0,
    duration: 1
});

gsap.from(".fade-right", {
    x: 100,
    opacity: 0,
    duration: 1,
    delay: 0.5
});

gsap.from(".reveal-text ", {
    y: 80,
    opacity: 0,
    filter: "blur(10px)",
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".reveal-text",
        start: "top 85%",
    }
});

const sectionHeaders = document.querySelectorAll('.head-desc');

 sectionHeaders.forEach((header) => {
 
    const splitText = new SplitType(header, { types: 'words' });
 
    gsap.from(splitText.words, {
        scrollTrigger: {
            trigger: header,       
            start: 'top 85%',      
            toggleActions: 'play none none reverse'
        },
        y: 40,                    
        opacity: 0,               
        duration: 0.8,            
        ease: 'power3.out',       
        stagger: 0.08             
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const toastContainer = document.getElementById('toast-container');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact_name').value.trim();
            const email = document.getElementById('contact_email').value.trim();
            const service = document.getElementById('contact_service').value;
            const message = document.getElementById('contact_message').value.trim();

            if (!name) {
                showToast('Please enter your name.', 'error', 'person_off');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                showToast('Please enter a valid email address.', 'error', 'alternate_email');
                return;
            }

            if (!service) {
                showToast('Please select a service you are interested in.', 'error', 'work_off');
                return;
            }

            if (message.length < 20) {
                showToast('Please provide a bit more detail (minimum 20 characters).', 'error', 'short_text');
                return;
            }

            showToast('Message sent! We will contact you shortly.', 'success', 'send');

            contactForm.reset();

        });
    }

    function showToast(message, type, iconName) {
        const toast = document.createElement('div');
        toast.classList.add('toast', type);

        toast.innerHTML = `
            <span class="material-icons">${iconName}</span>
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 3500);
    }
});