# Site Fht — Portfolio Roblox

Portfolio statique d'un builder / level designer Roblox, avec un backoffice sans code
pour modifier le contenu (builds, galeries, stats, textes, liens) et le publier en un clic.

**En ligne :** https://devfht.github.io/de_fht/v2/
**Backoffice :** https://devfht.github.io/de_fht/v2/admin.html

## Structure

```
v2/
├── index.html          Le site public (structure seule)
├── admin.html          Le backoffice (structure seule)
├── contenu.js          ← LE CONTENU DU SITE (seul fichier modifié à chaque mise à jour)
├── img/                Images envoyées depuis le backoffice
│   └── thumb/          Vignettes des cartes de galerie (générées)
└── assets/
    ├── css/
    │   ├── theme.css    Variables, palette, base (partagé par les 2 pages)
    │   ├── site.css     Styles du site public
    │   └── admin.css    Styles du backoffice
    └── js/
        ├── site.js      Rendu du site depuis contenu.js
        └── admin.js     Logique du backoffice (édition + publication)
```

Le site fonctionne **sans serveur ni build** : HTML/CSS/JS statique, chemins relatifs.
Les images du portfolio d'origine sont référencées via `../` (racine du dépôt).

## Modifier le contenu (sans code)

1. Ouvrir **`admin.html`**, entrer le mot de passe.
2. Éditer les sections du menu de gauche : **Identité, Statistiques, Builds,
   Galerie, Commissions, Pied de page**. Le brouillon est enregistré automatiquement
   dans le navigateur.
3. Cliquer **↗ Aperçu** pour voir le rendu réel.
4. Cliquer **⇧ Publier en ligne** → le site est à jour en ~1 minute.

La pastille de la barre du haut indique l'état : **● À publier** (modifs en attente)
ou **✓ Publié**. Le bouton **⤓ Télécharger** sert de sauvegarde locale du fichier.

### Images

Glisser-déposer une image sur la zone d'un build ou d'une galerie. Elle est
redimensionnée et compressée automatiquement (couverture 900 px, image de galerie
1400 px, vignette de carte 700 px).

À la publication, les images sont **envoyées comme fichiers séparés** dans `img/`
et `contenu.js` ne garde que leur chemin — il reste ainsi à quelques kilo-octets.
Le tout part dans **un seul commit** : en cas d'erreur, rien n'est publié et le
brouillon reste intact.

Pour renvoyer vers un jeu jouable, utiliser le champ **Lien du jeu Roblox** d'un
build (pas les images d'une galerie).

### Générer le contenu avec une IA

La section **Assistant IA** fournit un prompt décrivant le format exact, à copier
dans une IA. Coller sa réponse dans « Charger le résultat » (ou l'enregistrer en
`contenu.js` et utiliser « Importer… »). Vérifier avec « Aperçu » avant de publier.
Les images ne passent pas par l'IA.

## Publication en un clic

Le bouton **⇧ Publier en ligne** écrit directement dans le dépôt GitHub via son API.
Il faut un jeton, à créer **une seule fois** (section *Publication* du backoffice) :

1. github.com/settings/personal-access-tokens/new
2. **Repository access** → Only select repositories → `devfht/de_fht`
3. **Permissions** → Repository permissions → **Contents** → *Read and write*
4. Coller le jeton dans la section *Publication* → **Enregistrer** → **Tester la connexion**

Le dépôt cible est défini par la constante `GH` en haut de `assets/js/admin.js`
(à modifier si le site déménage).

## Déploiement

Héberger le **dossier complet** (avec `assets/` et `img/`) sur n'importe quel
hébergeur statique : GitHub Pages (actuel), Netlify, Vercel, Cloudflare Pages ou FTP.

## Configuration

| Réglage | Où |
|---|---|
| **Mot de passe du backoffice** | `assets/js/admin.js`, constante `ADMIN_PASSWORD` |
| **Dépôt de publication** | `assets/js/admin.js`, constante `GH` |
| **Formulaire de devis** | Automatique : envoie à l'email de la section *Identité* via FormSubmit |
| **Liens Discord / Roblox / Email / X** | Backoffice → section *Identité* |

Le formulaire utilise [FormSubmit](https://formsubmit.co) : aucune inscription.
À la toute première demande, FormSubmit envoie un mail de confirmation à l'adresse
renseignée — cliquer le lien une fois active l'envoi définitivement.

## Notes techniques

- **Cache** : GitHub Pages met `contenu.js` en cache 10 minutes. La publication
  réécrit donc le numéro de version dans `index.html` (`contenu.js?v=…`) pour que la
  mise à jour soit visible immédiatement. Les autres fichiers portent un `?v=`
  à incrémenter à la main quand on les modifie.
- **Aperçu** : `index.html?preview=1` affiche le brouillon du navigateur au lieu du
  contenu publié.

## Limites connues

- **Le mot de passe est une porte, pas une sécurité forte** : tout est côté navigateur,
  donc contournable. Garder l'URL de `admin.html` discrète.
- **Le jeton GitHub est stocké dans le navigateur** (`localStorage`), qui est partagé
  par toutes les pages de `devfht.github.io`. Choix assumé pour la simplicité ; le jeton
  se révoque à tout moment depuis GitHub → Settings → Developer settings.
- **Le contenu importé est exécuté** pour tolérer les formats approximatifs des IA :
  ne coller que du contenu dont on connaît la provenance.
- **Le formulaire n'a pas de captcha** : en cas de spam, réactiver la protection en
  retirant `_captcha: 'false'` dans `assets/js/site.js`.
