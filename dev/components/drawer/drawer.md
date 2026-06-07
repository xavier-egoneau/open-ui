# Drawer

## Usage

Panneau latéral ou bas affiché au-dessus de la page courante pour consulter, filtrer ou modifier un contenu contextuel.

Le composant fournit la structure HTML/CSS : overlay, conteneur `dialog`, en-tête, contenu scrollable, footer et bouton de fermeture. L'ouverture/fermeture JavaScript, le piège de focus et le verrouillage du scroll restent à gérer par l'application.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `position` | `select` | `"right"` | Position du panneau : `right`, `left`, `bottom` |
| `overlay` | `checkbox` | `true` | Affiche le fond d'occultation |
| `open` | `checkbox` | `true` | État visuel ouvert pour les exemples statiques |
| `showClose` | `checkbox` | `true` | Affiche le bouton de fermeture |
| `id` | `text` | `"drawer-demo"` | Identifiant du panneau |
| `title` | `text` | `"Détails"` | Titre du drawer |
| `description` | `text` | texte d'aide | Description reliée au dialog |
| `body` | `text` | HTML d'exemple | Contenu principal scrollable |
| `footer` | `text` | boutons d'exemple | Contenu de pied optionnel |
| `closeLabel` | `text` | `"Fermer le panneau"` | Nom accessible du bouton fermer |

## Accessibilité

- Le panneau utilise `role="dialog"` et `aria-modal="true"`.
- Le titre est relié via `aria-labelledby`.
- La description optionnelle est reliée via `aria-describedby`.
- Le bouton de fermeture possède un nom accessible.
- L'intégration applicative doit gérer le focus initial, le retour du focus au déclencheur, la touche Échap, le piège de focus et le verrouillage du scroll arrière-plan.

## Exemples

### Drawer à droite

```twig
{% include 'dev/components/drawer/drawer.twig' with {
  position: 'right',
  title: 'Filtres',
  body: '<p>Choisissez les critères à appliquer.</p>'
} %}
```

### Drawer bas

```twig
{% include 'dev/components/drawer/drawer.twig' with {
  position: 'bottom',
  title: 'Actions rapides',
  footer: '<button class="btn btn--primary" type="button">Valider</button>'
} %}
```
