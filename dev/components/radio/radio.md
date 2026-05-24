# Radio

## Usage
Groupe de boutons radio accessibles. Sélection unique parmi plusieurs options.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `disabled` | `checkbox` | `false` | Désactivé |
| `hasError` | `checkbox` | `false` | Erreur |
| `inline` | `checkbox` | `false` | Inline |
| `legend` | `text` | `"Abonnement"` | Légende |
| `errorMessage` | `text` | `"Veuillez choisir une option."` | Message d'erreur |
| `options` | `array` | `[{"value":"starter","label":"Starter"},{"value":"pro","label":"Pro"},{"value":"enterprise","label":"Enterprise"}]` | Options |

## Accessibilité
Vérifier les labels, rôles ARIA, états désactivés/erreur et navigation clavier selon l’usage réel du composant.

## Exemples

### Exemple de base

```twig
{% include 'dev/components/radio/radio.twig' %}
```
