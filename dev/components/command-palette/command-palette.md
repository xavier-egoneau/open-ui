# Command Palette

## Usage

Palette de commande pour rechercher et lancer rapidement des actions globales. Elle convient aux interfaces denses, outils experts ou produits agentiques où l'utilisateur doit accéder vite à une page ou une action.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `showEmpty` | `checkbox` | `false` | Affiche l'état vide |
| `title` | `text` | `"Palette de commande"` | Titre du dialog |
| `subtitle` | `text` | texte d'aide | Sous-titre relié au dialog |
| `searchPlaceholder` | `text` | texte d'exemple | Placeholder du champ de recherche |
| `activeValue` | `text` | `"open-patient"` | Valeur de la commande active |
| `emptyTitle` | `text` | `"Aucune commande trouvée"` | Titre de l'état vide |
| `emptyText` | `text` | texte d'aide | Description de l'état vide |

## Accessibilité

- La palette utilise `role="dialog"` et `aria-modal="true"`.
- Le titre et le sous-titre sont reliés via `aria-labelledby` et `aria-describedby`.
- Les résultats utilisent `role="listbox"` et `role="option"` avec `aria-selected`.
- L'application doit gérer le focus initial, la navigation clavier, la fermeture avec Échap et le retour du focus au déclencheur.

## Exemples

### Exemple de base

```twig
{% include 'dev/components/command-palette/command-palette.twig' %}
```

### État vide

```twig
{% include 'dev/components/command-palette/command-palette.twig' with {
  showEmpty: true,
  emptyTitle: 'Aucune action',
  emptyText: 'Essayez un autre terme de recherche.'
} %}
```
