# Select Custom

## Usage
Un bloc de sélection personnalisé stylisé (select natif redesigné) avec un apparence plus moderne, des coins arrondis ($radius-lg), une flèche personnalisée SVG, un focus visible avec outline primary, et une transition smooth sur hover.

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
{% include 'dev/components/select-custom/select-custom.twig' %}
```
