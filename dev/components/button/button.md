# Button

## Usage

Élément d'action principal. À utiliser pour tout déclencheur d'action utilisateur : soumission de formulaire, CTA, confirmation, navigation. Choisir la variante selon le niveau d'importance de l'action.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `text` | `string` | `'Cliquez ici'` | Texte affiché dans le bouton |
| `variant` | `string` | `'primary'` | Variante visuelle : `primary`, `secondary`, `outline`, `ghost`, `danger` |
| `size` | `string` | `'md'` | Taille : `sm`, `md`, `lg` |
| `full` | `boolean` | `false` | Pleine largeur si `true` |
| `disabled` | `boolean` | `false` | Désactive le bouton si `true` |

## Accessibilité

- `type="button"` explicite pour éviter la soumission de formulaire accidentelle.
- État désactivé combiné : attribut natif `disabled` + `aria-disabled="true"`.
- Focus visible stylé via `@include focus-ring` (outline WCAG AA).

## Exemples

### Exemple de base

```twig
{% include 'dev/components/button/button.twig' with {
  text: 'Valider'
} %}
```

### Variante secondary

```twig
{% include 'dev/components/button/button.twig' with {
  text: 'Annuler',
  variant: 'secondary'
} %}
```

### Variante outline

```twig
{% include 'dev/components/button/button.twig' with {
  text: 'En savoir plus',
  variant: 'outline'
} %}
```

### Bouton danger

```twig
{% include 'dev/components/button/button.twig' with {
  text: 'Supprimer',
  variant: 'danger'
} %}
```

### Petit bouton désactivé

```twig
{% include 'dev/components/button/button.twig' with {
  text: 'Indisponible',
  size: 'sm',
  disabled: true
} %}
```

### Pleine largeur

```twig
{% include 'dev/components/button/button.twig' with {
  text: 'Continuer',
  full: true
} %}
```
