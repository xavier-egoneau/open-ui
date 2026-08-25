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
5. Placer les sources HTML/CSS/JS autonomes dans `dev/sketches/<slug>/`. `public/sketches/<slug>/` est uniquement le rendu généré par Vite.
6. Réutiliser les tokens/patterns existants quand ça aide, mais ne pas brider l'exploration au point de tuer la recherche visuelle.
7. Vérifier le rendu réel au navigateur si une UI est produite : ouvrir la page, contrôler le contenu visible et prendre une capture.
8. Relire la capture comme un objet visuel, pas seulement le DOM : hiérarchie, rythme, densité, alignements, lisibilité, personnalité, responsive évident, impression générale.
9. Si la capture révèle un résultat faible, générique ou bancal, itérer directement sur HTML/CSS avant livraison tant que la correction reste bornée.
10. Livrer seulement après une passe `produire → screenshot → critique → correction` raisonnable, avec les limites explicites si la vision ou le navigateur est indisponible.
11. Terminer par une section : `À consolider si on garde cette direction`.

## Critères de livraison visuelle obligatoires

Une esquisse UI n'est livrable que si :

1. la page charge sans erreur bloquante ;
2. le contenu principal est visible dans le premier viewport ;
3. la navigation, le header ou une sidebar ne masquent pas le contenu ;
4. les classes structurelles HTML ont des règles CSS correspondantes ;
5. aucun texte parasite, contenu de debug ou bloc brut de code n'est visible ;
6. le screenshot montre clairement le cœur de l'interface, pas seulement le header, la navigation ou une sidebar ;
7. l'interface contient au moins trois éléments spécifiques au domaine produit, impossibles à remplacer sans changer l'app ;
8. l'utilisateur peut comprendre l'action ou la valeur principale dès le premier viewport ;
9. il n'y a pas de scroll horizontal ni de largeur rigide évidente qui casse le viewport.

Si la vision ou l'observation du screenshot décrit surtout la navigation, le header, la sidebar ou un écran vide, considérer le rendu comme échoué.

En cas d'échec : corriger, reprendre un screenshot, puis seulement livrer.

## Règles de processus

- Ne jamais répondre par un bloc complet HTML/CSS comme livrable final : écrire les sources dans `dev/sketches/<slug>/`, puis vérifier le rendu servi ou généré.
- Avant de designer, fixer rapidement la mini-spec : persona principal, cas d'usage prioritaire, écran livré, ton visuel, composants indispensables.
- Éviter le dashboard générique : le premier viewport doit raconter le produit, pas seulement afficher des cartes interchangeables.
- Exploration esthétique autorisée ; régression fonctionnelle interdite.
- La sortie finale doit être factuelle : fichiers créés, screenshot, ce qui est visible, limites exploratoires, verdict livré ou à corriger.

## Red flags bloquants

- screenshot dominé par la sidebar, le header ou la navigation ;
- page blanche, quasi vide ou contenu principal sous le fold ;
- classes HTML critiques absentes du CSS ;
- scroll horizontal ;
- header disproportionné ;
- cards empilées sans hiérarchie ;
- UI belle mais pas spécifique au produit ;
- aucun état utilisateur ou action visible.

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
