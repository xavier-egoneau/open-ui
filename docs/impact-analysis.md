# Impact Analysis

## Intention

Open UI doit prevenir l'utilisateur avant et apres une modification importante : quels composants, pages, tokens et comportements risquent d'etre affectes.

L'objectif n'est pas seulement de trouver les fichiers touches, mais de comprendre le niveau juste de modification.

## Contrat

Avant modification, l'agent doit :

- identifier le composant, la page ou le token cible ;
- lister les composants qui dependent de cette cible ;
- lister les pages qui utilisent directement ou indirectement cette cible ;
- distinguer un changement local, composant, systeme ou token ;
- annoncer les impacts probables si la modification est transversale.

Apres modification, l'agent doit :

- relancer `npm run validate` ;
- relancer `npm run impact <component>` quand un composant est touche ;
- lancer `npm run build` si le rendu ou les imports changent ;
- signaler les pages et composants a relire visuellement ;
- mentionner les risques design system, accessibilite et regression.

## Niveaux d'impact

- `local` : changement limite a une page ou une instance.
- `component` : changement dans un composant reutilise.
- `system` : changement de pattern, convention ou structure.
- `token` : changement de variable design pouvant affecter toute l'UI.

## Sortie attendue pour l'utilisateur

```text
Impact: button
Niveau: component
Composants impactes: card, header-nav
Pages impactees: form
Verification: validate OK, build OK
Risque: changement visuel transversal sur les CTA
```

## Questions a resoudre

- Comment calculer les impacts indirects sur plusieurs niveaux de composition ?
- Comment relier les tokens SCSS aux composants qui les utilisent ?
- Comment detecter automatiquement les impacts visuels importants ?
- Faut-il stocker un index persistant ou recalculer a chaque commande ?
- Comment gerer les impacts entre plusieurs projets Open UI ?
