/* ============================================================
   admin.js — Backoffice : édition de contenu.js (100% navigateur)
   Charge window.SITE_CONTENT (contenu.js) comme point de départ,
   sauvegarde un brouillon en localStorage, exporte contenu.js.
   ============================================================ */
(function () {
  /* ============================================================
     MOT DE PASSE — CHANGE-MOI
     Remplace la valeur ci-dessous par ton propre mot de passe.
     Note : ce n'est qu'une porte d'entrée, PAS une sécurité forte
     (tout est côté navigateur). Garde l'URL de cette page privée.
     ============================================================ */
  const ADMIN_PASSWORD = 'fht2026';

  const DRAFT_KEY = 'fht_admin_draft';
  const SESSION_KEY = 'fht_admin_session';

  /* Prompt prêt à donner à une IA pour générer un contenu importable ici */
  const AI_PROMPT = `Tu prépares le fichier de contenu d'un site portfolio de builder / level designer Roblox.

RÈGLE DE SORTIE :
- Réponds UNIQUEMENT avec un fichier JavaScript valide.
- Il doit commencer exactement par "window.SITE_CONTENT = {" et se terminer par "};".
- Aucun texte, aucune explication, aucun bloc Markdown autour.

STRUCTURE EXACTE À RESPECTER (garde les mêmes noms de clés) :

window.SITE_CONTENT = {
  "brand": "Fht",
  "hero": {
    "path": "game.Workspace.Fht",
    "titleTop": "Des mondes",
    "titleAccent": "qui captivent.",
    "role": "une ligne de description",
    "bio": "1 à 3 phrases de présentation",
    "ctaPrimary": "Demander un devis",
    "ctaSecondary": "Voir les jeux"
  },
  "social": {
    "discord": "pseudo Discord (ex. de_fht) ou lien, ou vide",
    "roblox": "https://www.roblox.com/users/.../profile ou vide",
    "email": "adresse email ou vide",
    "x": "https://twitter.com/... ou vide"
  },
  "stats": [
    { "name": "Visits", "value": 300, "suffix": "M+", "type": "number" }
  ],
  "games": [
    { "name": "Nom du build", "icon": "model", "role": "Build / Optimisation 3D / GUI Design", "desc": "une phrase", "visits": "700K+ ou vide", "image": "" }
  ],
  "clips": [
    { "title": "Titre du clip", "tags": ["UI", "Gameplay"], "images": [] }
  ],
  "commissions": {
    "heading": "Comment ça marche",
    "paragraphs": ["phrase 1", "phrase 2"],
    "terms": ["point 1", "point 2", "point 3"],
    "formspreeId": "YOUR_FORM_ID"
  },
  "footer": {
    "online": true,
    "status": "En ligne — dispo pour commissions"
  }
};

CONTRAINTES :
- "icon" ne peut valoir QUE : "model", "script", "folder" ou "server".
- "value" (stats) est un nombre entier ; "suffix" est un texte court comme "K+", "+", " ans".
- "visits" peut rester vide ("") si le projet n'a pas de chiffre public.
- Laisse "image" à "" et "images" à [] : les images s'ajoutent dans le backoffice, pas par l'IA.
- "online" vaut true (disponible) ou false (indisponible).
- Garde "formspreeId" tel quel si tu ne le connais pas.
- N'invente pas de chiffres : utilise uniquement ceux que je te donne.

MES INFOS (à compléter) :
- Nom :
- Ce que je fais (rôle, style) :
- Mes builds / maps (nom, rôle, visites si connues, 1 phrase chacun) :
- Mes clips / captures (titre + tags) :
- Mes liens (Discord, Roblox, X) :
- Mes chiffres (visites, jeux, membres, joueurs simultanés) :`;

  /* ---------- SEED (données de départ) ---------- */
  function deepCopy(o) { return JSON.parse(JSON.stringify(o)); }
  const SEED = window.SITE_CONTENT ? deepCopy(window.SITE_CONTENT) : {
    brand: 'Fht',
    hero: { path: 'game.ReplicatedStorage.Fht', titleTop: 'Développeur', titleAccent: 'Roblox.', role: '', bio: '', ctaPrimary: 'Demander un devis', ctaSecondary: 'Voir les jeux' },
    social: { discord: '', roblox: '', email: '', x: '' },
    stats: [], games: [], clips: [],
    commissions: { heading: 'Comment ça marche', paragraphs: [], terms: [], formspreeId: 'YOUR_FORM_ID' },
    footer: { online: true, status: 'En ligne — dispo pour commissions' }
  };

  let data, hadDraft = false;
  try {
    const draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
    if (draft) { data = draft; hadDraft = true; } else { data = deepCopy(SEED); }
  } catch (e) { data = deepCopy(SEED); }
  ensureShape(data);

  // Un brouillon retrouvé au démarrage = modifs pas encore publiées (pas encore téléchargées)
  let needsPublish = hadDraft;

  function ensureShape(d) {
    d.brand = d.brand || 'Fht';
    d.hero = Object.assign({ path: '', titleTop: '', titleAccent: '', role: '', bio: '', ctaPrimary: 'Demander un devis', ctaSecondary: 'Voir les jeux' }, d.hero || {});
    d.social = Object.assign({ discord: '', roblox: '', email: '', x: '' }, d.social || {});
    d.stats = d.stats || [];
    d.games = d.games || [];
    d.clips = d.clips || [];
    d.commissions = Object.assign({ heading: '', paragraphs: [], terms: [], formspreeId: 'YOUR_FORM_ID' }, d.commissions || {});
    d.footer = Object.assign({ online: true, status: '' }, d.footer || {});
  }

  /* Accès stockage protégés (certains navigateurs bloquent
     sessionStorage/localStorage en file:// ou en navigation privée) */
  function ssGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function ssSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* ignoré */ } }

  /* ---------- GATE ---------- */
  const gate = document.getElementById('gate');
  const app = document.getElementById('app');
  function openApp() { gate.hidden = true; app.hidden = false; render(); updateSize(); updatePublishState(); }

  document.getElementById('gateForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const val = document.getElementById('gatePass').value;
    if (val === ADMIN_PASSWORD) {
      ssSet(SESSION_KEY, '1');
      openApp();
    } else {
      document.getElementById('gateErr').textContent = 'Mot de passe incorrect.';
    }
  });

  /* ---------- UTILS ---------- */
  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const $ = (id) => document.getElementById(id);

  let saveTimer = null;
  function markDirty() {
    const st = $('saveState'); st.className = 'save-state dirty'; $('saveText').textContent = 'Modifs non enregistrées…';
    needsPublish = true; updatePublishState();
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveDraft, 500);
  }
  function updatePublishState() {
    const el = $('publishState'); if (!el) return;
    const btn = $('btnDownload');
    if (needsPublish) {
      el.textContent = '● À publier';
      el.className = 'publish-chip pending';
      if (btn) btn.classList.add('attention');
    } else {
      el.textContent = '✓ Publié';
      el.className = 'publish-chip ok';
      if (btn) btn.classList.remove('attention');
    }
  }
  function saveDraft() {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
      const st = $('saveState'); st.className = 'save-state saved'; $('saveText').textContent = 'Brouillon enregistré';
    } catch (e) {
      const st = $('saveState'); st.className = 'save-state'; $('saveText').textContent = 'Erreur de sauvegarde (fichier trop lourd ?)';
    }
    updateSize();
  }
  function toast(msg, type) {
    const t = $('toast'); t.textContent = msg; t.className = 'toast show ' + (type || '');
    setTimeout(() => { t.className = 'toast ' + (type || ''); }, 2600);
  }
  function setByPath(path, value) {
    const keys = path.split('.'); let o = data;
    for (let i = 0; i < keys.length - 1; i++) o = o[keys[i]];
    o[keys[keys.length - 1]] = value;
  }

  /* Analyse un contenu (fichier ou collage IA) et renvoie l'objet.
     Accepte : "window.SITE_CONTENT = {...}", du JSON pur, ou entouré de ```fences``` / de texte. */
  function parseContentSource(src) {
    let s = String(src || '').trim();
    s = s.replace(/^```[a-zA-Z]*\s*/, '').replace(/```\s*$/, '').trim();
    let obj;
    if (/window\.SITE_CONTENT/.test(s)) {
      const stub = {};
      new Function('window', s)(stub);
      obj = stub.SITE_CONTENT;
    } else {
      try { obj = JSON.parse(s); }
      catch (_) {
        const a = s.indexOf('{'), b = s.lastIndexOf('}');
        if (a >= 0 && b > a) obj = JSON.parse(s.slice(a, b + 1));
      }
    }
    if (!obj || typeof obj !== 'object') throw new Error('format');
    return obj;
  }

  /* Copie robuste (navigator.clipboard, sinon sélection + execCommand pour file://) */
  function copyText(text, srcEl) {
    function fallback() {
      try {
        let ta = srcEl, temp = false;
        if (!ta) { ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); temp = true; }
        ta.focus(); ta.select();
        document.execCommand('copy');
        if (temp) ta.remove();
        toast('Prompt copié', 'ok');
      } catch (_) { toast('Copie impossible — sélectionne le texte à la main', 'err'); }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => toast('Prompt copié', 'ok'), fallback);
    } else { fallback(); }
  }

  function applyContent(obj) {
    data = obj; ensureShape(data);
    needsPublish = true;
    saveDraft();
    activeSec = 'identite';
    document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.sec === 'identite'));
    render(); updatePublishState();
  }

  /* ---------- IMAGE UPLOAD (compression) ---------- */
  function compressImage(file, maxW) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const scale = Math.min(1, (maxW || 1400) / img.width);
          const w = Math.round(img.width * scale), hh = Math.round(img.height * scale);
          const canvas = document.createElement('canvas');
          canvas.width = w; canvas.height = hh;
          canvas.getContext('2d').drawImage(img, 0, 0, w, hh);
          resolve(canvas.toDataURL('image/jpeg', 0.82));
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /* ============================================================
     RENDER
     ============================================================ */
  let activeSec = 'identite';
  document.getElementById('sidebar').addEventListener('click', (e) => {
    const btn = e.target.closest('.nav-item'); if (!btn) return;
    activeSec = btn.dataset.sec;
    document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n === btn));
    render();
    window.scrollTo({ top: 0 });
  });

  function render() {
    const main = $('main');
    if (activeSec === 'identite') main.innerHTML = viewIdentite();
    else if (activeSec === 'stats') main.innerHTML = viewStats();
    else if (activeSec === 'jeux') main.innerHTML = viewJeux();
    else if (activeSec === 'clips') main.innerHTML = viewClips();
    else if (activeSec === 'commissions') main.innerHTML = viewCommissions();
    else if (activeSec === 'footer') main.innerHTML = viewFooter();
    else if (activeSec === 'ia') main.innerHTML = viewIA();
  }

  /* ---------- VUES ---------- */
  function viewIdentite() {
    const h = data.hero, s = data.social;
    return `
      <h2 class="sec-title">Identité</h2>
      <p class="sec-hint">Le haut de la page : titre, présentation et liens.</p>
      <div class="field"><label>Nom / marque</label><input data-path="brand" value="${esc(data.brand)}"></div>
      <div class="field mono"><label>Chemin affiché <span class="opt">(style Roblox, ex. game.ReplicatedStorage.Fht)</span></label><input data-path="hero.path" value="${esc(h.path)}"></div>
      <div class="row2">
        <div class="field"><label>Titre — ligne 1</label><input data-path="hero.titleTop" value="${esc(h.titleTop)}"></div>
        <div class="field"><label>Titre — ligne 2 (en bleu)</label><input data-path="hero.titleAccent" value="${esc(h.titleAccent)}"></div>
      </div>
      <div class="field"><label>Rôle (sous le titre)</label><input data-path="hero.role" value="${esc(h.role)}"></div>
      <div class="field"><label>Présentation</label><textarea data-path="hero.bio">${esc(h.bio)}</textarea></div>
      <div class="row2">
        <div class="field"><label>Bouton principal</label><input data-path="hero.ctaPrimary" value="${esc(h.ctaPrimary)}"></div>
        <div class="field"><label>Bouton secondaire</label><input data-path="hero.ctaSecondary" value="${esc(h.ctaSecondary)}"></div>
      </div>
      <h2 class="sec-title" style="font-size:1.15rem; margin-top:2rem;">Liens</h2>
      <p class="sec-hint">Laisse vide pour masquer un lien.</p>
      <div class="field mono"><label>Discord <span class="opt">(pseudo ou lien)</span></label><input data-path="social.discord" value="${esc(s.discord)}" placeholder="de_fht"></div>
      <div class="field mono"><label>Roblox <span class="opt">(lien du profil)</span></label><input data-path="social.roblox" value="${esc(s.roblox)}" placeholder="https://www.roblox.com/users/.../profile"></div>
      <div class="field mono"><label>Email</label><input data-path="social.email" value="${esc(s.email)}" placeholder="prenom@exemple.com"></div>
      <div class="field mono"><label>X / Twitter</label><input data-path="social.x" value="${esc(s.x)}" placeholder="https://twitter.com/..."></div>
    `;
  }

  function viewStats() {
    const items = data.stats.map((s, i) => `
      <div class="item" data-list="stats" data-index="${i}">
        <div class="item-head">
          <span class="drag-handle" data-drag-handle draggable="true" title="Glisser pour réordonner" aria-hidden="true">⠿</span>
          <span class="idx">${String(i + 1).padStart(2, '0')}</span>
          <span class="item-name">${esc(s.name) || 'Sans nom'}</span>
          ${itemTools('stats', i, data.stats.length)}
        </div>
        <div class="row3">
          <div class="field"><label>Nom (ex. Visits)</label><input data-field="name" value="${esc(s.name)}"></div>
          <div class="field"><label>Valeur</label><input data-field="value" type="number" value="${esc(s.value)}"></div>
          <div class="field"><label>Suffixe (ex. M+)</label><input data-field="suffix" value="${esc(s.suffix)}"></div>
        </div>
      </div>`).join('');
    return `
      <h2 class="sec-title">Statistiques</h2>
      <p class="sec-hint">Le panneau « Properties » sous le hero. Le compteur s'anime au chargement.</p>
      ${items}
      <button class="add-btn" data-action="add" data-list="stats">+ Ajouter une statistique</button>`;
  }

  function viewJeux() {
    const items = data.games.map((g, i) => `
      <div class="item" data-list="games" data-index="${i}">
        <div class="item-head">
          <span class="drag-handle" data-drag-handle draggable="true" title="Glisser pour réordonner" aria-hidden="true">⠿</span>
          <span class="idx">${String(i + 1).padStart(2, '0')}</span>
          <span class="item-name">${esc(g.name) || 'Nouveau jeu'}</span>
          ${itemTools('games', i, data.games.length)}
        </div>
        <div class="cover-preview dropzone" data-drop-cover="${i}">${g.image ? `<img src="${esc(g.image)}" alt="">` : `<span class="dz-hint">Glisse une image ici</span>`}</div>
        <div class="upload-row">
          <label class="file-label">Choisir un fichier<input type="file" accept="image/*" data-action="cover" data-index="${i}"></label>
          ${g.image ? `<button class="btn btn-sm btn-danger" data-action="cover-remove" data-index="${i}">Retirer l'image</button>` : ''}
        </div>
        <div class="row2" style="margin-top:0.9rem;">
          <div class="field"><label>Nom du jeu</label><input data-field="name" value="${esc(g.name)}"></div>
          <div class="field"><label>Ton rôle</label><input data-field="role" value="${esc(g.role)}"></div>
        </div>
        <div class="row2">
          <div class="field"><label>Visites (ex. 45M)</label><input data-field="visits" value="${esc(g.visits)}"></div>
          <div class="field"><label>Icône</label>
            <select data-field="icon">
              ${iconOpt('model', g.icon, 'Modèle ▦')}
              ${iconOpt('script', g.icon, 'Script &lt;&gt;')}
              ${iconOpt('folder', g.icon, 'Dossier ▤')}
              ${iconOpt('server', g.icon, 'Serveur ≡')}
            </select>
          </div>
        </div>
        <div class="field"><label>Description</label><textarea data-field="desc">${esc(g.desc)}</textarea></div>
      </div>`).join('');
    return `
      <h2 class="sec-title">Jeux</h2>
      <p class="sec-hint">Les projets affichés dans la grille « Workspace ». Sans image, une couverture stylisée s'affiche.</p>
      ${items}
      <button class="add-btn" data-action="add" data-list="games">+ Ajouter un jeu</button>`;
  }

  function viewClips() {
    const items = data.clips.map((c, i) => {
      const thumbs = (c.images || []).map((src, j) => `
        <div class="thumb"><img src="${esc(src)}" alt=""><button class="rm" data-action="clip-img-remove" data-index="${i}" data-img="${j}" title="Retirer">×</button></div>`).join('');
      return `
      <div class="item" data-list="clips" data-index="${i}">
        <div class="item-head">
          <span class="drag-handle" data-drag-handle draggable="true" title="Glisser pour réordonner" aria-hidden="true">⠿</span>
          <span class="idx">${String(i + 1).padStart(2, '0')}</span>
          <span class="item-name">${esc(c.title) || 'Nouveau clip'}</span>
          ${itemTools('clips', i, data.clips.length)}
        </div>
        <div class="field"><label>Titre</label><input data-field="title" value="${esc(c.title)}"></div>
        <div class="field mono"><label>Tags <span class="opt">(séparés par des virgules)</span></label><input data-field="tags" value="${esc((c.tags || []).join(', '))}"></div>
        <label style="display:block; font-family:var(--font-mono); font-size:0.72rem; color:var(--text-2); margin-bottom:0.4rem;">Images ${i === 0 ? '<span class="opt">— le 1er clip s\'affiche en grand</span>' : ''}</label>
        <div class="thumbs dropzone" data-drop-clip="${i}">${thumbs || '<span class="dz-hint">Glisse des images ici, ou utilise le bouton</span>'}</div>
        <div class="upload-row">
          <label class="file-label">+ Ajouter des images<input type="file" accept="image/*" multiple data-action="clip-imgs" data-index="${i}"></label>
          <button class="btn btn-sm" data-action="clip-img-url" data-index="${i}">+ par URL</button>
        </div>
      </div>`;
    }).join('');
    return `
      <h2 class="sec-title">Clips</h2>
      <p class="sec-hint">Galeries d'images ouvertes en plein écran. Glisse plusieurs images d'un coup — elles sont compressées automatiquement.</p>
      ${items}
      <button class="add-btn" data-action="add" data-list="clips">+ Ajouter un clip</button>`;
  }

  function viewCommissions() {
    const c = data.commissions;
    return `
      <h2 class="sec-title">Commissions</h2>
      <p class="sec-hint">Le bloc conditions + le formulaire de devis.</p>
      <div class="field"><label>Titre du bloc</label><input data-path="commissions.heading" value="${esc(c.heading)}"></div>
      <div class="field"><label>Paragraphes <span class="opt">(une ligne = un paragraphe)</span></label><textarea data-textlist="commissions.paragraphs" style="min-height:120px;">${esc((c.paragraphs || []).join('\n'))}</textarea></div>
      <div class="field"><label>Points listés <span class="opt">(une ligne = un point, précédé d'un ✓)</span></label><textarea data-textlist="commissions.terms" style="min-height:140px;">${esc((c.terms || []).join('\n'))}</textarea></div>
      <div class="note">Le formulaire envoie les demandes via <b>Formspree</b> (gratuit). Crée un formulaire sur formspree.io, récupère ton identifiant (ex. <b>xayzabcd</b> dans l'URL) et colle-le ci-dessous.</div>
      <div class="field mono"><label>Identifiant Formspree</label><input data-path="commissions.formspreeId" value="${esc(c.formspreeId)}" placeholder="YOUR_FORM_ID"></div>
    `;
  }

  function viewFooter() {
    const f = data.footer;
    return `
      <h2 class="sec-title">Pied de page</h2>
      <p class="sec-hint">La barre de statut en bas du site.</p>
      <div class="field">
        <label>Disponibilité</label>
        <select data-path="footer.online">
          <option value="true" ${f.online !== false ? 'selected' : ''}>● En ligne / disponible</option>
          <option value="false" ${f.online === false ? 'selected' : ''}>○ Indisponible</option>
        </select>
      </div>
      <div class="field"><label>Texte de statut</label><input data-path="footer.status" value="${esc(f.status)}"></div>
    `;
  }

  function viewIA() {
    return `
      <h2 class="sec-title">Assistant IA</h2>
      <p class="sec-hint">Fais préparer ton contenu par une IA (ChatGPT, Claude…), puis charge-le ici.</p>

      <div class="note">
        <b>Comment ça marche</b><br>
        1. Copie le prompt ci-dessous.<br>
        2. Colle-le dans une IA et complète tes infos (jeux, rôle, chiffres).<br>
        3. L'IA te renvoie un contenu — copie sa réponse entière.<br>
        4. Colle-la dans « Charger le résultat » plus bas (ou enregistre-la en fichier <b>contenu.js</b> et utilise « Importer… » en haut).<br>
        5. Vérifie avec « ↗ Aperçu », puis « ⤓ Télécharger contenu.js » pour publier.
      </div>

      <div class="field">
        <label>Prompt à donner à l'IA</label>
        <textarea class="ai-prompt" id="aiPrompt" readonly>${esc(AI_PROMPT)}</textarea>
      </div>
      <button class="btn btn-primary" data-action="ai-copy" style="margin-bottom:2.25rem;">⧉ Copier le prompt</button>

      <h2 class="sec-title" style="font-size:1.15rem;">Charger le résultat</h2>
      <p class="sec-hint">Colle ici la réponse de l'IA (le bloc <span class="opt">window.SITE_CONTENT = …</span> ou le JSON).</p>
      <div class="field">
        <textarea class="ai-prompt" id="aiPaste" placeholder="Colle ici le contenu généré par l'IA…"></textarea>
      </div>
      <button class="btn" data-action="ai-load">↧ Charger ce contenu</button>

      <div class="note warn" style="margin-top:1.75rem;">
        Vérifie toujours le rendu avec « Aperçu » avant de publier : une IA peut se tromper.
        Les images ne se collent pas ici — ajoute-les ensuite dans les sections Jeux et Clips.
      </div>
    `;
  }

  function itemTools(list, i, len) {
    return `<div class="item-tools">
      <button class="icon-btn" data-action="up" data-list="${list}" data-index="${i}" ${i === 0 ? 'disabled' : ''} title="Monter">↑</button>
      <button class="icon-btn" data-action="down" data-list="${list}" data-index="${i}" ${i === len - 1 ? 'disabled' : ''} title="Descendre">↓</button>
      <button class="icon-btn del" data-action="remove" data-list="${list}" data-index="${i}" title="Supprimer">×</button>
    </div>`;
  }
  function iconOpt(val, cur, label) {
    return `<option value="${val}" ${cur === val ? 'selected' : ''}>${label}</option>`;
  }

  /* ============================================================
     ÉVÉNEMENTS DÉLÉGUÉS
     ============================================================ */
  const main = $('main');

  // Saisie (input) — met à jour data sans re-render (garde le focus)
  main.addEventListener('input', (e) => {
    const el = e.target;
    if (el.dataset.path !== undefined) {
      let v = el.value;
      if (el.dataset.path === 'footer.online') v = (v === 'true');
      setByPath(el.dataset.path, v);
      markDirty(); return;
    }
    if (el.dataset.textlist !== undefined) {
      setByPath(el.dataset.textlist, el.value.split('\n').map(s => s.trim()).filter(Boolean));
      markDirty(); return;
    }
    if (el.dataset.field !== undefined) {
      const item = el.closest('[data-list]');
      const list = item.dataset.list, idx = +item.dataset.index, field = el.dataset.field;
      if (field === 'tags') data[list][idx].tags = el.value.split(',').map(s => s.trim()).filter(Boolean);
      else if (field === 'value') data[list][idx].value = el.value === '' ? '' : Number(el.value);
      else data[list][idx][field] = el.value;
      // met à jour le titre de la carte à la volée
      if (field === 'name' || field === 'title') {
        const nameEl = item.querySelector('.item-name');
        if (nameEl) nameEl.textContent = el.value || nameEl.textContent;
      }
      markDirty(); return;
    }
  });

  // Clics (boutons d'action)
  main.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]'); if (!btn) return;
    const action = btn.dataset.action;

    if (action === 'add') { addItem(btn.dataset.list); return; }

    if (['up', 'down', 'remove'].includes(action)) {
      const list = btn.dataset.list, i = +btn.dataset.index, arr = data[list];
      if (action === 'remove') {
        const it = arr[i] || {};
        const label = it.name || it.title || 'cet élément';
        if (!confirm(`Supprimer « ${label} » ? Cette action est définitive.`)) return;
        arr.splice(i, 1);
      }
      else if (action === 'up' && i > 0) { [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; }
      else if (action === 'down' && i < arr.length - 1) { [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]]; }
      markDirty(); render(); return;
    }

    if (action === 'cover-remove') { data.games[+btn.dataset.index].image = ''; markDirty(); render(); return; }
    if (action === 'clip-img-remove') {
      data.clips[+btn.dataset.index].images.splice(+btn.dataset.img, 1); markDirty(); render(); return;
    }
    if (action === 'clip-img-url') {
      const url = prompt('Colle l\'URL de l\'image :');
      if (url && url.trim()) { const c = data.clips[+btn.dataset.index]; (c.images = c.images || []).push(url.trim()); markDirty(); render(); }
      return;
    }

    if (action === 'ai-copy') {
      copyText(AI_PROMPT, document.getElementById('aiPrompt'));
      return;
    }
    if (action === 'ai-load') {
      const ta = document.getElementById('aiPaste');
      const raw = ta ? ta.value.trim() : '';
      if (!raw) { toast('Colle d\'abord le contenu généré par l\'IA', 'err'); return; }
      try {
        applyContent(parseContentSource(raw));
        toast('Contenu chargé — vérifie puis publie', 'ok');
      } catch (err) { toast('Contenu illisible — vérifie d\'avoir tout collé', 'err'); }
      return;
    }
  });

  // Uploads (change sur file inputs)
  main.addEventListener('change', async (e) => {
    const el = e.target;
    if (el.type !== 'file' || !el.files || !el.files.length) return;
    const action = el.dataset.action;
    try {
      if (action === 'cover') {
        const url = await compressImage(el.files[0], 1400);
        data.games[+el.dataset.index].image = url; markDirty(); render();
      } else if (action === 'clip-imgs') {
        const c = data.clips[+el.dataset.index]; c.images = c.images || [];
        for (const f of el.files) c.images.push(await compressImage(f, 1600));
        markDirty(); render();
        toast(el.files.length + ' image(s) ajoutée(s)', 'ok');
      }
    } catch (err) { toast('Image illisible', 'err'); }
  });

  /* ---------- DRAG & DROP : images + réordonnancement ---------- */
  let dragCtx = null; // { list, from } pendant un réordonnancement

  function dtHasFiles(dt) {
    if (!dt || !dt.types) return false;
    for (let i = 0; i < dt.types.length; i++) if (dt.types[i] === 'Files') return true;
    return false;
  }
  function clearDragMarks() {
    main.querySelectorAll('.dragging, .drag-over, .dropzone-hover')
      .forEach(el => el.classList.remove('dragging', 'drag-over', 'dropzone-hover'));
  }

  main.addEventListener('dragstart', (e) => {
    const handle = e.target.closest('[data-drag-handle]');
    if (!handle) return;
    const item = handle.closest('[data-list]');
    if (!item) return;
    dragCtx = { list: item.dataset.list, from: +item.dataset.index };
    e.dataTransfer.effectAllowed = 'move';
    try { e.dataTransfer.setData('text/plain', 'reorder'); } catch (_) {}
    item.classList.add('dragging');
  });

  main.addEventListener('dragend', () => { dragCtx = null; clearDragMarks(); });

  main.addEventListener('dragover', (e) => {
    if (dtHasFiles(e.dataTransfer)) {
      const dz = e.target.closest('[data-drop-cover],[data-drop-clip]');
      if (dz) { e.preventDefault(); dz.classList.add('dropzone-hover'); }
      return;
    }
    if (dragCtx) {
      const item = e.target.closest('[data-list]');
      if (item && item.dataset.list === dragCtx.list) {
        e.preventDefault();
        main.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
        if (+item.dataset.index !== dragCtx.from) item.classList.add('drag-over');
      }
    }
  });

  main.addEventListener('dragleave', (e) => {
    const dz = e.target.closest('[data-drop-cover],[data-drop-clip]');
    if (dz && !dz.contains(e.relatedTarget)) dz.classList.remove('dropzone-hover');
  });

  main.addEventListener('drop', async (e) => {
    const files = e.dataTransfer.files;
    // 1) dépôt d'images sur une zone
    if (files && files.length) {
      const cover = e.target.closest('[data-drop-cover]');
      const clipz = e.target.closest('[data-drop-clip]');
      const imgs = [].filter.call(files, f => f.type.indexOf('image/') === 0);
      if (cover) {
        e.preventDefault(); clearDragMarks();
        if (!imgs.length) { toast('Ce fichier n\'est pas une image', 'err'); return; }
        try { data.games[+cover.dataset.dropCover].image = await compressImage(imgs[0], 1400); markDirty(); render(); }
        catch (_) { toast('Image illisible', 'err'); }
        return;
      }
      if (clipz) {
        e.preventDefault(); clearDragMarks();
        if (!imgs.length) { toast('Aucune image dans le dépôt', 'err'); return; }
        const c = data.clips[+clipz.dataset.dropClip]; c.images = c.images || [];
        try {
          for (const f of imgs) c.images.push(await compressImage(f, 1600));
          markDirty(); render(); toast(imgs.length + ' image(s) ajoutée(s)', 'ok');
        } catch (_) { toast('Image illisible', 'err'); }
        return;
      }
      return;
    }
    // 2) réordonnancement d'un item
    if (dragCtx) {
      const item = e.target.closest('[data-list]');
      if (item && item.dataset.list === dragCtx.list) {
        e.preventDefault();
        moveItem(dragCtx.list, dragCtx.from, +item.dataset.index);
        dragCtx = null; markDirty(); render();
      }
    }
  });

  function moveItem(list, from, to) {
    const arr = data[list];
    if (from === to || from < 0 || from >= arr.length || to < 0 || to >= arr.length) return;
    const [it] = arr.splice(from, 1);
    arr.splice(to, 0, it);
  }

  // Empêche le navigateur d'ouvrir une image lâchée en dehors d'une zone de dépôt
  ['dragover', 'drop'].forEach(evt => window.addEventListener(evt, (e) => {
    if (dtHasFiles(e.dataTransfer) && !e.target.closest('[data-drop-cover],[data-drop-clip]')) {
      e.preventDefault();
    }
  }));

  /* ---------- INDICATEUR DE POIDS ---------- */
  function updateSize() {
    const el = $('sizeState'); if (!el) return;
    let bytes;
    try { bytes = new Blob([JSON.stringify(data)]).size; }
    catch (_) { bytes = JSON.stringify(data).length; }
    const mb = bytes / 1048576;
    el.textContent = mb >= 1 ? mb.toFixed(1) + ' Mo' : Math.max(1, Math.round(bytes / 1024)) + ' Ko';
    const heavy = mb > 3;
    el.classList.toggle('warn', heavy);
    el.title = heavy
      ? 'Fichier lourd (surtout des images). Pense à utiliser des URLs d\'images plutôt que des uploads.'
      : 'Poids estimé de contenu.js';
  }

  function addItem(list) {
    if (list === 'stats') data.stats.push({ name: '', value: 0, suffix: '', type: 'number' });
    else if (list === 'games') data.games.push({ name: '', icon: 'model', role: '', desc: '', visits: '', image: '' });
    else if (list === 'clips') data.clips.push({ title: '', tags: [], images: [] });
    markDirty(); render();
    // Met le nouvel élément en vue et place le curseur dans son premier champ
    const items = main.querySelectorAll('[data-list="' + list + '"]');
    const last = items[items.length - 1];
    if (last) {
      last.scrollIntoView({ block: 'center' });
      const inp = last.querySelector('input, textarea');
      if (inp) inp.focus();
    }
  }

  /* ============================================================
     TOPBAR : aperçu / télécharger / importer / reset
     ============================================================ */
  $('btnPreview').addEventListener('click', () => {
    saveDraft();
    window.open('index.html?preview=1', '_blank');
  });

  $('btnDownload').addEventListener('click', () => {
    saveDraft();
    const header = '/* ============================================================\n'
      + '   contenu.js — genere par le backoffice\n'
      + '   Remplace ce fichier en ligne pour publier tes modifs.\n'
      + '   ============================================================ */\n';
    const body = 'window.SITE_CONTENT = ' + JSON.stringify(data, null, 2) + ';\n';
    const blob = new Blob([header + body], { type: 'text/javascript' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'contenu.js';
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(a.href);
    needsPublish = false; updatePublishState();
    toast('contenu.js téléchargé — remets-le en ligne pour publier', 'ok');
  });

  $('btnImport').addEventListener('click', () => $('importFile').click());
  $('importFile').addEventListener('change', (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        applyContent(parseContentSource(reader.result));
        toast('Contenu importé', 'ok');
      } catch (err) { toast('Fichier illisible (attendu : contenu.js)', 'err'); }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  $('btnReset').addEventListener('click', () => {
    if (!confirm('Réinitialiser vers le dernier contenu publié ? Tes modifs non téléchargées seront perdues.')) return;
    localStorage.removeItem(DRAFT_KEY);
    data = deepCopy(SEED); ensureShape(data);
    needsPublish = false;
    saveDraft(); render(); updatePublishState();
    toast('Réinitialisé', 'ok');
  });

  // Garde-fou : prévient avant de quitter s'il reste des modifs non publiées
  window.addEventListener('beforeunload', (e) => {
    if (needsPublish) { e.preventDefault(); e.returnValue = ''; }
  });

  // Reconnexion automatique si session déjà ouverte (tout est défini ici)
  if (ssGet(SESSION_KEY) === '1') openApp();
})();
