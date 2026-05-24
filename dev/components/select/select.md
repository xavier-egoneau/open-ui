# Select

## Usage
Liste déroulante avec flèche personnalisée. Gère placeholder, disabled, error et required.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `size` | `select` | `"md"` | Taille |
| `disabled` | `checkbox` | `false` | Désactivé |
| `required` | `checkbox` | `false` | Requis |
| `hasError` | `checkbox` | `false` | Erreur |
| `label` | `text` | `"Pays"` | Label |
| `placeholder` | `text` | `"Choisissez un pays"` | Placeholder |
| `helpText` | `text` | `""` | Texte d'aide |
| `errorMessage` | `text` | `"Veuillez sélectionner une option."` | Message d'erreur |
| `options` | `array` | `[{"value":"fr","label":"France"},{"value":"be","label":"Belgique"},{"value":"ch","label":"Suisse"},{"value":"ca","label":"Canada"}]` | Options |

## Accessibilité
Vérifier les labels, rôles ARIA, états désactivés/erreur et navigation clavier selon l’usage réel du composant.

## Exemples

### Exemple de base

```twig
{% include 'dev/components/select/select.twig' %}
```
