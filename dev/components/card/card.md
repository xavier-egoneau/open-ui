# Card

## Usage

Conteneur de contenu structuré. Utiliser pour afficher un élément d'une liste : article, produit, membre d'équipe, fonctionnalité. Supporte trois variantes visuelles, un mode horizontal et des slots optionnels (image, tag, bouton).

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `variant` | `string` | `'default'` | Style visuel : `default` (ombre légère), `outlined` (bordure), `elevated` (ombre forte) |
| `horizontal` | `boolean` | `false` | Disposition image à gauche + contenu à droite |
| `hasImage` | `boolean` | `true` | Affiche la zone image |
| `hasCta` | `boolean` | `true` | Affiche le bouton d'action |
| `title` | `string` | `'Titre de la carte'` | Titre principal |
| `text` | `string` | `'Courte description…'` | Texte descriptif |
| `imageUrl` | `string` | placeholder 600×400 | URL de l'image |
| `imageAlt` | `string` | `''` | Texte alternatif de l'image (vide = décorative) |
| `tag` | `string` | `''` | Étiquette catégorie affichée en haut du body |
| `cta` | `object` | `{ variant, size, full, disabled, text }` | Configuration du bouton imbriqué |

## Accessibilité

- Élément `<article>` — landmark sémantique pour un contenu autonome.
- `loading="lazy"` sur l'image pour les performances.
- `alt=""` si l'image est décorative (déjà le défaut).
- Le bouton inclus hérite de tous les attributs d'accessibilité de l'atom Button.

## Exemples

### Exemple de base

```twig
{% include 'dev/components/card/card.twig' %}
```

### Variante outlined avec tag

```twig
{% include 'dev/components/card/card.twig' with {
  variant: 'outlined',
  tag: 'Nouveau',
  title: 'Titre de l\'article',
  text: 'Une description courte et percutante.',
  cta: {
    text: 'Lire l\'article'
  }
} %}
```

### Sans image

```twig
{% include 'dev/components/card/card.twig' with {
  hasImage: false,
  title: 'Fonctionnalité',
  text: 'Description de la fonctionnalité.'
} %}
```

### Mode horizontal

```twig
{% include 'dev/components/card/card.twig' with {
  horizontal: true,
  variant: 'elevated',
  title: 'Article en vedette',
  text: 'Un contenu mis en avant avec une mise en page horizontale.'
} %}
```
