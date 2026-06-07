# Empty State

## Usage

État vide pour indiquer qu'une liste, une recherche ou une zone de contenu ne contient rien à afficher. Utiliser ce composant pour guider l'utilisateur vers une action utile sans masquer la cause de l'état vide.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `variant` | `select` | `"default"` | Variante visuelle : `default`, `error`, `filtered`, `onboarding` |
| `id` | `text` | `"empty-state-demo"` | Identifiant utilisé pour relier le titre à la section |
| `title` | `text` | `"Aucun élément à afficher"` | Titre principal |
| `description` | `text` | texte d'aide | Explication courte de l'état |
| `primaryActionLabel` | `text` | `"Créer un élément"` | Libellé de l'action principale |
| `primaryActionHref` | `text` | `"#"` | URL de l'action principale |
| `secondaryActionLabel` | `text` | `"Réinitialiser"` | Libellé de l'action secondaire |
| `secondaryActionHref` | `text` | `""` | URL de l'action secondaire ; vide = action masquée |

## Accessibilité

- La section est reliée à son titre via `aria-labelledby`.
- L'icône par défaut est décorative et masquée aux technologies d'assistance.
- Les actions utilisent des liens ou boutons natifs selon l'intégration.
- Le texte doit expliciter la cause de l'état vide quand elle est connue : filtre actif, erreur, absence de données ou onboarding.

## Exemples

### Exemple de base

```twig
{% include 'dev/components/empty-state/empty-state.twig' %}
```

### Résultat filtré

```twig
{% include 'dev/components/empty-state/empty-state.twig' with {
  variant: 'filtered',
  title: 'Aucun résultat',
  description: 'Aucun élément ne correspond aux filtres actifs.',
  primaryActionLabel: 'Réinitialiser les filtres'
} %}
```
