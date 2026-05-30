---
description: Déclencher le tunnel maquette libre / esquisse exploratoire Open UI, hors design system canonique.
---
Applique le skill `open-ui` pour cette commande. Si le skill n'est pas deja charge, lis `.pi/skills/open-ui/SKILL.md` avant d'agir.

Arguments utilisateur : `$ARGUMENTS`

---

Utilise cette commande quand l'utilisateur veut explicitement une maquette libre, une exploration visuelle, un brouillon ou un test de direction sans intégrer immédiatement au design system.

## Intention

Produire une esquisse utile pour explorer une direction, pas un composant canonique. Le résultat peut être plus libre, mais doit rester visualisable, lisible et clairement séparé du design system stable.

## Protocole

1. Clarifier l'objectif exploratoire si nécessaire : direction visuelle, type de page/composant, public, contenu minimal, contrainte forte.
2. Charger `design-sketching` si la demande implique de la divergence créative ou plusieurs directions.
3. Annoncer que le travail est une esquisse hors DS canonique.
4. Ne pas modifier un composant canonique, un token global ou une convention partagée sans confirmation explicite.
5. Placer ou nommer l'esquisse de façon à signaler son statut brouillon/exploratoire.
6. Réutiliser les tokens/patterns existants quand ça aide, mais ne pas brider l'exploration au point de tuer la recherche visuelle.
7. Vérifier visuellement au navigateur si une UI est produite.
8. Terminer par une section : `À consolider si on garde cette direction`.

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