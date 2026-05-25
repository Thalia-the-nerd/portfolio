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

    // 2.5 Floating Data Nodes
    const bgNodes = document.getElementById('bgNodes');
    const nodeChars = ['+', '< />', '{ }', '[ ]', '01', '10', 'sys', '•'];
    const numNodes = 40;

    for (let i = 0; i < numNodes; i++) {
        let el = document.createElement('div');
        el.classList.add('node-element');
        el.innerText = nodeChars[Math.floor(Math.random() * nodeChars.length)];
        el.style.left = Math.random() * 100 + 'vw';
        el.style.top = Math.random() * 100 + 'vh';
        el.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
        bgNodes.appendChild(el);
    }

    anime({
        targets: '.node-element',
        translateX: function() { return anime.random(-100, 100) + 'vw'; },
        translateY: function() { return anime.random(-100, 100) + 'vh'; },
        rotate: function() { return anime.random(-360, 360); },
        scale: function() { return anime.random(0.5, 2); },
        opacity: [0, 0.4, 0],
        duration: function() { return anime.random(10000, 20000); },
        delay: function() { return anime.random(0, 5000); },
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
    });

    // 3. Initial Load Sequence (Staggered and dramatic)
    const tl = anime.timeline({ easing: 'easeOutExpo' });
    
    // Split hero title into letters for individual animation
    const heroTitle = document.querySelector('.hero-title');
    heroTitle.innerHTML = heroTitle.textContent.replace(/\S/g, "<span class='letter' style='display:inline-block'>$&</span>");

    tl.add({
        targets: '.hero-title .letter',
        translateY: [100, 0],
        translateZ: 0,
        rotateY: [-90, 0],
        opacity: [0, 1],
        duration: 1200,
        delay: anime.stagger(50)
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

    // --- Advanced SVG Animations ---
    const svgTl = anime.timeline({ loop: true, direction: 'alternate' });
    
    // Draw polygon lines
    svgTl.add({
        targets: '.anime-poly',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 2000,
        delay: function(el, i) { return i * 250 }
    })
    // Draw rectangle and rotate
    .add({
        targets: '.anime-rect',
        strokeDashoffset: [anime.setDashoffset, 0],
        rotate: [0, 90],
        transformOrigin: '200px 200px',
        easing: 'easeInOutCirc',
        duration: 1500
    }, '-=1500')
    // Pulse the dots
    .add({
        targets: '.anime-dot',
        scale: [0, 1.5, 1],
        opacity: [0, 1, 0.8],
        easing: 'easeOutElastic(1, .8)',
        duration: 1200,
        delay: anime.stagger(150)
    }, '-=1000');

    // Continuous orbital rotation for rings
    anime({
        targets: '.anime-ring',
        rotate: '1turn',
        transformOrigin: '200px 200px',
        easing: 'linear',
        duration: 20000,
        loop: true
    });
    
    anime({
        targets: '.anime-ring-2',
        rotate: '-1turn',
        transformOrigin: '200px 200px',
        easing: 'linear',
        duration: 15000,
        loop: true
    });

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

    // 7. Interactive Terminal Logic
    const termInput = document.getElementById('terminalInput');
    const termBody = document.getElementById('terminalBody');

    if (termInput) {
        termInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const cmd = this.value.trim().toLowerCase();
                this.value = '';
                
                // Echo command
                const echoLine = document.createElement('div');
                echoLine.className = 'term-line';
                echoLine.innerHTML = `<span class="prompt">thalia@arch-linux:~$</span> ${cmd}`;
                termBody.insertBefore(echoLine, termInput.parentElement);

                // Process command
                let output = '';
                if (cmd === 'help') {
                    output = 'Available commands: whoami, skills, clear, contact, sudo';
                } else if (cmd === 'whoami') {
                    output = 'Thalia Webb - Systems & Hardware Engineer.<br>Specializing in robotics, autonomous systems, and low-level Linux infrastructure.';
                } else if (cmd === 'skills') {
                    output = 'Loading skills module...<br>[+] C++ [+] Java [+] Python<br>[+] Arch Linux [+] Docker [+] GCP<br>[+] Hardware Wiring [+] CAD';
                } else if (cmd === 'clear') {
                    const lines = termBody.querySelectorAll('.term-line.output, .term-line:not(:last-child)');
                    lines.forEach(l => l.remove());
                } else if (cmd === 'contact') {
                    output = 'Initializing secure channel...<br>Email: thaliathenerder@gmail.com';
                } else if (cmd === 'sudo') {
                    output = 'thalia is not in the sudoers file. This incident will be reported.';
                } else if (cmd !== '') {
                    output = `bash: ${cmd}: command not found`;
                }

                if (output !== '') {
                    const outLine = document.createElement('div');
                    outLine.className = 'term-line output';
                    outLine.innerHTML = output;
                    termBody.insertBefore(outLine, termInput.parentElement);
                }

                termBody.scrollTop = termBody.scrollHeight;
            }
        });

        // Keep focus on terminal when clicking inside it
        termBody.addEventListener('click', () => {
            termInput.focus();
        });
    }

    // 8. Animated Experience Timeline (Scroll drawing)
    const timelineProgress = document.querySelector('.timeline-progress');
    if (timelineProgress) {
        // Find total length of timeline section
        const timelineSection = document.querySelector('.timeline-section');
        
        window.addEventListener('scroll', () => {
            const rect = timelineSection.getBoundingClientRect();
            const winH = window.innerHeight;
            // Calculate scroll percentage through the section
            let scrollPerc = (winH - rect.top) / (rect.height + winH);
            if (scrollPerc < 0) scrollPerc = 0;
            if (scrollPerc > 1) scrollPerc = 1;
            
            // stroke-dashoffset goes from 2000 to 0
            const offset = 2000 - (scrollPerc * 2000);
            timelineProgress.style.strokeDashoffset = offset;
        });
    }

    // 9. Contact Form Submit Animation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.submit-btn');
            const btnText = btn.querySelector('.btn-text');
            
            // Simple mock submit animation
            btnText.innerText = "Transmitting...";
            anime({
                targets: btn,
                scale: [1, 0.95, 1],
                duration: 2000,
                easing: 'easeInOutQuad',
                complete: function() {
                    btnText.innerText = "Signal Received ✓";
                    btn.style.background = "var(--accent-color)";
                    btn.style.color = "#000";
                    contactForm.reset();
                }
            });
        });
    }
});
