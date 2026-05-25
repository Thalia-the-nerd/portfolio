document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Cursor Glow Tracking
    const cursorGlow = document.getElementById('cursorGlow');
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // 2. 3D Background Grid Animation (Perspective scrolling effect)
    const bgGrid = document.getElementById('bgGrid');
    
    anime({
        targets: bgGrid,
        backgroundPosition: ['0px 0px', '0px 60px'],
        duration: 2000,
        easing: 'linear',
        loop: true
    });

    // 3. Initial Load Sequence (Staggered and dramatic)
    const tl = anime.timeline({ easing: 'easeOutExpo' });
    
    tl.add({
        targets: '.hero-title',
        translateY: [100, 0],
        opacity: [0, 1],
        duration: 1500,
        delay: 200
    })
    .add({
        targets: '.role-tag',
        translateX: [-30, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: anime.stagger(150)
    }, '-=1000')
    .add({
        targets: '.role-divider',
        opacity: [0, 1],
        duration: 500,
        delay: anime.stagger(150)
    }, '-=800')
    .add({
        targets: '.hero-abstract-shape',
        scale: [0.8, 1],
        opacity: [0, 0.6],
        duration: 2000
    }, '-=1200')
    .add({
        targets: '.primary-btn',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800
    }, '-=1000');

    // 4. Scroll Reveals via Intersection Observer
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                
                if (el.classList.contains('section-title')) {
                    anime({
                        targets: el,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        duration: 1200,
                        easing: 'easeOutExpo'
                    });
                } else if (el.classList.contains('glass-panel')) {
                    anime({
                        targets: el,
                        translateY: [60, 0],
                        opacity: [0, 1],
                        rotateX: [10, 0],
                        duration: 1200,
                        easing: 'easeOutElastic(1, 0.8)',
                        delay: el.dataset.delay || 0
                    });
                } else if (el.classList.contains('bio')) {
                    anime({
                        targets: el,
                        translateY: [30, 0],
                        opacity: [0, 1],
                        duration: 1200,
                        easing: 'easeOutExpo'
                    });
                }
                
                observer.unobserve(el);
            }
        });
    };
    
    const observer = new IntersectionObserver(revealCallback, observerOptions);
    
    // Setup initial state for scroll elements
    const elementsToReveal = document.querySelectorAll('.section-title, .glass-panel, .bio');
    elementsToReveal.forEach((el, index) => {
        el.style.opacity = 0;
        // Stagger grid items
        if(el.classList.contains('project-card') || el.classList.contains('skills-category')) {
            el.dataset.delay = (index % 2) * 200; 
        }
        observer.observe(el);
    });

    // 5. Magnetic Physics Hover Effect
    const magneticElements = document.querySelectorAll('.magnetic-btn-wrapper, .magnetic-card');

    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const isCard = elem.classList.contains('magnetic-card');
            const targetEl = isCard ? elem : elem.querySelector('.magnetic-btn');
            
            // Cards get a 3D tilt, buttons get translation
            const intensity = isCard ? 0.05 : 0.4;
            
            anime({
                targets: targetEl,
                translateX: isCard ? 0 : x * intensity,
                translateY: isCard ? 0 : y * intensity,
                rotateX: isCard ? (-y * intensity * 0.5) : 0,
                rotateY: isCard ? (x * intensity * 0.5) : 0,
                scale: isCard ? 1.02 : 1,
                duration: 100,
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
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 1200,
                easing: 'easeOutElastic(1, .5)'
            });
        });
    });
    
    // 6. Terminal typing loop animation at bottom
    anime({
        targets: '.typing',
        opacity: [0, 1],
        duration: 800,
        direction: 'alternate',
        loop: true,
        easing: 'steps(2)'
    });
});
