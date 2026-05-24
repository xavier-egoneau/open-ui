# Alert

## Usage
Composant atomique affichant un message contextuel de notification (success, error, warning, info) avec icono, texte et possibilité de dismiss

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `variant` | `select` | `"info"` | Type |
| `dismissible` | `checkbox` | `false` | Fermable |
| `title` | `text` | `""` | Titre (optionnel) |
| `message` | `text` | `"Opération réussie."` | Message |

## Accessibilité
Vérifier les labels, rôles ARIA, états désactivés/erreur et navigation clavier selon l’usage réel du composant.

## Exemples

### Exemple de base

```twig
{% include 'dev/components/alert/alert.twig' %}
```
