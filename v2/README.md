# Site Fht — Portfolio Roblox

Portfolio statique d'un développeur Roblox, avec un backoffice sans code pour
modifier le contenu (jeux, clips, stats, textes, liens) sans toucher au code.

## Structure

```
SiteFHT/
├── index.html          Le site public (structure seule)
├── admin.html          Le backoffice privé (structure seule)
├── contenu.js          ← LE CONTENU DU SITE (le seul fichier à remplacer)
└── assets/
    ├── css/
    │   ├── theme.css    Variables, palette, base (partagé par les 2 pages)
    │   ├── site.css     Styles du site public
    │   └── admin.css    Styles du backoffice
    └── js/
        ├── site.js      Rendu du site depuis contenu.js
        └── admin.js     Logique du backoffice
```

Le site fonctionne **sans serveur ni build** : c'est du HTML/CSS/JS statique.
Tous les chemins sont relatifs, donc on peut l'ouvrir directement ou l'héberger tel quel.

## Modifier le contenu (sans code)

1. Ouvrir **`admin.html`** dans un navigateur.
2. Entrer le mot de passe (voir plus bas).
3. Éditer les sections dans le menu de gauche : **Identité, Statistiques, Jeux,
   Clips, Commissions, Pied de page**. Le brouillon est sauvegardé automatiquement
   dans le navigateur.
4. Cliquer **↗ Aperçu** pour voir le rendu réel avec les modifs.
5. Cliquer **⤓ Télécharger contenu.js**.
6. Remplacer l'ancien `contenu.js` en ligne par celui qui vient d'être téléchargé,
   puis re-déployer. Les modifs sont publiées.

> `index.html` et les fichiers `assets/` ne changent jamais — seul `contenu.js`
> est remplacé à chaque mise à jour.

### Générer le contenu avec une IA

La section **Assistant IA** du backoffice fournit un prompt tout prêt (décrivant le
format exact) à copier dans une IA (ChatGPT, Claude…). L'IA renvoie un contenu que tu
**colles directement** dans la zone « Charger le résultat » (ou que tu enregistres en
`contenu.js` pour l'« Importer »). Vérifie toujours le rendu avec « Aperçu » avant de publier.
Les images ne passent pas par l'IA : ajoute-les dans les sections Jeux / Clips.

## Déploiement

Héberger le **dossier complet** (avec `assets/`) sur n'importe quel hébergeur statique :

- **Netlify / Vercel** : glisser-déposer le dossier, ou connecter un dépôt Git.
- **GitHub Pages**, **Cloudflare Pages**, ou tout hébergement classique (FTP) :
  déposer les fichiers en conservant l'arborescence.

## Configuration

| Réglage | Où |
|---|---|
| **Mot de passe du backoffice** | `assets/js/admin.js`, constante `ADMIN_PASSWORD` (défaut : `fht2026`) |
| **Formulaire de devis (Formspree)** | Backoffice → section *Commissions* → « Identifiant Formspree » |
| **Liens Discord / Roblox / X** | Backoffice → section *Identité* |

Pour le formulaire : créer un formulaire gratuit sur [formspree.io](https://formspree.io),
récupérer l'identifiant (ex. `xayzabcd` dans l'URL du formulaire) et le coller dans le backoffice.
Tant qu'il vaut `YOUR_FORM_ID`, le formulaire affiche une erreur au lieu d'envoyer.

## Limites connues

- **Le mot de passe est une porte, pas une sécurité forte** : tout étant côté
  navigateur, il est contournable par une personne technique. Garder l'URL de
  `admin.html` privée. Une vraie authentification nécessiterait un backend.
- **Les images uploadées sont intégrées à `contenu.js`** (encodées en base64,
  compressées automatiquement). Beaucoup d'images alourdissent le fichier ; pour
  de gros volumes, préférer des URLs d'images hébergées (bouton « + par URL » dans les clips).
