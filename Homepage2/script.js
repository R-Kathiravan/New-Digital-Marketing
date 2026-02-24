const header = document.getElementById('header');
const wrapper = document.getElementById('header-wrap');

const triggerHeight = 150;

if (window.innerWidth > 768) {

    window.addEventListener('scroll', () => {

        if (window.scrollY > triggerHeight) {
            wrapper.style.height = `${header.offsetHeight}px`;
            header.classList.add('fixed');
        } else {
            wrapper.style.height = 'auto';
            header.classList.remove('fixed');
        }

    });

}

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
    if (!hamburger) return;
    if (!closeMenu) return;
    hamburger.addEventListener("click", openMenu);
    closeMenu.addEventListener("click", closeNav);

    document.querySelectorAll(".nav-items a").forEach(link => {
        link.addEventListener("click", closeNav);
    });
});
gsap.registerPlugin(ScrollTrigger);


document.addEventListener("DOMContentLoaded", () => {
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    heroTl.to(".hero-badge", {
        y: 0,
        opacity: 1,
        duration: 0.8
    })

        .to(".line-inner", {
            y: "0%",
            duration: 1.2,
            stagger: 0.15,
            ease: "expo.out"
        }, "-=0.4")
        .to(".hero-desc", {
            opacity: 1,
            y: 0,
            duration: 1
        }, "-=0.8")
        .to(".hero-actions", {
            opacity: 1,
            y: 0,
            duration: 1
        }, "-=0.8")

        .to(".main-image-wrapper", {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "power3.inOut"
        }, "-=1.2")
        .to(".hero-img", {
            scale: 1,
            duration: 1.5,
            ease: "power3.inOut"
        }, "-=1.5")

        .to(".floating-glass-card", {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "back.out(1.5)"
        }, "-=0.5");

    gsap.to(".floating-glass-card", {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2
    });

});


document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
        duration: 2.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);


    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
    heroTl.to(".hero-badge", { y: 0, opacity: 1, duration: 0.8 });

});

const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    gsap.to(cursorDot, {
        x: posX,
        y: posY,
        duration: 0,
    });

    gsap.to(cursorOutline, {
        x: posX,
        y: posY,
        duration: 0.15,
        ease: "power2.out"
    });
});

const toggleInput = document.getElementById("billing-toggle");
const amounts = document.querySelectorAll(".amount:not(.custom-price)");
const labelMonthly = document.getElementById("label-monthly");
const labelAnnual = document.getElementById("label-annual");

if (toggleInput) {
    labelMonthly.classList.add("active");

    toggleInput.addEventListener("change", () => {
        if (toggleInput.checked) {
            labelMonthly.classList.remove("active");
            labelAnnual.classList.add("active");

            amounts.forEach(amount => {
                gsap.to(amount, {
                    opacity: 0,
                    y: -10,
                    duration: 0.2,
                    onComplete: () => {
                        amount.innerText = amount.getAttribute("data-annual");
                        gsap.to(amount, { opacity: 1, y: 0, duration: 0.2 });
                    }
                });
            });
        } else {
            labelAnnual.classList.remove("active");
            labelMonthly.classList.add("active");

            amounts.forEach(amount => {
                gsap.to(amount, {
                    opacity: 0,
                    y: 10,
                    duration: 0.2,
                    onComplete: () => {
                        amount.innerText = amount.getAttribute("data-monthly");
                        gsap.to(amount, { opacity: 1, y: 0, duration: 0.2 });
                    }
                });
            });
        }
    });
}

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');

    questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        faqItems.forEach(i => i.classList.remove('active'));

        if (!isActive) {
            item.classList.add('active');
        }
    });
});

gsap.from(".faq-item", {
    scrollTrigger: {
        trigger: ".faq-section",
        start: "top 80%",
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: "power2.out"
});

gsap.from(".enterprise-card", {
    scrollTrigger: {
        trigger: ".enterprise-banner-section",
        start: "top 85%",
    },
    scale: 0.95,
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
});