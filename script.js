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
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
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

    // --- Filtres des projets SAÉ ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('#sae-grid .project-card');

    if (filterBtns.length && cards.length) {
        // Affiche le nombre de projets par filtre
        filterBtns.forEach(btn => {
            const f = btn.dataset.filter;
            const n = f === 'all' ? cards.length : document.querySelectorAll(`#sae-grid .project-card[data-semestre="${f}"]`).length;
            const count = document.createElement('span');
            count.className = 'count';
            count.textContent = n;
            btn.appendChild(count);
        });

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const f = btn.dataset.filter;
                filterBtns.forEach(b => {
                    b.classList.toggle('active', b === btn);
                    b.setAttribute('aria-pressed', String(b === btn));
                });
                cards.forEach(card => {
                    const show = f === 'all' || card.dataset.semestre === f;
                    card.classList.toggle('is-hidden', !show);
                    if (show) card.classList.add('in-view');
                });
            });
        });
    }

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
