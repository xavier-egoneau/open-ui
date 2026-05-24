# Checkbox

## Usage
Case à cocher accessible avec label, état checked, disabled et erreur.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `checked` | `checkbox` | `false` | Coché |
| `disabled` | `checkbox` | `false` | Désactivé |
| `hasError` | `checkbox` | `false` | Erreur |
| `label` | `text` | `"J'accepte les conditions d'utilisation"` | Label |
| `errorMessage` | `text` | `"Vous devez accepter les conditions."` | Message d'erreur |

## Accessibilité
Vérifier les labels, rôles ARIA, états désactivés/erreur et navigation clavier selon l’usage réel du composant.

## Exemples

### Exemple de base

```twig
{% include 'dev/components/checkbox/checkbox.twig' %}
```
