/* =========================================================
   PROJETS DU PORTFOLIO — c'est le seul fichier à modifier
   pour ajouter / changer un projet. Toutes les versions du
   site (et les filtres par semestre) se mettent à jour seules.

   Ajouter une SAÉ : copie un bloc { ... }, colle-le dans la
   liste "sae" et remplis les champs. L'ordre n'a pas
   d'importance : le site trie du plus récent au plus ancien.

   Champs :
     code        "SAÉ4.01"
     semestre    4            (nombre)
     titre       titre officiel de la SAÉ
     competence  1 à 5        (couleur + libellé)
     resume      1 ou 2 phrases, écrites simplement
     tech        liste d'outils
     page        lien vers la page détaillée (ex : "S4/sae-401.html")
     code_source lien GitHub (facultatif)
     statut      'terminé' (par défaut) ou 'en cours'
                 → "En cours" s'affiche en vert, "Terminé" en couleur d'accent

   Sur la page d'accueil, le carrousel montre les 6 SAÉ les plus
   récentes ; toutes les autres restent dans "Voir toutes les SAÉ".
   ========================================================= */
window.PORTFOLIO = {
    competences: {
        1: 'Administrer',
        2: 'Connecter',
        3: 'Programmer',
        4: 'Sécuriser',
        5: 'Surveiller'
    },

    sae: [
        /* ===== Modèle pour le S4 / S5 (retire les symboles de commentaire pour l'activer) =====
        {
            code: 'SAÉ4.01', semestre: 4, competence: 4,
            titre: '[Titre de la SAÉ]',
            resume: '[Ce que tu as fait, en une ou deux phrases.]',
            tech: ['[Outil 1]', '[Outil 2]'],
            page: 'S4/sae-401.html',
            code_source: '',
            statut: 'en cours'
        },
        */
        {
            code: 'SAÉ3.02', semestre: 3, competence: 3,
            titre: 'Développer des applications communicantes',
            resume: 'Une messagerie anonyme basée sur le routage en oignon, avec une chaîne de routeurs virtuels.',
            tech: ['Python', 'Client/serveur', 'Routage en oignon'],
            page: 'S3/sae-302.html',
            code_source: 'https://github.com/DrKNath/SAE3.02'
        },
        {
            code: 'SAÉ3.01', semestre: 3, competence: 2,
            titre: 'Mettre en œuvre un système de transmission',
            resume: 'Une prise connectée pilotée depuis une page web : ESP32 d\'un côté, Raspberry Pi de l\'autre.',
            tech: ['ESP32', 'Raspberry Pi', 'MQTT', 'Flask'],
            page: 'S3/sae-301.html',
            code_source: 'https://github.com/DrKNath/SAE3.01'
        },
        {
            code: 'SAÉ2.04', semestre: 2, competence: 1, competences_texte: 'Compétences 1, 2 et 3',
            titre: 'Projet intégratif',
            resume: 'Un réseau local complet, de la téléphonie sur IP, des données remontées sur un broker et affichées sur le web.',
            tech: ['Routage', 'ToIP', 'MQTT', 'Web'],
            page: 'S2/sae-204.html',
            code_source: 'https://github.com/DrKNath/SAE2.04'
        },
        {
            code: 'SAÉ2.03', semestre: 2, competence: 3,
            titre: 'Mettre en place une solution informatique',
            resume: 'Une application web Django reliée à une base de données, derrière un reverse proxy Nginx.',
            tech: ['Python', 'Django', 'MariaDB', 'Nginx'],
            page: 'S2/sae-203.html',
            code_source: 'https://github.com/Lucas-hrl/SAE2.03'
        },
        {
            code: 'SAÉ2.02', semestre: 2, competence: 2,
            titre: 'Mesurer et caractériser un signal ou un système',
            resume: 'Une web radio portable à base d\'ESP32 et d\'un convertisseur numérique-analogique.',
            tech: ['ESP32', 'FFT', 'MQTT'],
            page: 'S2/sae-202.html'
        },
        {
            code: 'SAÉ2.01', semestre: 2, competence: 1,
            titre: 'Construire un réseau',
            resume: 'Un petit réseau monté de A à Z : plan d\'adressage, VLAN, routage et ACL.',
            tech: ['VLAN', 'ACL', 'Debian', 'GNS3'],
            page: 'S2/sae-201.html',
            code_source: 'https://github.com/DrKNath/SAE2.01'
        },
        {
            code: 'SAÉ1.05', semestre: 1, competence: 3,
            titre: 'Traiter des données',
            resume: 'Un programme Python qui fouille un dossier ou un disque pour trouver les fichiers les plus lourds.',
            tech: ['Python', 'PowerShell'],
            page: 'S1/sae-105.html',
            code_source: 'https://github.com/DrKNath/SAE1.05'
        },
        {
            code: 'SAÉ1.04', semestre: 1, competence: 3,
            titre: 'Se présenter sur Internet',
            resume: 'Mon premier CV web, en HTML/CSS.',
            tech: ['HTML', 'CSS'],
            page: 'S1/sae-104.html'
        },
        {
            code: 'SAÉ1.03', semestre: 1, competence: 2,
            titre: 'Découvrir un dispositif de transmission',
            resume: 'Analyse de la couverture Wi-Fi d\'un bâtiment et réalisation d\'une heat-map.',
            tech: ['Wi-Fi', 'Contrôleur Wi-Fi'],
            page: 'S1/sae-103.html'
        },
        {
            code: 'SAÉ1.02', semestre: 1, competence: 1,
            titre: 'S\'initier aux réseaux informatiques',
            resume: 'Le réseau d\'une entreprise avec plusieurs succursales et un service DHCP.',
            tech: ['Debian', 'DHCP', 'Routeur', 'Switch', 'EVE-NG'],
            page: 'S1/sae-102.html'
        },
        {
            code: 'SAÉ1.01', semestre: 1, competence: 1,
            titre: 'Hygiène informatique et cybersécurité',
            resume: 'Présentation d\'une technologie d\'Internet, de ses avantages et de ses risques.',
            tech: ['Cybersécurité', 'Veille'],
            page: 'S1/sae-101.html'
        }
    ],

    /* Projets perso / homelab : même principe */
    perso: [
        {
            code: 'perso/proxmox', statut: 'en cours', competence: 4,
            titre: 'Cluster Proxmox & auto-hébergement',
            resume: 'Un cluster Proxmox VE de plusieurs nœuds, monté avec des vieux PC récupérés, plus un serveur TrueNAS. J\'y héberge DNS, VPN, reverse proxy, domotique…',
            tech: ['Proxmox VE', 'LXC', 'TrueNAS', 'Pi-hole', 'VPN'],
            page: 'perso/proxmox.html'
        }
        /* ===== Modèle pour un autre projet perso =====
        ,{
            code: 'perso/[nom]', statut: 'terminé', competence: 3,
            titre: '[Titre]',
            resume: '[Description courte]',
            tech: ['[Outil]'],
            page: 'perso/[page].html'
        }
        */
    ]
};
