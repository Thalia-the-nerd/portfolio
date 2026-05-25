document.addEventListener('DOMContentLoaded', () => {
    // 1. Background Grid Animation
    const bgContainer = document.getElementById('bgAnimation');
    const cols = Math.floor(window.innerWidth / 50);
    const rows = Math.floor(window.innerHeight / 50);
    const totalCells = cols * rows;

    // Create cells
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('bg-cell');
        bgContainer.appendChild(cell);
    }

    anime({
        targets: '.bg-cell',
        scale: [
            {value: .1, easing: 'easeOutSine', duration: 500},
            {value: 1, easing: 'easeInOutQuad', duration: 1200}
        ],
        opacity: [
            {value: 0, easing: 'easeOutSine', duration: 500},
            {value: 0.04, easing: 'easeInOutQuad', duration: 1200}
        ],
        delay: anime.stagger(200, {grid: [cols, rows], from: 'center'}),
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
    });

    // 2. Initial Page Load Animations (Hero Section)
    anime.timeline({ easing: 'easeOutExpo' })
        .add({
            targets: '.hero-title',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1200,
            delay: 200
        })
        .add({
            targets: '.hero-subtitle',
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 1000
        }, '-=800')
        .add({
            targets: '.magnetic-btn-wrapper',
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 800
        }, '-=600');

    // 3. Scroll Reveal Logic via Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;

                // Determine what to animate based on classes or tags
                if (target.classList.contains('about-text')) {
                    anime({
                        targets: target,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        duration: 1000,
                        easing: 'easeOutExpo'
                    });
                } else if (target.classList.contains('skills-category')) {
                    const tags = target.querySelectorAll('.skill-tag');
                    anime({
                        targets: tags,
                        translateY: [20, 0],
                        opacity: [0, 1],
                        duration: 800,
                        delay: anime.stagger(100),
                        easing: 'easeOutElastic(1, .8)'
                    });
                } else if (target.classList.contains('projects-grid')) {
                    const cards = target.querySelectorAll('.project-card');
                    anime({
                        targets: cards,
                        translateY: [40, 0],
                        opacity: [0, 1],
                        duration: 1000,
                        delay: anime.stagger(150),
                        easing: 'easeOutExpo'
                    });
                }

                // Unobserve after animating
                observer.unobserve(target);
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, observerOptions);

    // Initial hidden state for scroll elements
    document.querySelectorAll('.about-text, .skills-category .skill-tag, .project-card').forEach(el => {
        el.style.opacity = 0;
    });

    // Observe containers
    document.querySelectorAll('.about-text, .skills-category, .projects-grid').forEach(el => {
        observer.observe(el);
    });

    // 4. Magnetic Hover Effects
    const magneticElements = document.querySelectorAll('.magnetic-btn-wrapper, .magnetic-card');

    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const isCard = elem.classList.contains('magnetic-card');
            const targetEl = isCard ? elem : elem.querySelector('.magnetic-btn');
            
            const intensity = isCard ? 0.05 : 0.3; // Less intense for big cards

            anime({
                targets: targetEl,
                translateX: x * intensity,
                translateY: y * intensity,
                scale: isCard ? 1.02 : 1,
                rotateX: isCard ? (-y * intensity * 0.5) : 0,
                rotateY: isCard ? (x * intensity * 0.5) : 0,
                boxShadow: isCard ? `
                    ${-x * intensity}px ${-y * intensity}px 20px rgba(0,229,255,0.1),
                    0 10px 30px rgba(0,0,0,0.5)
                ` : 'none',
                duration: 50,
                easing: 'easeOutQuad'
            });
        });

        elem.addEventListener('mouseleave', () => {
            const isCard = elem.classList.contains('magnetic-card');
            const targetEl = isCard ? elem : elem.querySelector('.magnetic-btn');

            anime({
                targets: targetEl,
                translateX: 0,
                translateY: 0,
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                boxShadow: isCard ? '0 0 0 rgba(0,0,0,0)' : 'none',
                duration: 1000,
                easing: 'easeOutElastic(1, .5)'
            });
        });
    });

    // 5. Social Icons Pulse Animation
    anime({
        targets: '.social-icon',
        translateY: [0, -5, 0],
        duration: 2000,
        delay: anime.stagger(200),
        loop: true,
        easing: 'easeInOutSine'
    });
});
