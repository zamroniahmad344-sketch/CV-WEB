// script.js - Portfolio Modern Ahmad Zamroni

// ==================== LOADING SCREEN ====================
window.addEventListener('load', () => {
    const loading = document.getElementById('loading-screen');
    if(loading) {
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => { loading.style.display = 'none'; }, 500);
        }, 800);
    }
    initParticles();
    initTyping();
    initCounters();
    initSkillsCircular();
    generatePortfolio();
    generateCertificates();
    initScrollAnimations();
});

// ==================== PARTICLE BACKGROUND ====================
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let particlesArray = [];
    const numberOfParticles = 80;

    class Particle {
        constructor(x, y, size, speedX, speedY, color) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.speedX = speedX;
            this.speedY = speedY;
            this.color = color;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if(this.x < 0 || this.x > width) this.speedX *= -1;
            if(this.y < 0 || this.y > height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 6;
            ctx.shadowColor = "#0ff";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for(let i=0; i<numberOfParticles; i++) {
        let size = Math.random() * 3 + 1;
        let x = Math.random() * width;
        let y = Math.random() * height;
        let speedX = (Math.random() - 0.5) * 0.6;
        let speedY = (Math.random() - 0.5) * 0.6;
        let color = `rgba(0, 200, 255, ${Math.random() * 0.5 + 0.2})`;
        particlesArray.push(new Particle(x, y, size, speedX, speedY, color));
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        for(let p of particlesArray) {
            p.update();
            p.draw();
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        particlesArray = [];
        for(let i=0; i<numberOfParticles; i++) {
            let size = Math.random() * 3 + 1;
            let x = Math.random() * width;
            let y = Math.random() * height;
            let speedX = (Math.random() - 0.5) * 0.6;
            let speedY = (Math.random() - 0.5) * 0.6;
            particlesArray.push(new Particle(x, y, size, speedX, speedY, `rgba(0, 200, 255, ${Math.random() * 0.5 + 0.2})`));
        }
    });
}

// ==================== TYPING ANIMATION ====================
function initTyping() {
    const typedTextSpan = document.querySelector('.typed-text');
    if(!typedTextSpan) return;
    const words = ['Mahasiswa', 'Freelancer', 'Problem Solver', 'Inovator Digital'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    function type() {
        const currentWord = words[wordIndex];
        if(isDeleting) {
            typedTextSpan.innerText = currentWord.substring(0, charIndex-1);
            charIndex--;
        } else {
            typedTextSpan.innerText = currentWord.substring(0, charIndex+1);
            charIndex++;
        }
        if(!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, 1500);
        } else if(isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 300);
        } else {
            setTimeout(type, isDeleting ? 60 : 120);
        }
    }
    type();
}

// ==================== ANIMATED COUNTERS ====================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 150;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    let current = parseInt(counter.innerText);
                    const increment = target / 30;
                    if(current < target) {
                        current = Math.ceil(current + increment);
                        counter.innerText = current;
                        setTimeout(updateCount, 30);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, {threshold: 0.5});
    counters.forEach(counter => observer.observe(counter));
}

// ==================== CIRCULAR SKILLS ====================
function initSkillsCircular() {
    const skillsContainer = document.getElementById('skills-grid');
    if(!skillsContainer) return;
    const skillsData = [
        {name: 'Komunikasi', percent: 90},
        {name: 'Manajemen Waktu', percent: 85},
        {name: 'Pelayanan Pelanggan', percent: 92},
        {name: 'Kerja Tim', percent: 88},
        {name: 'Fast Learning', percent: 87}
    ];
    let html = '';
    skillsData.forEach(skill => {
        html += `
            <div class="skill-item">
                <div class="circular-progress" data-percent="${skill.percent}">
                    <svg viewBox="0 0 36 36" class="circular-chart">
                        <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#444" stroke-width="3"/>
                        <path class="circle-progress" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="${skill.percent}, 100" stroke-dashoffset="0" style="stroke: #0ff;"/>
                    </svg>
                    <div class="skill-percent">${skill.percent}%</div>
                </div>
                <h4>${skill.name}</h4>
            </div>
        `;
    });
    skillsContainer.innerHTML = html;
    // animation on view
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const el = entry.target;
                const percent = el.getAttribute('data-percent');
                const path = el.querySelector('.circle-progress');
                if(path) path.style.strokeDasharray = `${percent}, 100`;
                progressObserver.unobserve(el);
            }
        });
    }, {threshold: 0.5});
    document.querySelectorAll('.circular-progress').forEach(p => progressObserver.observe(p));
}

// ==================== PORTFOLIO GENERATE (6 projects) ====================
function generatePortfolio() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    if(!portfolioGrid) return;
    const projects = [
        {title: 'NeoBank App', desc: 'Aplikasi keuangan modern dengan analitik AI.', img: 'https://picsum.photos/id/1/400/250', demo: '#', github: '#'},
        {title: 'Portfolio 3D', desc: 'Website interaktif three.js untuk personal branding.', img: 'https://picsum.photos/id/26/400/250', demo: '#', github: '#'},
        {title: 'EcoChain', desc: 'Blockchain untuk pelacak karbon.', img: 'https://picsum.photos/id/29/400/250', demo: '#', github: '#'},
        {title: 'SmartDesk UI', desc: 'Dashboard IoT untuk perkantoran.', img: 'https://picsum.photos/id/20/400/250', demo: '#', github: '#'},
        {title: 'Resep Nusantara', desc: 'Platform resep masakan tradisional.', img: 'https://picsum.photos/id/30/400/250', demo: '#', github: '#'},
        {title: 'TravelBuddy', desc: 'Aplikasi itinerary perjalanan kolaboratif.', img: 'https://picsum.photos/id/15/400/250', demo: '#', github: '#'}
    ];
    let html = '';
    projects.forEach(proj => {
        html += `
            <div class="portfolio-card glass-card">
                <img src="${proj.img}" alt="${proj.title}">
                <div class="portfolio-info">
                    <h3>${proj.title}</h3>
                    <p>${proj.desc}</p>
                    <div class="portfolio-buttons">
                        <a href="${proj.demo}" target="_blank">Demo <i class="fas fa-external-link-alt"></i></a>
                        <a href="${proj.github}" target="_blank">Github <i class="fab fa-github"></i></a>
                    </div>
                </div>
            </div>
        `;
    });
    portfolioGrid.innerHTML = html;
}

// ==================== CERTIFICATES ====================
function generateCertificates() {
    const certGrid = document.getElementById('cert-grid');
    if(!certGrid) return;
    const certs = [
        {name: 'Sertifikat Komunikasi Efektif', issuer: 'BNSP', year: '2023'},
        {name: 'Fundamental Digital Marketing', issuer: 'Google Digital Garage', year: '2024'},
        {name: 'Pelayanan Prima & Customer Care', issuer: 'HIMATIF', year: '2025'}
    ];
    let html = '';
    certs.forEach(c => {
        html += `<div class="cert-card glass-card"><i class="fas fa-award"></i><h3>${c.name}</h3><p>${c.issuer} • ${c.year}</p></div>`;
    });
    certGrid.innerHTML = html;
}

// ==================== SCROLL ANIMATIONS (AOS style) ====================
function initScrollAnimations() {
    const elements = document.querySelectorAll('.glass-card, .timeline-item, .exp-card, .skill-item, .portfolio-card, .cert-card, .about-text, .personal-info');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(el);
    });
}

// ==================== DOWNLOAD CV BUTTON ====================
const downloadBtn = document.getElementById('download-cv-btn');
if(downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        const cvContent = `Nama: Ahmad Zamroni\nTTL: Probolinggo, 31 Desember 2004\nAlamat: Merjosari, Lowokwaru, Malang\nEmail: ahmadzamroni015@gmail.com\nTelepon: +62 83135466800\nPendidikan: UIN Maulana Malik Ibrahim Malang, SMK Raudlatul Jannah\nKeahlian: Komunikasi, Manajemen Waktu, Pelayanan Pelanggan, Kerja Tim, Fast Learning`;
        const blob = new Blob([cvContent], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = 'Ahmad_Zamroni_CV.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });
}

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Terima kasih! Pesan Anda telah dikirim. Saya akan segera merespon.');
        contactForm.reset();
    });
}

// ==================== MOBILE NAVBAR ====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if(hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
}
