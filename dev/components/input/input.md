# Input

## Usage
Champ de saisie texte, nombre ou date. Gère tous les états classiques : placeholder, disabled, error, required.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `type` | `select` | `"text"` | Type |
| `size` | `select` | `"md"` | Taille |
| `disabled` | `checkbox` | `false` | Désactivé |
| `required` | `checkbox` | `false` | Requis |
| `hasError` | `checkbox` | `false` | Erreur |
| `label` | `text` | `"Adresse e-mail"` | Label |
| `placeholder` | `text` | `"ex : jean@exemple.fr"` | Placeholder |
| `helpText` | `text` | `""` | Texte d'aide |
| `errorMessage` | `text` | `"Ce champ est invalide."` | Message d'erreur |

## Accessibilité
Vérifier les labels, rôles ARIA, états désactivés/erreur et navigation clavier selon l’usage réel du composant.

## Exemples

### Exemple de base

```twig
{% include 'dev/components/input/input.twig' %}
```
