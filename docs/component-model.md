# Component Model

## Intention

Open UI est un workspace de design system agent-first. Le modele composant doit permettre a un agent de comprendre quoi modifier, quoi reutiliser, quoi creer et quels impacts annoncer.

## Contrat

- `dev/` est la racine structurelle des sources du workspace. Le dépôt conserve uniquement `dev/.gitkeep` ; son contenu projet reste local et ignoré par Git.
- Un composant canonique vit dans `dev/components/[name]/`.
- Chaque composant a trois fichiers obligatoires : `[name].json`, `[name].twig`, `[name].md`.
- Le JSON est la source de verite des metadonnees, controles, relations et defaults exposables.
- Le Twig est le rendu, sans logique metier.
- Le Markdown explique l'usage, les props, l'accessibilite et les exemples.
- Le SCSS associe vit dans `dev/assets/scss/components/_[name].scss` et doit etre importe depuis `dev/assets/scss/style.scss`.
- Un composant doit etre reutilise avant d'etre recree.
- Modifier une page signifie souvent modifier un composant ou une configuration de composant, pas patcher la page directement.

## Hierarchie

- `atom` : element UI indivisible.
- `molecule` : composition d'atoms.
- `organism` : composition de molecules.
- `template` : structure de page sans contenu reel.
- `page` : instance avec contenu reel, dans `dev/pages/`.

La composition reste descendante : un atom n'inclut pas une molecule, un organism n'inclut pas un template.

## Relations JSON

- `parts` : sous-composant unique, editable sans dupliquer son schema canonique.
- `collections` : vraie liste editoriale ou repetable, explicitement marquee avec `kind: "list"`.
- `families` : reglages communs pour composants repetes non editoriaux.
- `instances` : occurrences concretes editables individuellement.
- `layoutGroups` : placement, grilles, lignes et groupes visuels.

## Questions a resoudre

- Jusqu'ou autoriser la profondeur de composition avant de complexifier l'analyse ?
- Faut-il stabiliser un schema JSON formel et versionne ?
- Comment declarer clairement les variantes experimentales vs canoniques ?
- Comment gerer un composant qui existe dans plusieurs projets avec variantes locales ?
- Faut-il renommer les controles pour mieux separer design, contenu et comportement ?
