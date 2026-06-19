// Script partagé du portfolio — à lier dans toutes les pages.
// Page d'accueil :  <script src="script.js"></script>
// Pages SAÉ (S1/, S2/) : <script src="../script.js"></script>

document.addEventListener('DOMContentLoaded', () => {
    // --- Menu mobile (ouverture / fermeture) ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Referme le menu quand on clique sur un lien (pratique sur mobile)
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // --- Défilement doux pour les ancres internes (#section) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Ombre sur la barre de navigation au défilement ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 100);
        });
    }

    // --- Agrandissement des images au clic (lightbox) ---
    const zoomableImages = document.querySelectorAll('.image-SAE');

    if (zoomableImages.length > 0) {
        // L'overlay n'est créé qu'une seule fois et réutilisé pour chaque image
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML =
            '<button class="lightbox-close" aria-label="Fermer">&times;</button>' +
            '<img class="lightbox-img" src="" alt="">';
        document.body.appendChild(overlay);

        const overlayImg = overlay.querySelector('.lightbox-img');
        const closeBtn = overlay.querySelector('.lightbox-close');

        const openLightbox = (src, alt) => {
            overlayImg.src = src;
            overlayImg.alt = alt || '';
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // bloque le défilement de la page
        };

        const closeLightbox = () => {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        zoomableImages.forEach(img => {
            img.addEventListener('click', () => openLightbox(img.src, img.alt));
        });

        // Fermeture : clic sur le fond ou sur la croix
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target === closeBtn) closeLightbox();
        });

        // Fermeture : touche Échap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
    }
});
