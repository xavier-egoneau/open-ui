# Component Model

## Intention

Open UI est un workspace de design system agent-first. Le modele composant doit permettre a un agent de comprendre quoi modifier, quoi reutiliser, quoi creer et quels impacts annoncer.

## Contrat

- Un composant canonique vit dans `dev/components/[name]/`.
- Chaque composant a trois fichiers obligatoires : `[name].json`, `[name].twig`, `[name].md`.
- Le JSON est la source de verite des metadonnees, controles, relations et defaults exposables.
- Le Twig est le rendu, sans logique metier.
- Le Markdown explique l'usage, les props, l'accessibilite et les exemples.
- Le SCSS associe d'un composant vit dans `dev/assets/scss/components/_[name].scss` et doit etre importe depuis `dev/assets/scss/style.scss`.
- Le SCSS specifique a une page vit dans `dev/assets/scss/pages/_[name]-page.scss`; le dossier `components/` reste reserve aux blocs UI reutilisables.
- Un composant doit etre reutilise avant d'etre recree.
- Modifier une page signifie souvent modifier un composant ou une configuration de composant, pas patcher la page directement.

## Hierarchie

- `atom` : element UI indivisible.
- `molecule` : composition d'atoms.
- `organism` : composition de molecules.
- `template` : structure de page sans contenu reel.
- `page` : instance avec contenu reel, dans `dev/pages/`.

La composition reste descendante : un atom n'inclut pas une molecule, un organism n'inclut pas un template.

## Statut JSON

Un artefact JSON peut declarer un statut top-level :

```json
{
  "status": "canonical"
}
```

Statuts autorises :

- `canonical` : composant/page stable, reutilisable par defaut et soumis au contrat complet.
- `draft` : brouillon structure ou candidat de promotion, non reutilisable par defaut.
- `sketch` : exploration experimentale, normalement stockee dans `dev/sketches/` avec un manifeste `sketch.json`.

Compatibilite : dans `dev/components/`, l'absence de `status` vaut temporairement `canonical`. Les nouveaux composants doivent declarer `status: "canonical"`. Un `status: "sketch"` est interdit dans `dev/components/`.

## Relations JSON

- `parts` : sous-composant unique, editable sans dupliquer son schema canonique.
- `collections` : vraie liste editoriale ou repetable, explicitement marquee avec `kind: "list"`.
- `families` : reglages communs pour composants repetes non editoriaux.
- `instances` : occurrences concretes editables individuellement.
- `layoutGroups` : placement, grilles, lignes et groupes visuels.

## Questions a resoudre

- Jusqu'ou autoriser la profondeur de composition avant de complexifier l'analyse ?
- Faut-il stabiliser un schema JSON formel et versionne ?
- Comment declarer clairement les variantes experimentales a l'interieur d'un composant canonique ?
- Comment gerer un composant qui existe dans plusieurs projets avec variantes locales ?
- Faut-il renommer les controles pour mieux separer design, contenu et comportement ?
