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

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", (event) => {

    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTl.from(".hero-content-container h1", {
        y: 60,
        opacity: 0,
        duration: 1
    })
        .from(".hero-content-container p", {
            y: 40,
            opacity: 0,
            duration: 0.8
        }, "-=0.6")
        .from(".hero-content-container .btn-primary", {
            y: 20,
            opacity: 0,
            duration: 0.6
        }, "-=0.6")
        .from(".hero-img-container img", {
            scale: 0.95,
            opacity: 0,
            duration: 1.2
        }, "-=0.8")
        .from(".hero-overlay", {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.2)"
        }, "-=0.8");

    gsap.from(".service-card", {
        scrollTrigger: {
            trigger: ".services-card-container",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });

    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 70%",
        }
    });

    aboutTl.from(".img-wrapper-left", { x: -80, opacity: 0, duration: 1, ease: "power3.out" })
        .from(".img-wrapper-right", { x: 80, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
        .from(".floating-badge, .experience-badge", { y: 30, opacity: 0, duration: 0.8, stagger: 0.2 }, "-=0.5")
        .from(".about-content-container > *", { y: 40, opacity: 0, duration: 0.8, stagger: 0.15 }, "-=0.6");

});