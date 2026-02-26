
const defaultProjects = [
  {
    "id": 0,
    "number": "01",
    "title": {
      "fr": "Eternel Studio The Labyrinth",
      "en": "Eternel Studio The Labyrinth"
    },
    "desc": {
      "fr": "Je travaille sur l'optimisation de cette map, et je refais aussi certaines parties car le développeur précédent a fait des erreurs.",
      "en": "I'm working on optimizing this map, and I'm also redoing some parts because the previous developer made mistakes."
    },
    "heroImg": "The.lbt.webp",
    "images": [
      "lbt1.webp",
      "lbt2.webp",
      "lbt3.webp",
      "lbt4.webp"
    ]
  },
  {
    "id": 1,
    "number": "02",
    "title": {
      "fr": "Some GUI",
      "en": "Some GUI"
    },
    "desc": {
      "fr": "Voici quelques GUIs que j'ai designés et créés moi-même.",
      "en": "Here are some GUIs I designed and created myself."
    },
    "heroImg": "GUI.jpg",
    "images": [
      "gui1.webp",
      "gui2.webp",
      "gui3.webp"
    ]
  },
  {
    "id": 2,
    "number": "03",
    "title": {
      "fr": "Ultra Viragiste PSG",
      "en": "Ultra Viragiste PSG"
    },
    "desc": {
      "fr": "J'ai seulement essayé d'optimiser une petite partie du jeu.",
      "en": "I only tried to optimize a small part of the game."
    },
    "heroImg": "Stade.jpg",
    "images": [
      "PSG1.webp",
      "PSG2.webp",
      "PSG3.webp",
      "PSG4.webp",
      "PSG5.webp",
      "PSG6.webp",
      "PSG7.webp",
      "PSG8.webp"
    ]
  },
  {
    "id": 3,
    "number": "04",
    "title": {
      "fr": "Petite map cache-cache",
      "en": "Small hide-and-seek map"
    },
    "desc": {
      "fr": "J'ai fait cette petite map il y a longtemps. Le client a arrêté la commande.",
      "en": "I made this small map a long time ago. The client stopped the order."
    },
    "heroImg": "hide.jpg",
    "images": [
      "hide1.webp",
      "hide2.webp",
      "hide3.webp"
    ]
  },
  {
    "id": 4,
    "number": "05",
    "title": {
      "fr": "Prison RP FR",
      "en": "Prison RP FR"
    },
    "desc": {
      "fr": "Projet de prison RP avec chat vocal. J'ai surtout travaillé sur l'optimisation.",
      "en": "RP prison project with voice chat. I mostly worked on optimization."
    },
    "heroImg": "prisonRP.jpg",
    "images": [
      "prisonRP1.jpg",
      "prisonRP2.jpg",
      "prisonRP3.jpg",
      "prisonRP4.jpg",
      "prisonRP5.jpg",
      "prisonRP6.jpg",
      "prisonRP7.jpg"
    ]
  },
  {
    "id": 5,
    "number": "06",
    "title": {
      "fr": "Petite Île",
      "en": "Small Island"
    },
    "desc": {
      "fr": "J'ai fait cette petite île en collaboration avec un builder.",
      "en": "I made this small island in collaboration with a builder."
    },
    "heroImg": "Smallisland.jpg",
    "images": [
      "ils1.webp",
      "ils2.webp",
      "Smallisland.jpg"
    ]
  },
  {
    "id": 6,
    "number": "07",
    "title": {
      "fr": "Hit The Road",
      "en": "Hit The Road"
    },
    "desc": {
      "fr": "J'ai fait ce petit asset pour un projet personnel à long terme.",
      "en": "I made this small asset for a long-term personal project."
    },
    "heroImg": "hitroad.jpg",
    "images": [
      "hit1.webp",
      "hit2.webp",
      "hit3.webp",
      "hit4.webp",
      "hit5.webp",
      "hit6.webp",
      "hit7.webp",
      "hit8.webp",
      "hitroad.jpg"
    ]
  },
  {
    "id": 7,
    "number": "08",
    "title": {
      "fr": "Test de recrutement Secours de France",
      "en": "Secours de France Recruitment Test"
    },
    "desc": {
      "fr": "J'ai construit ça pour le recrutement des Secours de France.",
      "en": "I built this for the recruitment of Secours de France."
    },
    "heroImg": "helpfrance.jpg",
    "images": [
      "hlp1.webp",
      "hlp2.webp",
      "hlp3.webp",
      "hlp4.webp",
      "hlp5.webp",
      "hlp6.webp"
    ]
  },
  {
    "id": 8,
    "number": "09",
    "title": {
      "fr": "Hôpital Français",
      "en": "French Hospital"
    },
    "desc": {
      "fr": "C'est les urgences ; un build simple sans intérieur, juste pour le fun.",
      "en": "It's the ER; a simple build without interior, just for fun."
    },
    "heroImg": "hospital.jpg",
    "images": [
      "hp1.webp",
      "hp2.webp",
      "hp3.webp"
    ]
  },
  {
    "id": 9,
    "number": "10",
    "title": {
      "fr": "Street French",
      "en": "Street French"
    },
    "desc": {
      "fr": "Pour le Street French V2 — plus de 700k visites totales.",
      "en": "For Street French V2 — over 700k total visits."
    },
    "heroImg": "FrenchStreet.jpg",
    "images": [
      "Street1.webp",
      "Street2.webp",
      "Street3.webp",
      "Street4.webp",
      "Street5.webp",
      "Street6.webp",
      "Street7.webp"
    ]
  },
]


let projectsData = JSON.parse(JSON.stringify(defaultProjects));
let currentLang = 'fr';
let adminMode = false;
let chaosActive = false;
let blacklightActive = false;
let matrixActive = false;
let goldMode = false;
let currentProjectId = null;
let currentGalleryImages = [];
let currentLightboxIndex = 0;


function loadSavedData() {
    try {
        const saved = localStorage.getItem('portfolioProjects');
        if (saved) projectsData = JSON.parse(saved);
    } catch(e) {}
}
function saveData() {
    try { localStorage.setItem('portfolioProjects', JSON.stringify(projectsData)); } catch(e) {}
}
loadSavedData();


const translations = {
    fr: { nav_projects:'Projets', hero_tag:'Level Design & Développement', hero_title1:'Building worlds', hero_title2:'that captivate.', hero_sub:'Environnements immersifs, structures sur-mesure et une vision artistique dédiée à vos projets.', hero_cta:'Voir mes projets', view_project:'Voir le projet →', bio_role:'Développeur', bio_desc1:"Salut, je suis Fht 👋 Builder français avec 3 ans d'expérience sur Roblox. Solides bases en GUI Design et GFX. Fondé deux serveurs de vente (200+ membres). Travaillé pour Street French (+700k visites), Altas Production, Papy Studio. Actuellement chez Eternel Studio.", bio_desc2:"Mon approche : la précision dans chaque détail, l'immersion à chaque instant, et la performance comme standard.", skills_title:'Compétences', skill_opti:'Optimisation 3D', stat_projects:'Projets livrés', stat_clients:'Clients satisfaits', stat_years:"Années d'expérience", contact_intro:'Un projet en tête ?', copy:'Copier', back_projects:'Retour aux projets', gallery_heading:'Galerie du projet', konami_hint:'Tu connais le code classique ? Essaye sur ton clavier...',music_btn_on: "ON",
        music_btn_off: "OFF" },
    en: { nav_projects:'Projects', hero_tag:'Level Design & Development', hero_title1:'Building worlds', hero_title2:'that captivate.', hero_sub:'Immersive environments, custom-built structures, and an artistic vision dedicated to your projects.', hero_cta:'View my work', view_project:'View project →', bio_role:'Developer', bio_desc1:"Hi, I'm Fht 👋 French Builder with 3 years of experience on Roblox. Solid basics in GUI Design and GFX. Founded two sales servers (200+ members). Worked for Street French (+700k visits), Altas Production, Papy Studio. Currently at Eternel Studio.", bio_desc2:"My approach: precision in every detail, immersion in every moment, and performance as the standard.", skills_title:'Skills', skill_opti:'3D Optimization', stat_projects:'Projects delivered', stat_clients:'Satisfied clients', stat_years:'Years of experience', contact_intro:'Have a project in mind?', copy:'Copy', back_projects:'Back to projects', gallery_heading:'Project gallery', konami_hint:'Do you know the classic code? Try it on your keyboard...', music_btn_on: "ON",
        music_btn_off: "OFF" }
};


function setLanguage(lang) {
    const prev = currentLang;
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const k = el.getAttribute('data-i18n');
        if (translations[lang][k]) el.textContent = translations[lang][k];
    });
    if (prev !== lang) triggerGlitch();
    document.documentElement.lang = lang;
    renderProjectCards();
}

function triggerGlitch() {
    document.body.classList.remove('glitch-active');
    void document.body.offsetWidth;
    document.body.classList.add('glitch-active');
    setTimeout(() => document.body.classList.remove('glitch-active'), 900);
    document.querySelectorAll('.glitch-target,.section-title,.hero-tag,.bio-name,.contact-intro').forEach(el => {
        el.classList.remove('glitch-active-text');
        void el.offsetWidth;
        el.classList.add('glitch-active-text');
        setTimeout(() => el.classList.remove('glitch-active-text'), 700);
    });
}

document.getElementById('langFr').addEventListener('click', () => setLanguage('fr'));
document.getElementById('langEn').addEventListener('click', () => setLanguage('en'));


function updateClock() {
    const c = document.getElementById('clock');
    if (!c) return;
    const n = new Date();
    c.textContent = String(n.getHours()).padStart(2,'0')+':'+String(n.getMinutes()).padStart(2,'0')+':'+String(n.getSeconds()).padStart(2,'0');
}
updateClock();
setInterval(updateClock, 1000);


const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
function handleScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
    let cur = '';
    sections.forEach(s => { const t = s.offsetTop - 150; if (window.scrollY >= t && window.scrollY < t + s.offsetHeight) cur = s.id; });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#'+cur));
}
window.addEventListener('scroll', handleScroll, {passive:true});
handleScroll();


navLinks.forEach(l => l.addEventListener('click', e => { e.preventDefault(); const t = document.querySelector(l.getAttribute('href')); if(t) t.scrollIntoView({behavior:'smooth',block:'start'}); }));
const heroCta = document.querySelector('.hero-cta');
if(heroCta) heroCta.addEventListener('click', e => { e.preventDefault(); const t = document.querySelector(heroCta.getAttribute('href')); if(t) t.scrollIntoView({behavior:'smooth',block:'start'}); });


function showToast(text) {
    const t = document.getElementById('toast');
    document.getElementById('toastText').textContent = text;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
}
async function copyToClipboard(text) {
    try { await navigator.clipboard.writeText(text); } catch {
        const ta = document.createElement('textarea'); ta.value = text; ta.style.cssText='position:fixed;opacity:0;';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    }
}
function setupCopyButton(btnId, textId) {
    const btn = document.getElementById(btnId), txt = document.getElementById(textId);
    if (!btn || !txt) return;
    btn.addEventListener('click', async () => {
        const v = txt.textContent.trim();
        await copyToClipboard(v);
        btn.classList.add('copied');
        const lbl = btn.querySelector('.copy-label'), ci = btn.querySelector('.copy-icon'), ch = btn.querySelector('.check-icon');
        if(lbl) lbl.textContent = currentLang==='fr'?'Copié !':'Copied!';
        if(ci) ci.style.display='none'; if(ch) ch.style.display='block';
        showToast(currentLang==='fr'?`"${v}" copié`:`"${v}" copied`);
        setTimeout(() => { btn.classList.remove('copied'); if(lbl) lbl.textContent=translations[currentLang].copy; if(ci) ci.style.display='block'; if(ch) ch.style.display='none'; }, 2500);
    });
}
setupCopyButton('copyBtn','emailText');
setupCopyButton('copyDiscordBtn','discordText');
setupCopyButton('copyRobloxBtn','robloxText');


document.getElementById('robloxNavBtn').addEventListener('click', async () => {
    await copyToClipboard('https://www.roblox.com/fr/users/1515603679/profile');
    triggerRobuxRain();
    showToast(currentLang==='fr'?'Lien Roblox copié ! 🎮':'Roblox link copied! 🎮');
});


let discClickCount = 0, discTimer = null;
const discordBtn = document.getElementById('discordBtn');
discordBtn.addEventListener('click', async () => {
    await copyToClipboard('de_fht');
    discClickCount++;
    clearTimeout(discTimer);
    discTimer = setTimeout(() => discClickCount = 0, 1200);
    if (discClickCount >= 5) { discClickCount = 0; triggerExplosion(); }
    else showToast(currentLang==='fr'?'"de_fht" copié — Ajoutez-moi !':'"de_fht" copied — Add me!');
    const sw = discordBtn.querySelector('.shockwave');
    if(sw){sw.style.animation='none';void sw.offsetWidth;sw.style.animation='shockwave 0.6s ease-out';}
});


function triggerExplosion() {
    const container = document.getElementById('particleExplosion');
    const boom = document.getElementById('boomOverlay');
    const cx = window.innerWidth/2, cy = window.innerHeight/2;
    const colors = ['#7700e6','#a855f7','#c084fc','#6d28d9','#e9d5ff','#fff','#d946ef','#8b5cf6','#f0abfc','#7c3aed'];
    for (let i=0;i<200;i++) {
        const p = document.createElement('div'); p.className='explosion-particle';
        const size=3+Math.random()*12, angle=(Math.PI*2*i)/200+(Math.random()-0.5)*0.8;
        const vel=200+Math.random()*Math.max(window.innerWidth,window.innerHeight)*0.6;
        const dx=Math.cos(angle)*vel, dy=Math.sin(angle)*vel;
        const color=colors[Math.floor(Math.random()*colors.length)];
        p.style.cssText=`left:${cx}px;top:${cy}px;width:${size}px;height:${size}px;background:${color};box-shadow:0 0 ${size*3}px ${color};`;
        container.appendChild(p);
        p.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:`translate(${dx}px,${dy}px) scale(0)`,opacity:0}],{duration:1200+Math.random()*1000,easing:'cubic-bezier(0.25,0.46,0.45,0.94)',fill:'forwards'}).onfinish=()=>p.remove();
    }
    const flash=document.createElement('div');
    flash.style.cssText=`position:absolute;left:${cx-100}px;top:${cy-100}px;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(119,0,230,0.9),transparent 70%);`;
    container.appendChild(flash);
    flash.animate([{transform:'scale(0)',opacity:1},{transform:'scale(8)',opacity:0}],{duration:1000,easing:'ease-out',fill:'forwards'}).onfinish=()=>flash.remove();
    for(let r=0;r<3;r++){
        const ring=document.createElement('div');
        ring.style.cssText=`position:absolute;left:${cx}px;top:${cy}px;width:0;height:0;border-radius:50%;border:3px solid rgba(119,0,230,0.6);transform:translate(-50%,-50%);`;
        container.appendChild(ring);
        ring.animate([{width:'0',height:'0',opacity:1},{width:`${window.innerWidth*2}px`,height:`${window.innerWidth*2}px`,opacity:0}],{duration:1200,delay:r*200,easing:'ease-out',fill:'forwards'}).onfinish=()=>ring.remove();
    }
    boom.classList.remove('active'); void boom.offsetWidth; boom.classList.add('active');
    setTimeout(()=>boom.classList.remove('active'),2200);
    triggerGlitch();
}


function triggerRobuxRain() {
    const c = document.getElementById('robuxRain');
    const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Robux_2019_Logo_gold.svg/960px-Robux_2019_Logo_gold.svg.png';
    for(let i=0;i<25;i++){
        setTimeout(()=>{
            const coin=document.createElement('img');coin.src=url;coin.className='robux-coin';coin.alt='Robux';
            const x=Math.random()*window.innerWidth, size=25+Math.random()*25, dur=2000+Math.random()*2000;
            const rot=Math.random()*720-360, bx=(Math.random()-0.5)*200;
            coin.style.cssText+=`left:${x}px;top:-50px;width:${size}px;height:${size}px;`;
            c.appendChild(coin);
            const fy=window.innerHeight+100;
            coin.animate([{transform:`translateY(0) translateX(0) rotate(0)`,opacity:1},{transform:`translateY(${fy*0.6}px) translateX(${bx*0.5}px) rotate(${rot*0.6}deg)`,opacity:1,offset:0.6},{transform:`translateY(${fy}px) translateX(${bx}px) rotate(${rot}deg)`,opacity:0}],{duration:dur,easing:'cubic-bezier(0.34,0,0.84,1)',fill:'forwards'}).onfinish=()=>coin.remove();
        },i*80);
    }
}


function renderProjectCards() {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';
    projectsData.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-project', i);
        card.style.setProperty('--card-hue', i * 20);
        const title = typeof p.title === 'object' ? (p.title[currentLang] || p.title.fr || p.title.en) : p.title;
        const desc = typeof p.desc === 'object' ? (p.desc[currentLang] || p.desc.fr || p.desc.en) : p.desc;
        card.innerHTML = `
            <div class="card-bg" style="background-image:url('${p.heroImg}');"></div>
            <div class="card-glass"></div>
            <div class="card-content">
                <span class="card-number">${p.number}</span>
                <h3 class="card-title">${title}</h3>
                <p class="card-desc">${desc}</p>
                <span class="card-cta">${translations[currentLang].view_project}</span>
            </div>
            <div class="card-ripple"></div>
            <button class="card-delete" title="Supprimer ce projet">✕</button>
        `;

        card.addEventListener('click', function(e) {
            if (e.target.closest('.card-delete')) return;
            const idx = parseInt(this.getAttribute('data-project'));
            const ripple = this.querySelector('.card-ripple');
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX-rect.left)+'px';
            ripple.style.top = (e.clientY-rect.top)+'px';
            ripple.classList.remove('active'); void ripple.offsetWidth; ripple.classList.add('active');
            setTimeout(() => openProject(idx), 300);
        });

        card.querySelector('.card-delete').addEventListener('click', (e) => {
            e.stopPropagation();
            if (!adminMode) return;
            if (confirm(currentLang==='fr'?'Supprimer ce projet ?':'Delete this project?')) {
                projectsData.splice(i, 1);

                projectsData.forEach((proj, idx) => { proj.id = idx; proj.number = String(idx+1).padStart(2,'0'); });
                saveData();
                renderProjectCards();
                showToast(currentLang==='fr'?'Projet supprimé':'Project deleted');
            }
        });

        if (window.matchMedia('(hover:hover)').matches) {
            card.addEventListener('mousemove', e => {
                if(chaosActive) return;
                const rect=card.getBoundingClientRect();
                const rx=((e.clientY-rect.top-rect.height/2)/(rect.height/2))*-5;
                const ry=((e.clientX-rect.left-rect.width/2)/(rect.width/2))*5;
                card.style.transform=`perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.02)`;
            });
            card.addEventListener('mouseleave', () => { if(!chaosActive) card.style.transform=''; });
        }
        grid.appendChild(card);
    });

    const addCard = document.createElement('div');
    addCard.className = 'add-project-card';
    addCard.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="48" height="48"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg><span>${currentLang==='fr'?'Ajouter un projet':'Add a project'}</span>`;
    addCard.addEventListener('click', () => openNewProjectModal());
    grid.appendChild(addCard);

    initScrollReveal();
}


function openProject(idx) {
    const p = projectsData[idx];
    if (!p) return;
    currentProjectId = idx;
    currentGalleryImages = [...p.images];
    const overlay = document.getElementById('projectOverlay');
    document.getElementById('overlayHeroImg').src = p.heroImg;
    document.getElementById('overlayNumber').textContent = p.number;
    const title = typeof p.title==='object'?(p.title[currentLang]||p.title.fr):p.title;
    const desc = typeof p.desc==='object'?(p.desc[currentLang]||p.desc.fr):p.desc;
    document.getElementById('overlayTitle').textContent = title;
    document.getElementById('overlayDesc').textContent = desc;
    document.getElementById('overlayCounter').textContent = `${p.images.length} images`;

    const dz = document.getElementById('adminDropzone');
    dz.style.display = adminMode ? 'flex' : 'none';

    renderGallery();
    overlay.classList.add('active');
    document.body.classList.add('overlay-open');
    document.getElementById('overlayContainer').scrollTop = 0;
    requestAnimationFrame(() => setTimeout(() => {
        document.querySelectorAll('#galleryBento .gallery-item').forEach(it => it.classList.add('visible'));
    }, 300));
    history.pushState({project:idx},'','#projet-'+p.number);
}

function renderGallery() {
    const gb = document.getElementById('galleryBento');
    gb.innerHTML = '';
    currentGalleryImages.forEach((img, i) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.transitionDelay = `${0.1+i*0.08}s`;
        item.innerHTML = `<img src="${img}" alt="Image ${i+1}" loading="lazy"><span class="gallery-item-number">IMG ${String(i+1).padStart(2,'0')}</span><div class="gallery-zoom-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg></div>`;
        item.addEventListener('click', () => openLightbox(i));
        gb.appendChild(item);
    });
}

function closeProject() {
    document.getElementById('projectOverlay').classList.remove('active');
    document.body.classList.remove('overlay-open');
    currentProjectId = null;
    if (history.state && history.state.project !== undefined) history.back();
}

window.addEventListener('popstate', () => {
    const ov = document.getElementById('projectOverlay');
    if (ov.classList.contains('active')) { ov.classList.remove('active'); document.body.classList.remove('overlay-open'); currentProjectId = null; }
});

document.getElementById('overlayBack').addEventListener('click', closeProject);


const galleryFileInput = document.getElementById('galleryFileInput');
const adminDropzone = document.getElementById('adminDropzone');

adminDropzone.addEventListener('dragover', e => { e.preventDefault(); adminDropzone.classList.add('drag-over'); });
adminDropzone.addEventListener('dragleave', () => adminDropzone.classList.remove('drag-over'));
adminDropzone.addEventListener('drop', e => {
    e.preventDefault(); adminDropzone.classList.remove('drag-over');
    handleGalleryFiles(e.dataTransfer.files);
});
galleryFileInput.addEventListener('change', e => handleGalleryFiles(e.target.files));

function handleGalleryFiles(files) {
    if (!adminMode || currentProjectId === null) return;
    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64 = e.target.result;
            currentGalleryImages.push(base64);
            projectsData[currentProjectId].images.push(base64);
            saveData();
            renderGallery();
            requestAnimationFrame(() => setTimeout(() => {
                document.querySelectorAll('#galleryBento .gallery-item').forEach(it => it.classList.add('visible'));
            }, 100));
            showToast(currentLang==='fr'?'Image ajoutée !':'Image added!');
        };
        reader.readAsDataURL(file);
    });
}


const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCounterEl = document.getElementById('lightboxCounter');

function openLightbox(i) { currentLightboxIndex=i; updateLightboxImage(); lightbox.classList.add('active'); }
function closeLightbox() { lightbox.classList.remove('active'); }
function updateLightboxImage() {
    const img=currentGalleryImages[currentLightboxIndex]; if(!img) return;
    lightboxImg.style.opacity='0'; lightboxImg.style.transform='scale(0.92)';
    setTimeout(()=>{ lightboxImg.src=img; lightboxCounterEl.textContent=`${currentLightboxIndex+1} / ${currentGalleryImages.length}`; requestAnimationFrame(()=>{lightboxImg.style.opacity='1';lightboxImg.style.transform='scale(1)';}); },200);
}
function nextImg(){currentLightboxIndex=(currentLightboxIndex+1)%currentGalleryImages.length;updateLightboxImage();}
function prevImg(){currentLightboxIndex=(currentLightboxIndex-1+currentGalleryImages.length)%currentGalleryImages.length;updateLightboxImage();}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxNext').addEventListener('click', nextImg);
document.getElementById('lightboxPrev').addEventListener('click', prevImg);
lightbox.addEventListener('click', e => { if(e.target===lightbox||e.target.classList.contains('lightbox-backdrop')) closeLightbox(); });

document.addEventListener('keydown', e => {
    if(e.key==='Escape'){
        if(lightbox.classList.contains('active')) closeLightbox();
        else if(document.getElementById('projectOverlay').classList.contains('active')) closeProject();
    }
    if(!lightbox.classList.contains('active')) return;
    if(e.key==='ArrowRight') nextImg();
    if(e.key==='ArrowLeft') prevImg();
});

let touchStartX=0;
lightbox.addEventListener('touchstart',e=>{touchStartX=e.changedTouches[0].screenX;},{passive:true});
lightbox.addEventListener('touchend',e=>{const d=touchStartX-e.changedTouches[0].screenX;if(Math.abs(d)>50){d>0?nextImg():prevImg();}},{passive:true});
if(lightboxImg) lightboxImg.style.transition='opacity 0.3s ease,transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)';


function initScrollReveal() {
    const targets = document.querySelectorAll('.project-card:not(.reveal-init),.bio-glass:not(.reveal-init),.contact-glass:not(.reveal-init),.section-header:not(.reveal-init),.footer-glass:not(.reveal-init),.add-project-card:not(.reveal-init)');
    targets.forEach((el,i) => { el.classList.add('reveal','reveal-init'); el.style.transitionDelay=`${Math.min(i*0.05,0.4)}s`; });
    const obs = new IntersectionObserver(entries => { entries.forEach(en => { if(en.isIntersecting){en.target.classList.add('visible');obs.unobserve(en.target);} }); },{threshold:0.1,rootMargin:'0px 0px -50px 0px'});
    targets.forEach(el => obs.observe(el));
}


function createParticles() {
    const c=document.getElementById('heroParticles'); if(!c) return;
    const n=window.innerWidth<768?15:30;
    for(let i=0;i<n;i++){
        const p=document.createElement('div');p.classList.add('particle');
        p.style.left=Math.random()*100+'%';p.style.top=(60+Math.random()*40)+'%';
        const s=1+Math.random()*3;p.style.width=s+'px';p.style.height=s+'px';
        p.style.animationDuration=(6+Math.random()*10)+'s';p.style.animationDelay=(Math.random()*8)+'s';
        c.appendChild(p);
    }
}
createParticles();


function animateCounters() {
    const counters=document.querySelectorAll('.stat-number[data-target]');
    const obs=new IntersectionObserver(entries=>{entries.forEach(en=>{if(en.isIntersecting){const c=en.target,t=parseInt(c.getAttribute('data-target'));let cur=0;const inc=t/60;const timer=setInterval(()=>{cur+=inc;if(cur>=t){cur=t;clearInterval(timer);}c.textContent=Math.floor(cur);},2000/60);obs.unobserve(c);}});},{threshold:0.5});
    counters.forEach(c=>obs.observe(c));
}


const konamiSeq=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx=0;
const chaosGlow=document.getElementById('chaosGlow');


const adminSeq=['ArrowUp','ArrowDown','ArrowUp','ArrowDown','d','e','f'];
let adminIdx=0;

document.addEventListener('keydown', e => {
    const key=e.key.length===1?e.key.toLowerCase():e.key;
    if(key===konamiSeq[konamiIdx]){konamiIdx++;if(konamiIdx===konamiSeq.length){konamiIdx=0;toggleChaos();}}else{konamiIdx=0;}
    if(key===adminSeq[adminIdx]){adminIdx++;if(adminIdx===adminSeq.length){adminIdx=0;showAdminModal();}}else{adminIdx=0;}
    if(key==='l'&&!blacklightActive){blacklightActive=true;document.body.classList.add('blacklight-active');document.getElementById('flashlightOverlay').classList.add('active');showToast(currentLang==='fr'?'🔦 Lumière noire activée !':'🔦 Blacklight ON!');}
});
document.addEventListener('keyup', e => {
    if((e.key==='l'||e.key==='L')&&blacklightActive){blacklightActive=false;document.body.classList.remove('blacklight-active');document.getElementById('flashlightOverlay').classList.remove('active');}
});

function toggleChaos() {
    chaosActive=!chaosActive;
    document.body.classList.toggle('chaos-mode',chaosActive);
    showToast(chaosActive?(currentLang==='fr'?'🌊 Mode Chaos activé !':'🌊 Chaos Mode ON!'):(currentLang==='fr'?'🌊 Mode Chaos désactivé':'🌊 Chaos Mode OFF'));
    if(chaosActive) triggerGlitch();
}

document.addEventListener('mousemove', e => {
    if(chaosActive){chaosGlow.style.left=e.clientX+'px';chaosGlow.style.top=e.clientY+'px';}
    if(blacklightActive){document.getElementById('flashlightOverlay').style.background=`radial-gradient(circle 150px at ${e.clientX}px ${e.clientY}px,transparent 0%,rgba(0,0,0,0.95) 100%)`;}
});

let inactivityTimer=null, matrixAnimFrame=null;
const matrixCanvas=document.getElementById('matrixCanvas');
const matrixCtx=matrixCanvas?matrixCanvas.getContext('2d'):null;
let matrixCols=0, matrixDrops=[];

function initMatrix(){if(!matrixCanvas||!matrixCtx) return;matrixCanvas.width=window.innerWidth;matrixCanvas.height=window.innerHeight;const fs=14;matrixCols=Math.floor(matrixCanvas.width/fs);matrixDrops=[];for(let i=0;i<matrixCols;i++)matrixDrops[i]=Math.random()*-100;}
function drawMatrix(){if(!matrixCtx) return;matrixCtx.fillStyle='rgba(5,5,5,0.05)';matrixCtx.fillRect(0,0,matrixCanvas.width,matrixCanvas.height);matrixCtx.fillStyle='#7700e6';matrixCtx.font='14px JetBrains Mono,monospace';matrixCtx.shadowColor='#7700e6';matrixCtx.shadowBlur=8;const chars='アイウエオカキクケコサシスセソ0123456789ABCDEF{}[]<>/\\|';for(let i=0;i<matrixCols;i++){matrixCtx.fillText(chars[Math.floor(Math.random()*chars.length)],i*14,matrixDrops[i]*14);if(matrixDrops[i]*14>matrixCanvas.height&&Math.random()>0.975)matrixDrops[i]=0;matrixDrops[i]++;}matrixAnimFrame=requestAnimationFrame(drawMatrix);}
function startMatrix(){if(matrixActive) return;matrixActive=true;initMatrix();matrixCanvas.classList.add('active');drawMatrix();showToast(currentLang==='fr'?'🟢 La Matrice te surveille...':'🟢 The Matrix is watching...');}
function stopMatrix(){if(!matrixActive) return;matrixActive=false;matrixCanvas.classList.remove('active');cancelAnimationFrame(matrixAnimFrame);if(matrixCtx)matrixCtx.clearRect(0,0,matrixCanvas.width,matrixCanvas.height);triggerGlitch();}
function resetInactivity(){clearTimeout(inactivityTimer);if(matrixActive)stopMatrix();inactivityTimer=setTimeout(startMatrix,60000);}
['mousemove','mousedown','keydown','touchstart','scroll'].forEach(evt=>document.addEventListener(evt,resetInactivity,{passive:true}));
resetInactivity();
window.addEventListener('resize',()=>{if(matrixActive)initMatrix();});

document.getElementById('clock').addEventListener('click', () => {
    const time=document.getElementById('clock').textContent;
    if(time==='00:00:00'||time==='13:37:00'){toggleGold();}
    else showToast(currentLang==='fr'?'⏰ Reviens à 00:00:00 ou 13:37:00...':'⏰ Come back at 00:00:00 or 13:37:00...');
});
function toggleGold(){
    goldMode=!goldMode;
    document.body.classList.toggle('gold-mode',goldMode);
    const gi=document.getElementById('goldIndicator');
    if(goldMode){
        gi.classList.add('active');triggerGlitch();
        showToast(currentLang==='fr'?'✨ GOLD EDITION !':'✨ GOLD EDITION!');
        const c=document.getElementById('particleExplosion'),cx=window.innerWidth/2,cy=window.innerHeight/2;
        const golds=['#ffd700','#ffb300','#ff8c00','#fff8dc','#ffe082','#fff'];
        for(let i=0;i<100;i++){const p=document.createElement('div');p.className='explosion-particle';const s=3+Math.random()*10,a=(Math.PI*2*i)/100+(Math.random()-0.5),v=150+Math.random()*400;const dx=Math.cos(a)*v,dy=Math.sin(a)*v,col=golds[Math.floor(Math.random()*golds.length)];p.style.cssText=`left:${cx}px;top:${cy}px;width:${s}px;height:${s}px;background:${col};box-shadow:0 0 ${s*3}px ${col};`;c.appendChild(p);p.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:`translate(${dx}px,${dy}px) scale(0)`,opacity:0}],{duration:1500+Math.random()*800,easing:'cubic-bezier(0.25,0.46,0.45,0.94)',fill:'forwards'}).onfinish=()=>p.remove();}
        setTimeout(()=>gi.classList.remove('active'),4000);
    } else { showToast(currentLang==='fr'?'💜 Retour au violet':'💜 Back to purple'); triggerGlitch(); }
}


const adminModal = document.getElementById('adminModal');
const adminToolbar = document.getElementById('adminToolbar');
const newProjectModal = document.getElementById('newProjectModal');

function showAdminModal() {
    adminModal.classList.add('active');
    document.getElementById('adminPassword').value = '';
    document.getElementById('adminError').textContent = '';
    setTimeout(() => document.getElementById('adminPassword').focus(), 400);
}

document.getElementById('adminSubmit').addEventListener('click', validateAdmin);
document.getElementById('adminPassword').addEventListener('keydown', e => { if(e.key==='Enter') validateAdmin(); });
document.getElementById('adminCancel').addEventListener('click', () => adminModal.classList.remove('active'));

function validateAdmin() {
    const pwd = document.getElementById('adminPassword').value.trim();
    if (pwd === 'BTS SIO') {
        adminModal.classList.remove('active');
        activateAdminMode();
    } else {
        document.getElementById('adminError').textContent = currentLang==='fr'?'❌ Mot de passe incorrect':'❌ Wrong password';
        document.getElementById('adminPassword').value = '';
        document.getElementById('adminPassword').style.borderColor = '#e60000';
        setTimeout(() => document.getElementById('adminPassword').style.borderColor = '', 1500);
    }
}

function activateAdminMode() {
    adminMode = true;
    document.body.classList.add('admin-mode');
    adminToolbar.classList.add('active');
    renderProjectCards();
    triggerGlitch();
    showToast(currentLang==='fr'?'🔧 Mode Admin activé !':'🔧 Admin Mode ON!');
}

function deactivateAdminMode() {
    adminMode = false;
    document.body.classList.remove('admin-mode');
    adminToolbar.classList.remove('active');
    renderProjectCards();
    showToast(currentLang==='fr'?'🔒 Mode Admin désactivé':'🔒 Admin Mode OFF');
}

document.getElementById('adminLogoutBtn').addEventListener('click', deactivateAdminMode);

document.getElementById('adminExportBtn').addEventListener('click', () => {
    const json = JSON.stringify(projectsData, null, 2);
    copyToClipboard(json);
    showToast(currentLang==='fr'?'📋 JSON exporté dans le presse-papier !':'📋 JSON exported to clipboard!');
});

function openNewProjectModal() {
    if (!adminMode) return;
    newProjectModal.classList.add('active');
    document.getElementById('newProjectTitle').value = '';
    document.getElementById('newProjectDesc').value = '';
    document.getElementById('bannerPreview').style.display = 'none';
    document.getElementById('bannerInput').value = '';
    newBannerData = null;
}

let newBannerData = null;

document.getElementById('cancelProjectBtn').addEventListener('click', () => newProjectModal.classList.remove('active'));

const bannerInput = document.getElementById('bannerInput');
const bannerUploadZone = document.getElementById('bannerUploadZone');
const bannerPreview = document.getElementById('bannerPreview');
const bannerPreviewImg = document.getElementById('bannerPreviewImg');
const bannerRemove = document.getElementById('bannerRemove');

bannerInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = ev => {
        newBannerData = ev.target.result;
        bannerPreviewImg.src = newBannerData;
        bannerPreview.style.display = 'block';
        bannerUploadZone.style.display = 'none';
    };
    reader.readAsDataURL(file);
});

bannerRemove.addEventListener('click', () => {
    newBannerData = null;
    bannerPreview.style.display = 'none';
    bannerUploadZone.style.display = 'flex';
    bannerInput.value = '';
});


document.getElementById('createProjectBtn').addEventListener('click', () => {
    const title = document.getElementById('newProjectTitle').value.trim();
    const desc = document.getElementById('newProjectDesc').value.trim();
    if (!title) { showToast(currentLang==='fr'?'⚠️ Nom requis':'⚠️ Name required'); return; }
    if (!newBannerData) { showToast(currentLang==='fr'?'⚠️ Image requise':'⚠️ Image required'); return; }

    const newId = projectsData.length;
    const newNumber = String(newId + 1).padStart(2, '0');
    const newProject = {
        id: newId,
        number: newNumber,
        title: { fr: title, en: title },
        desc: { fr: desc, en: desc },
        heroImg: newBannerData,
        images: [newBannerData]
    };

    projectsData.push(newProject);
    saveData();
    newProjectModal.classList.remove('active');
    renderProjectCards();
    triggerGlitch();
    showToast(currentLang==='fr'?`✅ Projet "${title}" créé !`:`✅ Project "${title}" created!`);
});


document.addEventListener('DOMContentLoaded', () => {
    renderProjectCards();
    animateCounters();
    initScrollReveal();
});



const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = musicToggle.querySelector('.music-icon');

music.volume = 0.05; 
let hasStarted = false;

function tryPlayMusic() {
    if (hasStarted) return;

    music.play().then(() => {
        hasStarted = true;
        musicToggle.classList.add('playing');
        if(musicIcon) musicIcon.textContent = 'ON';
        console.log("Musique lancée avec succès");
    }).catch(err => {
        console.log("En attente d'une interaction utilisateur pour le son...");
    });
}

window.addEventListener('click', tryPlayMusic, { once: true });
window.addEventListener('scroll', tryPlayMusic, { once: true });
window.addEventListener('touchstart', tryPlayMusic, { once: true });
window.addEventListener('keydown', tryPlayMusic, { once: true });

musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (music.paused) {
        music.play();
        musicToggle.classList.add('playing');
        if(musicIcon) musicIcon.textContent = 'ON';
    } else {
        music.pause();
        musicToggle.classList.remove('playing');
        if(musicIcon) musicIcon.textContent = 'OFF';
    }
});


const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

    createTrail(mouseX, mouseY);
});


function animateOutline() {
    let distX = mouseX - outlineX;
    let distY = mouseY - outlineY;
    
    
    outlineX += distX * 0.15;
    outlineY += distY * 0.15;
    
    outline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
    requestAnimationFrame(animateOutline);
}
animateOutline();

function createTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    
    trail.animate([
        { transform: 'scale(1)', opacity: 0.8 },
        { transform: 'scale(0)', opacity: 0 }
    ], {
        duration: 500,
        easing: 'ease-out'
    }).onfinish = () => trail.remove();
}

window.addEventListener('mousedown', () => {
    outline.style.transform += ' scale(0.6)';
    outline.style.backgroundColor = 'rgba(138, 43, 226, 0.8)';
    dot.style.transform += ' scale(2)';
});

window.addEventListener('mouseup', () => {
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
    outline.style.backgroundColor = 'rgba(138, 43, 226, 0.15)';
});

const interactives = document.querySelectorAll('a, button, .project-card, .gallery-item');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hover'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hover'));
});