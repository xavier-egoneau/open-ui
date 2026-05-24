# Header Nav

## Usage

En-tête de page principal. Compose un logo, des liens de navigation et un bouton d'action (CTA). À placer une seule fois par page, en tant que premier enfant de `<body>`. Supporte une variante claire et sombre, et un mode sticky.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `variant` | `string` | `'light'` | Thème visuel : `light` ou `dark` |
| `sticky` | `boolean` | `false` | Position fixe en haut de page si `true` |
| `logoText` | `string` | `'MonSite'` | Nom affiché dans le logo |
| `links` | `array` | *(4 liens exemples)* | Tableau de liens : `{ label, href, active? }` |
| `cta` | `object` | `{ variant, size, full, disabled, text }` | Configuration du bouton d'action imbriqué |

## Accessibilité

- `<header>` avec `role="banner"` — landmark de page.
- `<nav>` avec `aria-label="Navigation principale"` — landmark de navigation.
- `<ul role="list">` — liste sémantique de liens.
- `aria-current="page"` sur le lien actif.
- `aria-label` sur le logo pour décrire l'action (retour accueil).

## Exemples

### Exemple de base

```twig
{% include 'dev/components/header-nav/header-nav.twig' %}
```

### Variante dark

```twig
{% include 'dev/components/header-nav/header-nav.twig' with {
  variant: 'dark',
  logoText: 'MonSite',
  cta: {
    text: 'Se connecter'
  }
} %}
```

### Avec liens personnalisés et lien actif

```twig
{% include 'dev/components/header-nav/header-nav.twig' with {
  logoText: 'MonSite',
  cta: {
    text: 'Essai gratuit'
  },
  links: [
    { label: 'Accueil',  href: '/',        active: true },
    { label: 'Produits', href: '/produits' },
    { label: 'Blog',     href: '/blog' },
    { label: 'Contact',  href: '/contact' }
  ]
} %}
```

### Sticky

```twig
{% include 'dev/components/header-nav/header-nav.twig' with {
  sticky: true,
  cta: {
    text: 'Démarrer'
  }
} %}
```
