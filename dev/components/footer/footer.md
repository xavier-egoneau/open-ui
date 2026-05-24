# Footer

## Usage

Pied de page principal. À placer une seule fois par page, en bas de `<body>`. Structure en deux zones : une grille brand + colonnes de liens, et une barre inférieure avec copyright et liens légaux. Colonnes et liens entièrement paramétrables.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `variant` | `string` | `'dark'` | Thème : `dark` (fond gris-900) ou `light` (fond gris-100) |
| `logoText` | `string` | `'MonSite'` | Nom affiché dans le logo |
| `tagline` | `string` | `'Construisons…'` | Phrase d'accroche sous le logo |
| `copyright` | `string` | `'© 2025 MonSite…'` | Mention copyright |
| `columns` | `array` | *(3 colonnes exemples)* | Colonnes de navigation : `{ title, links: [{ label, href }] }` |
| `legalLinks` | `array` | *(3 liens légaux)* | Liens légaux : `[{ label, href }]` |

## Accessibilité

- `<footer>` avec `role="contentinfo"` — landmark de page.
- `<nav aria-label="Navigation pied de page">` — landmark de navigation distinct du header.
- `<nav aria-label="Liens légaux">` — landmark séparé pour les liens légaux.
- `<ul role="list">` sur chaque liste de liens.
- `aria-label` sur le logo.

## Exemples

### Exemple de base

```twig
{% include 'dev/components/footer/footer.twig' %}
```

### Variante light

```twig
{% include 'dev/components/footer/footer.twig' with {
  variant: 'light',
  logoText: 'MonSite',
  tagline: 'Une belle tagline ici.'
} %}
```

### Colonnes personnalisées

```twig
{% include 'dev/components/footer/footer.twig' with {
  logoText: 'MonSite',
  copyright: '© 2025 MonSite SAS',
  columns: [
    {
      title: 'Navigation',
      links: [
        { label: 'Accueil',  href: '/' },
        { label: 'Produits', href: '/produits' },
        { label: 'Blog',     href: '/blog' }
      ]
    },
    {
      title: 'Légal',
      links: [
        { label: 'CGV',               href: '/cgv' },
        { label: 'Mentions légales',  href: '/mentions' }
      ]
    }
  ],
  legalLinks: []
} %}
```
