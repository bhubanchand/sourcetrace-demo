// Sticky Header
window.addEventListener('scroll', function () {
    const header = document.querySelector('.main-header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.main-nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Scroll Animations (Reveal on Scroll)
const revealElements = document.querySelectorAll('.reveal-up');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

// Impact Metrics Counter Animation
const counters = document.querySelectorAll('.metric-number');
let hasAnimated = false;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace(/,/g, ''); // Remove commas if any
        const increment = target / 200; // Speed

        if (count < target) {
            counter.innerText = Math.ceil(count + increment).toLocaleString(); // Add commas back
            setTimeout(animateCounters, 10); // Loop
        } else {
            // Special formatting for millions/thousands can be done here if needed
            if (target >= 1000000) {
                counter.innerText = (target / 1000000) + 'M+';
            } else if (target > 1000) {
                counter.innerText = target.toLocaleString() + '+';
            } else {
                counter.innerText = target;
            }
        }
    });
};

// Trigger counter animation when section is in view
const metricsSection = document.querySelector('.impact-metrics');
window.addEventListener('scroll', () => {
    if (!hasAnimated && window.scrollY + window.innerHeight > metricsSection.offsetTop + 100) {
        animateCounters();
        hasAnimated = true;
    }
});
