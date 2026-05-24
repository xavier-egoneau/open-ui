# Project Workspaces

## Intention

Open UI devra gerer plusieurs projets. Chaque projet pourra contenir des dizaines de pages, des centaines de composants et son propre design token set.

Cette capacite doit rester simple au depart : le modele doit etre clair avant l'interface.

## Contrat cible

Un projet Open UI doit pouvoir declarer :

- ses pages ;
- ses composants canoniques ;
- ses tokens ;
- ses assets ;
- ses regles locales ;
- ses composants herites ou partages.

Le workspace courant doit toujours etre explicite pour eviter qu'un agent modifie le mauvais projet.

## Frontiere projet / systeme

- Open UI fournit le moteur, les conventions et les scripts.
- Chaque projet fournit ses composants, pages, contenus et tokens.
- Les composants partages doivent etre identifies comme shared/canoniques.
- Les variantes locales doivent etre visibles et non confondues avec le systeme global.

## Questions a resoudre

- Quelle structure de dossiers adopter pour plusieurs projets ?
- Comment migrer `dev/` vers un workspace projet sans tout casser ?
- Comment mutualiser des composants entre projets ?
- Comment isoler les tokens par projet ?
- Comment faire une analyse d'impact multi-projet sans bruit excessif ?

## Option de structure possible

```text
projects/
  project-a/
    components/
    pages/
    assets/scss/
    tokens/
  project-b/
    components/
    pages/
    assets/scss/
    tokens/
```

A ne pas appliquer tant que le modele mono-projet n'est pas stabilise.
