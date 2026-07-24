/* ============================================================
   site.js — Rendu du site public depuis window.SITE_CONTENT
   (défini par contenu.js, chargé avant ce fichier).
   ============================================================ */
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Contenu par défaut minimal si contenu.js est absent */
  const FALLBACK = {
    brand: 'Fht',
    hero: { path: 'game.ReplicatedStorage.Fht', titleTop: 'Développeur', titleAccent: 'Roblox.', role: '', bio: '', ctaPrimary: 'Demander un devis', ctaSecondary: 'Voir les jeux' },
    social: { discord: '', roblox: '', email: '', x: '' },
    stats: [], games: [], clips: [],
    commissions: { heading: '', paragraphs: [], terms: [] },
    footer: { online: true, status: 'En ligne' }
  };

  /* Résolution du contenu : aperçu (brouillon) > contenu.js > fallback */
  const isPreview = new URLSearchParams(location.search).get('preview') === '1';
  let content = window.SITE_CONTENT || FALLBACK;
  let previewMode = false;
  if (isPreview) {
    try {
      const draft = JSON.parse(localStorage.getItem('fht_admin_draft') || 'null');
      if (draft) { content = draft; previewMode = true; }
    } catch (e) { /* brouillon illisible : on garde le contenu publié */ }
  }
  // Complète les clés manquantes avec le fallback (robustesse)
  content = Object.assign({}, FALLBACK, content);

  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const GLYPH = { script: '&lt;&gt;', model: '▦', folder: '▤', server: '≡' };

  const $ = (id) => document.getElementById(id);

  /* ---------- PREVIEW BANNER ---------- */
  if (previewMode) {
    $('previewBanner').className = 'preview-banner';
    $('previewBanner').innerHTML = 'APERÇU — brouillon non publié. <a href="index.html">Voir la version en ligne</a>';
  }

  /* ---------- IDENTITÉ / HERO ---------- */
  $('brandName').textContent = content.brand || 'Fht';
  const h = content.hero || {};
  $('heroPath').innerHTML = pathToHtml(h.path || '');
  $('heroTitle').innerHTML = `${esc(h.titleTop || '')}<br><em>${esc(h.titleAccent || '')}</em>`;
  $('heroRole').textContent = h.role || '';
  $('heroBio').textContent = h.bio || '';
  $('ctaPrimary').textContent = h.ctaPrimary || 'Demander un devis';
  $('ctaSecondary').textContent = h.ctaSecondary || 'Voir les jeux';
  $('propsTitle').textContent = `Properties — ${content.brand || 'Fht'}`;

  const soc = content.social || {};
  const isUrl = (v) => /^https?:/i.test(String(v || ''));
  $('socials').innerHTML = [
    // Discord est souvent un pseudo, pas une URL : on l'affiche tel quel dans ce cas
    soc.discord && (isUrl(soc.discord)
      ? `<a href="${esc(soc.discord)}" target="_blank" rel="noopener">Discord</a>`
      : `<span class="social-tag">Discord · ${esc(soc.discord)}</span>`),
    soc.roblox && `<a href="${esc(soc.roblox)}" target="_blank" rel="noopener">Roblox</a>`,
    soc.email && `<a href="mailto:${esc(soc.email)}">Email</a>`,
    soc.x && `<a href="${esc(soc.x)}" target="_blank" rel="noopener">X</a>`
  ].filter(Boolean).join('');

  function pathToHtml(path) {
    const parts = String(path).split('.');
    const last = parts.pop();
    const head = parts.map(p => `${esc(p)}<i>.</i>`).join('');
    return `<span class="ico ico-model">▦</span>${head}<b>${esc(last)}</b>`;
  }

  /* ---------- STATS (Properties) ---------- */
  $('propsGrid').innerHTML = (content.stats || []).map(s => `
    <div class="prop">
      <div class="prop-name">${esc(s.name)}</div>
      <div class="prop-value" data-target="${esc(s.value)}" data-suffix="${esc(s.suffix || '')}">0</div>
      <div class="prop-type">${esc(s.type || 'number')}</div>
    </div>`).join('');

  /* ---------- GAMES ---------- */
  $('gamesGrid').innerHTML = (content.games || []).map(g => {
    const cover = g.image
      ? `<img src="${esc(g.image)}" alt="${esc(g.name)}" loading="lazy">`
      : `<span class="game-cover-ph">rbxassetid://${esc((g.name || '').replace(/\s/g, ''))}</span>`;
    return `
      <article class="game reveal">
        <div class="game-cover">${cover}</div>
        <div class="game-body">
          <div class="game-title-row">
            <span class="ico ico-${esc(g.icon || 'model')}">${GLYPH[g.icon] || '▦'}</span>
            <span class="game-name">${esc(g.name)}</span>
          </div>
          <p class="game-desc">${esc(g.desc)}</p>
          <div class="game-meta">
            <div class="game-prop"><span class="k">Role</span><span class="v">${esc(g.role)}</span></div>
            ${g.visits ? `<div class="game-prop"><span class="k">Visits</span><span class="v"><em>${esc(g.visits)}</em></span></div>` : ''}
          </div>
          ${g.link ? `<a class="game-link" href="${esc(g.link)}" target="_blank" rel="noopener">Ouvrir sur Roblox ↗</a>` : ''}
        </div>
      </article>`;
  }).join('');

  /* ---------- CLIPS ---------- */
  const clipsGrid = $('clipsGrid');
  const allImages = [];
  (content.clips || []).forEach((clip, i) => {
    const imgs = clip.images || [];
    if (!imgs.length) return;
    const startIdx = allImages.length;
    const card = document.createElement('article');
    card.className = 'clip reveal' + (i === 0 ? ' clip-wide' : '');
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Ouvrir ' + (clip.title || 'clip'));
    card.innerHTML = `
      <div class="clip-preview">
        <img src="${esc(imgs[0])}" alt="${esc(clip.title)}" loading="lazy">
        <span class="clip-count">${imgs.length} img</span>
      </div>
      <div class="clip-body">
        <span class="clip-title">${esc(clip.title)}</span>
        <span class="clip-tags">${(clip.tags || []).map(t => `<span class="clip-tag">${esc(t)}</span>`).join('')}</span>
      </div>`;
    card.addEventListener('click', () => openLightbox(startIdx));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(startIdx); }
    });
    clipsGrid.appendChild(card);
    imgs.forEach(src => allImages.push(src));
  });

  /* ---------- COMMISSIONS ---------- */
  const comm = content.commissions || {};
  $('termsHeading').textContent = comm.heading || '';
  $('termsParagraphs').innerHTML = (comm.paragraphs || []).map(p => `<p>${esc(p)}</p>`).join('');
  $('termsList').innerHTML = (comm.terms || []).map(t => `<li>${esc(t)}</li>`).join('');

  /* ---------- FOOTER ---------- */
  const foot = content.footer || {};
  $('footStatusText').textContent = foot.status || '';
  $('footStatus').className = 'status' + (foot.online === false ? ' offline' : '');
  $('footCopyright').textContent = `© 2026 ${content.brand || 'Fht'} · Builder & Level Designer`;
  const footRoblox = document.querySelector('.foot-roblox');
  const footEmail = document.querySelector('.foot-email');
  if (footRoblox) {
    if (soc.roblox) footRoblox.href = soc.roblox; else footRoblox.hidden = true;
  }
  if (footEmail) {
    if (soc.email) footEmail.href = 'mailto:' + soc.email; else footEmail.hidden = true;
  }

  /* ---------- LIGHTBOX ---------- */
  const lb = $('lightbox'), lbImage = $('lbImage'), lbPrev = $('lbPrev'),
        lbNext = $('lbNext'), lbClose = $('lbClose'), lbCounter = $('lbCounter');
  let current = 0, lastFocus = null;

  function render() {
    lbImage.src = allImages[current];
    lbCounter.textContent = `${current + 1} / ${allImages.length}`;
  }
  function openLightbox(i) {
    current = i; lastFocus = document.activeElement; render();
    lb.classList.add('active'); document.body.style.overflow = 'hidden'; lbClose.focus();
  }
  function closeLightbox() {
    lb.classList.remove('active'); document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  lbPrev.addEventListener('click', () => { current = (current - 1 + allImages.length) % allImages.length; render(); });
  lbNext.addEventListener('click', () => { current = (current + 1) % allImages.length; render(); });
  lbClose.addEventListener('click', closeLightbox);
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lbPrev.click();
    if (e.key === 'ArrowRight') lbNext.click();
  });

  /* ---------- STAT COUNT-UP ---------- */
  function animateStats() {
    document.querySelectorAll('.prop-value[data-target]').forEach(el => {
      const target = parseFloat(el.dataset.target) || 0;
      const suffix = el.dataset.suffix || '';
      if (reduceMotion) { el.textContent = target + suffix; return; }
      const dur = 1400, t0 = performance.now();
      function step(now) {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(step);
    });
  }
  const statsEl = $('stats');
  if (statsEl) {
    const statsObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { animateStats(); statsObs.unobserve(e.target); } });
    }, { threshold: 0.35 });
    statsObs.observe(statsEl);
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion) {
    revealEls.forEach(el => el.classList.add('in'));
  } else {
    const revObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revObs.observe(el));
  }

  /* ---------- FORM (FormSubmit — sans inscription) ---------- */
  const form = $('devisForm'), formStatus = $('formStatus'), submitBtn = $('submitBtn');
  const contactEmail = (content.social && content.social.email) || '';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (previewMode) {
      formStatus.textContent = 'Aperçu — le formulaire n\'envoie rien ici.';
      formStatus.className = 'form-status';
      return;
    }
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi…';
    formStatus.textContent = '';
    formStatus.className = 'form-status';
    try {
      if (!contactEmail) throw new Error('not-configured');
      const payload = {
        name: $('name').value,
        contact: $('contact').value,
        project: $('project').value,
        details: $('details').value,
        _subject: 'Nouvelle demande de devis — ' + ($('name').value || 'site'),
        _template: 'table',
        _captcha: 'false'
      };
      const res = await fetch('https://formsubmit.co/ajax/' + encodeURIComponent(contactEmail), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      let ok = res.ok;
      // FormSubmit répond 200 même en cas d'échec logique : on lit success dans le JSON
      try { const j = await res.json(); if (j && (j.success === false || j.success === 'false')) ok = false; } catch (_) {}
      if (!ok) throw new Error('server');
      formStatus.textContent = 'Demande envoyée. Je te réponds vite.';
      formStatus.className = 'form-status success';
      form.reset();
    } catch (err) {
      formStatus.textContent = "L'envoi a échoué. Écris-moi sur Discord en attendant.";
      formStatus.className = 'form-status error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Envoyer la demande';
    }
  });
})();
