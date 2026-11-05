// Script partagé du portfolio — à lier dans toutes les pages.
// Page d'accueil :  <script src="script.js"></script>
// Sous-pages (S1/, S2/, S3/, perso/) : <script src="../script.js"></script>

(function () {
    // --- Thème clair / sombre (appliqué au plus tôt pour éviter un flash) ---
    const root = document.documentElement;
    root.classList.add('js');
    try {
        const saved = localStorage.getItem('theme');
        if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
    } catch (e) { /* stockage indisponible : on suit le système */ }
})();

document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;

    // --- Bouton thème ---
    const themeBtn = document.querySelector('.theme-toggle');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = () => root.getAttribute('data-theme') || (systemDark.matches ? 'dark' : 'light');
    // L'icône lune/soleil dépend de data-theme : on le fixe toujours
    root.setAttribute('data-theme', currentTheme());

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const next = currentTheme() === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) { /* ignoré */ }
        });
    }

    // --- Menu mobile ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        const setOpen = (open) => {
            navMenu.classList.toggle('active', open);
            navToggle.classList.toggle('active', open);
            navToggle.setAttribute('aria-expanded', String(open));
        };
        navToggle.addEventListener('click', () => setOpen(!navMenu.classList.contains('active')));
        navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    }

    // --- Barre de navigation, progression, retour en haut ---
    const navbar = document.querySelector('.navbar');
    const progress = document.querySelector('.scroll-progress');
    const backToTop = document.querySelector('.back-to-top');

    const onScroll = () => {
        const y = window.scrollY;
        if (navbar) navbar.classList.toggle('scrolled', y > 40);
        if (backToTop) backToTop.classList.toggle('visible', y > 600);
        if (progress) {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (backToTop) {
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // --- Lien actif dans le menu selon la section visible ---
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"], .side-nav a[href^="#"]');
    if (navLinks.length && 'IntersectionObserver' in window) {
        const byId = {};
        navLinks.forEach(link => { byId[link.getAttribute('href').slice(1)] = link; });
        const sections = Object.keys(byId).map(id => document.getElementById(id)).filter(Boolean);

        const spy = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                navLinks.forEach(l => l.classList.remove('active'));
                const link = byId[entry.target.id];
                if (link) link.classList.add('active');
            });
        }, { rootMargin: '-45% 0px -50% 0px' });

        sections.forEach(s => spy.observe(s));
    }

    // --- Projets : générés à partir de data/projets.js ---
    renderProjects();

    // --- Apparition douce des blocs au défilement ---
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    io.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -8% 0px' });
        revealEls.forEach(el => io.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('in-view'));
    }

    // --- Sélecteur de palette (uniquement en mode test : ?palette=...) ---
    const PALETTES = [
        { id: 'violet', name: '1 · Violet nuit', color: 'linear-gradient(135deg,#2A1E4D,#8B7CC7)' },
        { id: 'caramel', name: '2 · Caramel', color: 'linear-gradient(135deg,#3A2418,#A88462)' },
        { id: 'olive', name: '3 · Olive', color: 'linear-gradient(135deg,#1E3A2E,#6B7F67)' },
        { id: 'ocean', name: '4 · Nuit & ambre', color: 'linear-gradient(135deg,#1C2541,#5BC0DE 60%,#D97706)' },
        { id: 'foret', name: '5 · Forêt & laiton', color: 'linear-gradient(135deg,#1F2A1F,#8CA98C 60%,#B08D57)' },
        { id: 'lagon', name: '6 · Lagon & rouille', color: 'linear-gradient(135deg,#0F3D3E,#7FB3B8 60%,#C6601F)' },
        { id: 'framboise', name: '7 · Framboise', color: 'linear-gradient(135deg,#3B1B4F,#D6598F 60%,#FF6B6B)' },
        { id: 'ember', name: '8 · Indigo & orange', color: 'linear-gradient(135deg,#2D2B55,#6A5ACD 60%,#F4A62A)' },
        { id: 'slate', name: '9 · Ardoise & rose', color: 'linear-gradient(135deg,#1F2937,#64748B 60%,#EC4899)' }
    ];
    let testPalette = null;
    try { testPalette = sessionStorage.getItem('palette'); } catch (e) { /* ignoré */ }

    if (testPalette) {
        const inSub = /\/(S\d|perso)\//.test(location.pathname);
        const picker = document.createElement('div');
        picker.className = 'palette-picker';
        picker.setAttribute('role', 'group');
        picker.setAttribute('aria-label', 'Palette de test');
        picker.innerHTML = '<span class="pp-label">Palette :</span>';
        PALETTES.forEach(p => {
            const b = document.createElement('button');
            b.type = 'button';
            b.title = p.name;
            b.setAttribute('aria-label', p.name);
            b.style.setProperty('--sw', p.color);
            b.setAttribute('aria-pressed', String(p.id === testPalette));
            b.addEventListener('click', () => {
                root.setAttribute('data-palette', p.id);
                try { sessionStorage.setItem('palette', p.id); } catch (e) { /* ignoré */ }
                picker.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
            });
            picker.appendChild(b);
        });
        const DESIGNS = [['index.html', 'Carnet'], ['design-2-profil.html', 'Profil'], ['design-3-badge.html', 'Badge']];
        const here = location.pathname.split('/').pop() || 'index.html';
        if (!inSub) {
            const sep = document.createElement('span');
            sep.className = 'pp-label';
            sep.textContent = 'Design :';
            picker.appendChild(sep);
            DESIGNS.forEach(([href, label], i) => {
                const a = document.createElement('a');
                a.href = href;
                a.textContent = i + 1;
                a.title = label;
                a.className = 'pp-design' + (here === href ? ' current' : '');
                picker.appendChild(a);
            });
        }
        const back = document.createElement('a');
        back.href = (inSub ? '../' : '') + 'design-test.html';
        back.textContent = 'Comparer';
        picker.appendChild(back);
        document.body.appendChild(picker);
    }

    // --- Année du pied de page ---
    document.querySelectorAll('.current-year').forEach(el => { el.textContent = new Date().getFullYear(); });

    // --- Agrandissement des images au clic (lightbox) ---
    const zoomableImages = document.querySelectorAll('.image-SAE');

    if (zoomableImages.length > 0) {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.innerHTML =
            '<button class="lightbox-close" aria-label="Fermer">&times;</button>' +
            '<img class="lightbox-img" src="" alt="">' +
            '<p class="lightbox-caption"></p>';
        document.body.appendChild(overlay);

        const overlayImg = overlay.querySelector('.lightbox-img');
        const caption = overlay.querySelector('.lightbox-caption');
        const closeBtn = overlay.querySelector('.lightbox-close');

        const openLightbox = (img) => {
            overlayImg.src = img.src;
            overlayImg.alt = img.alt || '';
            caption.textContent = img.alt || '';
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            closeBtn.focus();
        };

        const closeLightbox = () => {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        zoomableImages.forEach(img => {
            img.setAttribute('tabindex', '0');
            img.addEventListener('click', () => openLightbox(img));
            img.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(img); }
            });
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target === closeBtn) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
    }
});


/* =========================================================
   Rendu des projets à partir de window.PORTFOLIO (data/projets.js)
   Un conteneur <div data-projects="sae|perso" data-layout="cards|groups">
   se remplit tout seul. <div data-filters="sae"> crée les filtres.
   ========================================================= */
function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

// Année scolaire d'un semestre (S1-S2 = 1re année, etc.)
const ANNEES = { 1: '2024 — 2025', 2: '2025 — 2026', 3: '2026 — 2027' };
const anneeDe = sem => Math.ceil(sem / 2);

function renderProjects() {
    const data = window.PORTFOLIO;
    if (!data) return;
    const comp = data.competences || {};
    const sae = (data.sae || []).slice().sort((a, b) => b.semestre - a.semestre || b.code.localeCompare(a.code, 'fr', { numeric: true }));
    const dernierSem = sae.length ? sae[0].semestre : 0;

    const badge = p => esc(p.competences_texte || ('Compétence ' + p.competence + (comp[p.competence] ? ' · ' + comp[p.competence] : '')));
    const tech = p => (p.tech || []).map(t => '<span>' + esc(t) + '</span>').join('');
    const links = (p, plus) =>
        (p.code_source ? '<a href="' + esc(p.code_source) + '" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> Code</a>' : '') +
        '<a href="' + esc(p.page) + '" class="more">' + plus + ' <i class="fas fa-arrow-right"></i></a>';
    const isNew = p => p.semestre && p.semestre === dernierSem;

    // Carte (design "Carnet")
    const card = (p, kind) => '<article class="project-card reveal" data-semestre="S' + (p.semestre || '') + '" data-competence="' + (p.competence || '') + '">' +
        '<div class="project-content">' +
            '<div class="project-top"><span class="project-code">' + esc(p.code) + '</span>' +
                (isNew(p) ? '<span class="tag-new">nouveau !</span>' : '') +
                '<span class="project-sem">' + (kind === 'sae' ? 'Semestre ' + p.semestre : esc(p.etat || 'Perso')) + '</span></div>' +
            '<h3><a href="' + esc(p.page) + '">' + esc(p.titre) + '</a></h3>' +
            '<span class="project-badge">' + (kind === 'sae' ? badge(p) : 'Homelab') + '</span>' +
            '<p>' + esc(p.resume) + '</p>' +
            '<div class="project-tech">' + tech(p) + '</div>' +
            '<div class="project-links">' + links(p, kind === 'sae' ? 'Voir le projet' : 'En savoir plus') + '</div>' +
        '</div></article>';

    // Ligne (designs "Profil" et "Badge") : regroupée par semestre
    const row = (p, kind) => '<article class="project-row reveal" data-semestre="S' + (p.semestre || '') + '" data-competence="' + (p.competence || '') + '">' +
        '<span class="row-dot" aria-hidden="true"></span>' +
        '<div class="row-main">' +
            '<div class="row-meta"><span class="project-code">' + esc(p.code) + '</span>' +
                '<span class="project-badge">' + (kind === 'sae' ? badge(p) : esc(p.etat || 'Perso')) + '</span>' +
                (isNew(p) ? '<span class="tag-new">nouveau !</span>' : '') + '</div>' +
            '<h3><a href="' + esc(p.page) + '">' + esc(p.titre) + '</a></h3>' +
            '<p>' + esc(p.resume) + '</p>' +
            '<div class="project-tech">' + tech(p) + '</div>' +
        '</div>' +
        '<div class="project-links">' + links(p, kind === 'sae' ? 'Détails' : 'En savoir plus') + '</div>' +
    '</article>';

    document.querySelectorAll('[data-projects]').forEach(box => {
        const kind = box.dataset.projects;
        const layout = box.dataset.layout || 'cards';
        const list = kind === 'sae' ? sae : (data.perso || []);
        if (layout === 'groups' && kind === 'sae') {
            const sems = [...new Set(list.map(p => p.semestre))];
            box.innerHTML = sems.map(s =>
                '<div class="sem-group" data-semestre="S' + s + '">' +
                    '<div class="sem-head"><span class="sem-num">S' + s + '</span><span class="sem-year">' + (ANNEES[anneeDe(s)] || '') + ' · ' + anneeDe(s) + (anneeDe(s) === 1 ? 'ʳᵉ' : 'ᵉ') + ' année</span></div>' +
                    '<div class="sem-items">' + list.filter(p => p.semestre === s).map(p => row(p, kind)).join('') + '</div>' +
                '</div>').join('');
        } else if (layout === 'groups') {
            box.innerHTML = list.map(p => row(p, kind)).join('');
        } else {
            box.innerHTML = list.map(p => card(p, kind)).join('');
        }
    });

    // Compteurs ("11 SAÉ réalisées"…)
    document.querySelectorAll('[data-count]').forEach(el => {
        el.textContent = (data[el.dataset.count] || []).length;
    });

    // Filtres par semestre (créés automatiquement : S5, S4… apparaîtront seuls)
    document.querySelectorAll('[data-filters]').forEach(bar => {
        const target = document.querySelector(bar.dataset.target || '[data-projects="sae"]');
        if (!target) return;
        const sems = [...new Set(sae.map(p => p.semestre))];
        const options = [['all', 'Tous', sae.length]].concat(sems.map(s => ['S' + s, 'Semestre ' + s, sae.filter(p => p.semestre === s).length]));
        bar.innerHTML = options.map(([f, label, n], i) =>
            '<button class="filter-btn' + (i === 0 ? ' active' : '') + '" type="button" data-filter="' + f + '" aria-pressed="' + (i === 0) + '">' + label + '<span class="count">' + n + '</span></button>').join('');
        bar.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const f = btn.dataset.filter;
                bar.querySelectorAll('.filter-btn').forEach(b => {
                    b.classList.toggle('active', b === btn);
                    b.setAttribute('aria-pressed', String(b === btn));
                });
                target.querySelectorAll('[data-semestre]').forEach(el => {
                    const show = f === 'all' || el.dataset.semestre === f;
                    el.classList.toggle('is-hidden', !show);
                    if (show) el.querySelectorAll('.reveal').forEach(r => r.classList.add('in-view'));
                    if (show) el.classList.add('in-view');
                });
            });
        });
    });
}
