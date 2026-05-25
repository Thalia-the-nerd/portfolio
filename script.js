document.addEventListener('DOMContentLoaded', () => {

    // --- Helper: Split text into letters for animation ---
    const heroTitle = document.querySelector('.hero-title');
    heroTitle.innerHTML = heroTitle.textContent.replace(/\S/g, "<span class='letter' style='display:inline-block;'>$&</span>");

    // 1. Advanced Cursor Glow & Particle Trail
    const cursorGlow = document.getElementById('cursorGlow');
    
    document.addEventListener('mousemove', (e) => {
        // Move main glow
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';

        // Particle Trail logic (throttled slightly by random chance for performance)
        if (Math.random() > 0.5) {
            createParticle(e.clientX, e.clientY);
        }
    });

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = 'var(--accent-color)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.boxShadow = '0 0 10px var(--accent-color)';
        document.body.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 50 + 20;

        anime({
            targets: particle,
            translateX: Math.cos(angle) * radius,
            translateY: Math.sin(angle) * radius,
            scale: [1, 0],
            opacity: [1, 0],
            duration: 1000,
            easing: 'easeOutExpo',
            complete: () => {
                particle.remove();
            }
        });
    }

    // 2. 3D Background Grid Animation + Mouse Parallax Warp
    const bgGrid = document.getElementById('bgGrid');
    
    // Continuous scroll
    anime({
        targets: bgGrid,
        backgroundPosition: ['0px 0px', '0px 60px'],
        duration: 2000,
        easing: 'linear',
        loop: true
    });

    // Parallax on mouse move
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        anime({
            targets: bgGrid,
            rotateX: 60 - y,
            rotateY: x,
            translateZ: -200 + y * 5,
            duration: 1000,
            easing: 'easeOutQuint'
        });
    });

    // 3. Ultra-Fancy Initial Load Sequence
    const tl = anime.timeline({ easing: 'easeOutExpo' });
    
    tl.add({
        targets: '.hero-title .letter',
        translateY: [100, 0],
        translateZ: 0,
        rotateY: [-90, 0],
        opacity: [0, 1],
        duration: 1500,
        delay: anime.stagger(50, {start: 300})
    })
    .add({
        targets: '.role-tag',
        scale: [0, 1],
        opacity: [0, 1],
        duration: 1200,
        delay: anime.stagger(100),
        easing: 'easeOutElastic(1, .6)'
    }, '-=1000')
    .add({
        targets: '.role-divider',
        opacity: [0, 1],
        scale: [0, 1],
        duration: 500,
        delay: anime.stagger(150),
        easing: 'spring(1, 80, 10, 0)'
    }, '-=800')
    .add({
        targets: '.hero-abstract-shape',
        scale: [0, 1],
        rotate: '1turn',
        opacity: [0, 0.6],
        duration: 2500,
        easing: 'easeOutElastic(1, 1)'
    }, '-=1200')
    .add({
        targets: '.primary-btn',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800
    }, '-=1000');

    // 4. Scroll Reveals (Bouncy & Springy)
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                
                if (el.classList.contains('section-title')) {
                    // Split text for section title too!
                    if (!el.dataset.splitted) {
                        el.innerHTML = el.textContent.replace(/\S/g, "<span class='letter' style='display:inline-block;'>$&</span>");
                        el.dataset.splitted = "true";
                    }
                    anime({
                        targets: el.querySelectorAll('.letter'),
                        translateY: [40, 0],
                        opacity: [0, 1],
                        rotateZ: [-10, 0],
                        duration: 1000,
                        delay: anime.stagger(30),
                        easing: 'easeOutElastic(1, 1)'
                    });
                } else if (el.classList.contains('glass-panel')) {
                    anime({
                        targets: el,
                        translateY: [100, 0],
                        scale: [0.9, 1],
                        opacity: [0, 1],
                        rotateX: [20, 0],
                        duration: 1500,
                        easing: 'easeOutElastic(1, 0.7)',
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
                } else if (el.classList.contains('skill-tag')) {
                    anime({
                        targets: el,
                        scale: [0, 1],
                        opacity: [0, 1],
                        rotate: [-15, 0],
                        duration: 1200,
                        delay: anime.stagger(50),
                        easing: 'easeOutElastic(1, .6)'
                    });
                }
                
                observer.unobserve(el);
            }
        });
    };
    
    const observer = new IntersectionObserver(revealCallback, observerOptions);
    
    // Setup initial state for scroll elements
    const elementsToReveal = document.querySelectorAll('.section-title, .glass-panel, .bio, .skill-tag');
    elementsToReveal.forEach((el, index) => {
        el.style.opacity = 0;
        if(el.classList.contains('project-card') || el.classList.contains('skills-category')) {
            el.dataset.delay = (index % 2) * 150; 
        }
        observer.observe(el);
    });

    // 5. Continuous Floating Animation on Cards
    anime({
        targets: '.project-card',
        translateY: ['-5px', '5px'],
        direction: 'alternate',
        loop: true,
        duration: 3000,
        easing: 'easeInOutSine',
        delay: anime.stagger(400) // Async floating
    });

    // 6. Magnetic Physics Hover Effect (Extremely fluid)
    const magneticElements = document.querySelectorAll('.magnetic-btn-wrapper, .magnetic-card');

    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const isCard = elem.classList.contains('magnetic-card');
            const targetEl = isCard ? elem : elem.querySelector('.magnetic-btn');
            
            // Cards get a 3D tilt, buttons get translation
            const intensity = isCard ? 0.08 : 0.5;
            
            anime({
                targets: targetEl,
                translateX: isCard ? 0 : x * intensity,
                translateY: isCard ? 0 : y * intensity,
                rotateX: isCard ? (-y * intensity) : 0,
                rotateY: isCard ? (x * intensity) : 0,
                scale: isCard ? 1.05 : 1,
                boxShadow: isCard ? `
                    ${-x * 0.1}px ${-y * 0.1}px 30px rgba(0, 240, 255, 0.2),
                    0 10px 40px rgba(0,0,0,0.8)
                ` : 'none',
                duration: 200,
                easing: 'easeOutQuint'
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
                boxShadow: isCard ? '0 4px 30px rgba(0, 0, 0, 0.5)' : 'none',
                duration: 1500,
                easing: 'easeOutElastic(1, .4)'
            });
        });
    });
    
    // 7. Terminal typing loop animation at bottom
    anime({
        targets: '.typing',
        opacity: [0, 1],
        duration: 800,
        direction: 'alternate',
        loop: true,
        easing: 'steps(2)'
    });
});
