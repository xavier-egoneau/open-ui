# Agent Workflow

## Intention

Open UI vise des resultats : l'agent doit comprendre le design system, modifier au bon niveau, reutiliser les composants existants, creer seulement quand c'est justifie, puis verifier les impacts.

## Contrat de travail

Pour toute demande utilisateur, l'agent suit cette sequence :

1. Comprendre l'intention produit, pas seulement les mots.
2. Cartographier les composants/pages/tokens concernes.
3. Chercher une reutilisation ou une variante existante avant de creer.
4. Choisir le niveau de modification : page, instance, composant, token ou convention.
5. Annoncer les impacts si le changement est transversal.
6. Modifier peu de fichiers, mais les bons.
7. Verifier avec les scripts disponibles.
8. Rendre un bilan clair : changement, impact, verification, risques.

## Regles fortes

- Ne pas patcher une page si le besoin concerne un composant reutilise.
- Ne pas creer un nouveau composant si une variante ou composition existante suffit.
- Ne pas modifier un token sans annoncer l'impact transversal probable.
- Ne pas casser le design system pour satisfaire un cas local.
- Ne pas confondre maquette/esquisse et composant canonique.

## Creation

Creer est legitime dans deux cas :

- nouveau composant canonique utile au design system ;
- esquisse ou maquette exploratoire explicitement marquee comme telle.

Un composant canonique doit avoir JSON, Twig, Markdown et SCSS si necessaire. Une esquisse peut etre plus libre, mais ne doit pas etre presentee comme composant stable.

## Verifications minimales

- `npm run validate`
- `npm run list` si la cartographie doit etre relue
- `npm run impact <component>` si un composant est touche
- `npm run lint:scss` si SCSS touche
- `npm run build` si rendu/imports/pages touches

## Questions a resoudre

- Comment l'agent doit-il arbitrer entre modification locale et nouvelle variante ?
- Quel format de bilan standard adopter apres chaque modification ?
- Comment integrer une critique visuelle ou capture navigateur dans le workflow ?
- Quand bb9 doit-il entrer dans la boucle agentique Open UI ?
- Comment faire travailler plusieurs agents sans perdre l'integrite du design system ?
