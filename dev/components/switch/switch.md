# Switch

## Usage
Toggle on/off accessible. Utilisé pour activer ou désactiver un paramètre immédiatement.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `checked` | `checkbox` | `false` | Activé |
| `disabled` | `checkbox` | `false` | Désactivé |
| `size` | `select` | `"md"` | Taille |
| `label` | `text` | `"Notifications par e-mail"` | Label |
| `labelOn` | `text` | `"Activé"` | État activé |
| `labelOff` | `text` | `"Désactivé"` | État désactivé |

## Accessibilité
Vérifier les labels, rôles ARIA, états désactivés/erreur et navigation clavier selon l’usage réel du composant.

## Exemples

### Exemple de base

```twig
{% include 'dev/components/switch/switch.twig' %}
```
