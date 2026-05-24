# Dropdown

## Usage
Composant dropdown polyvalent avec bouton déclencheur, menu flottant avec liste d'options, indicateur flèche, support states (default, hover, active, disabled, open/closed), placement (top/bottom, left/right), groupes d'options, séparateurs, et accessibilité clavier (ARIA, focus trap, escape). Inclut variante simple avec placeholder, variante searchable, et variante avec icônes.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `size` | `select` | `"md"` | Taille |
| `placement` | `select` | `"bottom-left"` | Position |
| `disabled` | `checkbox` | `false` | Désactivé |
| `searchable` | `checkbox` | `false` | Recherchable |
| `hasGroups` | `checkbox` | `false` | Avec groupes |
| `hasIcons` | `checkbox` | `false` | Avec icônes |
| `name` | `text` | `"dropdown-field"` | Nom du champ |
| `placeholder` | `text` | `"Sélectionnez une option"` | Placeholder |
| `searchPlaceholder` | `text` | `"Rechercher..."` | Placeholder recherche |
| `selectedValue` | `text` | `""` | Valeur sélectionnée |
| `options` | `array` | `[{"value":"opt1","label":"Option 1","disabled":false},{"value":"opt2","label":"Option 2","disabled":false},{"value":"opt3","label":"Option 3 (désactivée)","disabled":true},{"value":"opt4","label":"Option 4","disabled":false,"separator":true},{"value":"opt5","label":"Option 5","disabled":false}]` | Options |
| `groups` | `array` | `[{"title":"Catégorie A","options":[{"value":"cat-a-1","label":"Élément A1"},{"value":"cat-a-2","label":"Élément A2"}]},{"title":"Catégorie B","options":[{"value":"cat-b-1","label":"Élément B1"},{"value":"cat-b-2","label":"Élément B2","disabled":true}]}]` | Groupes d'options |

## Accessibilité
Vérifier les labels, rôles ARIA, états désactivés/erreur et navigation clavier selon l’usage réel du composant.

## Exemples

### Exemple de base

```twig
{% include 'dev/components/dropdown/dropdown.twig' %}
```
