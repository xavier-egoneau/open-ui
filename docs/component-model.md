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

## Démarrage à vide

- `showcase/` appartient au moteur versionné et n'est pas généré par le workspace utilisateur.
- `dev/` peut ne contenir que `.gitkeep`, ou être momentanément absent : la cartographie et le Showcase doivent alors retourner zéro composant sans échouer.
- `dev/assets/scss/style.scss` devient nécessaire seulement lorsqu'un projet commence à définir ses styles ; le Showcase fournit une feuille vide avant sa création.
- `public/` n'est jamais un prérequis : `npm run build` le crée comme sortie générée.

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

## Contrôles de liste

Un contrôle `type: "array"` peut déclarer la forme humaine de chaque élément avec `item` :

```json
{
  "label": "Liens de navigation",
  "type": "array",
  "item": {
    "label": "Lien",
    "addLabel": "Ajouter un lien",
    "fields": {
      "text": { "label": "Libellé", "type": "text", "default": "Nouveau lien" },
      "href": { "label": "Destination", "type": "text", "default": "#" }
    }
  },
  "default": []
}
```

- `item.fields` décrit un objet répétable ; chaque clé devient un champ du Showcase.
- `item.type` décrit une liste de valeurs simples, par exemple du texte ou des nombres.
- Les types imbriqués acceptés sont `text`, `number`, `checkbox`, `select` et `color`.
- Si `item` manque mais que la liste contient déjà des valeurs, le Showcase tente d'en déduire la forme.
- Une liste vide sans schéma `item` conserve l'éditeur JSON comme repli, car sa structure ne peut pas être devinée sans risque.

## Questions a resoudre

- Jusqu'ou autoriser la profondeur de composition avant de complexifier l'analyse ?
- Faut-il stabiliser un schema JSON formel et versionne ?
- Comment declarer clairement les variantes experimentales vs canoniques ?
- Comment gerer un composant qui existe dans plusieurs projets avec variantes locales ?
- Faut-il renommer les controles pour mieux separer design, contenu et comportement ?
