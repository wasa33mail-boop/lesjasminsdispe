LES JASMINS D'ISPE — site web
================================

CONTENU
- index.html        → la page (une seule page, défilement)
- styles.css         → tous les styles
- script.js          → menu mobile, animations, formulaire de contact
- images/            → vos photos, optimisées pour le web

METTRE EN LIGNE
Ce site est 100% statique : aucune installation, aucun serveur requis.
- Le plus simple : déposez le dossier complet sur Netlify, Vercel ou
  GitHub Pages (glisser-déposer sur netlify.com/drop fonctionne en 30 secondes).
- Vous pouvez aussi l'héberger chez un hébergeur classique (OVH, o2switch...)
  en envoyant ces fichiers par FTP dans le dossier racine de votre domaine.

À PERSONNALISER AVANT MISE EN LIGNE
1. Téléphone : remplacez "06 XX XX XX XX" (section Réserver) par votre numéro.
2. Liens Airbnb / Abritel : dans index.html, remplacez les deux href="#"
   de la section "Réserver" par les adresses réelles de vos annonces.
3. Carte : l'encart utilise une carte Google Maps centrée sur "Biscarrosse
   Plage du lac Ispe". Remplacez l'adresse dans l'URL de l'iframe (section
   Réserver) si vous voulez centrer sur votre adresse exacte.

LE FORMULAIRE DE CONTACT
Le site n'ayant pas de serveur, le formulaire ouvre la messagerie du
visiteur avec le message déjà rédigé, prêt à être envoyé à
contact@lesjasminsdispe.fr (modifiable dans script.js, ligne "mailto:").
C'est la solution la plus simple sans backend.

Si vous préférez que le message soit envoyé directement depuis le site
(sans ouvrir la messagerie du visiteur), deux options simples, gratuites :
- Hébergez sur Netlify et activez "Netlify Forms" (quelques lignes à ajouter)
- Ou utilisez un service comme Formspree.io (créez un compte, remplacez
  l'action du formulaire par l'URL qu'ils vous donnent)
Dites-moi laquelle vous préférez et je peux le configurer.

PHOTOS NON UTILISÉES
Toutes les photos que vous avez fournies n'ont pas forcément leur
équivalent thématique exact (ex : pas de photo de lac, golf en extérieur,
vélo). Le site n'affiche que vos photos réelles ; si vous en ajoutez
d'autres plus tard (lac, plage, golf, vélo...), je peux les intégrer.
