---
description: Déclencher le tunnel maquette libre / esquisse exploratoire Open UI, hors design system canonique.
---

Utilise cette commande quand l'utilisateur veut explicitement une maquette libre, une exploration visuelle, un brouillon ou un test de direction sans intégrer immédiatement au design system.

## Intention

Produire une esquisse utile pour explorer une direction, pas un composant canonique. Le résultat peut être plus libre, mais doit rester visualisable, lisible et clairement séparé du design system stable.

## Protocole

1. Clarifier l'objectif exploratoire si nécessaire : direction visuelle, type de page/composant, public, contenu minimal, contrainte forte.
2. Charger `design-sketching` si la demande implique de la divergence créative ou plusieurs directions.
3. Annoncer que le travail est une esquisse hors DS canonique.
4. Ne pas modifier un composant canonique, un token global ou une convention partagée sans confirmation explicite.
5. Placer les fichiers HTML/CSS/JS autonomes dans `public/sketches/<slug>/`, jamais dans `dev/sketches/`.
6. Réutiliser les tokens/patterns existants quand ça aide, mais ne pas brider l'exploration au point de tuer la recherche visuelle.
7. Vérifier le rendu réel au navigateur si une UI est produite : ouvrir la page, contrôler le contenu visible et prendre une capture exploitable.
8. Relire la capture comme un objet visuel, pas seulement le DOM : hiérarchie, rythme, densité, alignements, lisibilité, personnalité, responsive évident, impression générale.
9. Appliquer les critères de livraison visuelle obligatoires :
   - le contenu principal est visible dans le premier viewport ;
   - la navigation, le header, la sidebar ou une modale ne masquent pas le cœur de l'interface ;
   - le screenshot montre clairement l'expérience métier principale, pas seulement un shell applicatif ;
   - les classes structurelles HTML ont des règles CSS correspondantes ;
   - aucun texte parasite, contenu de debug, page quasi vide ou scroll horizontal évident n'est visible ;
   - le rendu contient au moins trois éléments spécifiques au domaine produit, non interchangeables avec une app générique.
10. Considérer comme bloquant tout screenshot dominé par la navigation/sidebar/header, tout contenu principal sous le fold, toute divergence HTML/CSS structurelle, ou toute UI jolie mais générique qui ne raconte pas le produit.
11. Ne jamais livrer un `/open-ui-sketch` final sous forme de code dump en conversation : créer/modifier les fichiers dans `public/sketches/<slug>/`, puis vérifier le rendu réel.
12. Avant ou pendant la création, stabiliser une mini-spécification utile : persona principal, cas d'usage prioritaire, écran livré, ton visuel, composants indispensables.
13. En cas d'échec visuel, corriger HTML/CSS, reprendre un screenshot et relire à nouveau avant livraison. Exploration esthétique autorisée ; régression fonctionnelle interdite.
14. Livrer seulement après une passe `produire → screenshot → critique → correction` raisonnable, avec les limites explicites si la vision ou le navigateur est indisponible.
15. Terminer par une sortie factuelle : fichiers créés, preuve visuelle, ce qui est visible dans le premier viewport, limites assumées, verdict `livré visuellement validé` ou `non livrable à corriger`, puis `À consolider si on garde cette direction`.J’ai

## Sortie attendue

- ce qui a été esquissé ;
- où se trouve l'esquisse ;
- preuve visuelle si possible ;
- limites assumées du brouillon ;
- éléments à consolider : composants à extraire, variantes/tokens à créer, impacts à analyser, RGAA à reprendre.

## Anti-déclencheurs

- Ne pas utiliser cette commande pour une modification normale de page/composant.
- Ne pas transformer automatiquement l'esquisse en composant stable.
- Ne pas laisser l'esquisse polluer la liste canonique du design system sans décision utilisateur.
- Ne pas creer de nouveau sketch HTML autonome dans `dev/sketches/`.
