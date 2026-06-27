# Design Tokens

## Intention

Les tokens garantissent la coherence visuelle d'Open UI. Ils doivent permettre de modifier l'apparence globale sans casser les composants ni introduire des styles ponctuels incoherents.

## Contrat

- Les tokens SCSS vivent principalement dans `dev/assets/scss/base/_variables.scss`.
- Les composants doivent utiliser les tokens existants avant d'introduire des valeurs locales.
- Les styles inline sont interdits dans les templates Twig.
- Toute nouvelle valeur repetee doit etre candidate a un token.
- Modifier un token est un changement transversal et doit etre annonce comme tel.

## Couches de tokens

Open UI distingue trois couches pour garder le systeme pilotable sans changer la palette a chaque projet.

### Core tokens

Les core tokens sont les primitives brutes : couleurs, echelles de spacing, rayons, typographie, ombres, breakpoints et z-index. Ils peuvent rester proches des variables actuelles (`$color-primary`, `$spacing-md`, `$radius-lg`) et servent de socle de compatibilite.

### Semantic tokens

Les semantic tokens portent une intention UI transversale : surface, texte, bordure, action, focus, danger, succes, warning. Les composants devraient consommer ces roles en priorite plutot que des couleurs directes.

Exemples cibles :

```scss
$semantic-surface-page: $color-gray-50;
$semantic-surface-default: $color-white;
$semantic-text-primary: $color-gray-900;
$semantic-text-secondary: $color-gray-600;
$semantic-border-subtle: $color-gray-200;
$semantic-action-primary-bg: $color-primary;
$semantic-action-primary-text: $color-white;
$semantic-focus-ring-color: $color-primary;
```

### Project tokens

Les project tokens adaptent une direction ou un projet sans modifier les composants canoniques : brand, largeur de contenu, densite, surfaces de page, accent local. Ils peuvent pointer vers les semantic tokens par defaut.

Exemples cibles :

```scss
$project-color-brand: $semantic-action-primary-bg;
$project-content-max-width: 75rem;
$project-page-padding-x: $spacing-lg;
```

## Types de tokens attendus

- couleurs primitives et roles semantiques ;
- espacements et densites ;
- rayons ;
- typographie ;
- ombres ;
- breakpoints ;
- z-index si necessaire.

## Regles d'usage

- Preferer `$spacing-*` aux valeurs arbitraires.
- Preferer un semantic token (`$semantic-*`) a une couleur primitive dans les composants.
- Preferer `$color-*` aux hexadecimaux locaux si aucun semantic token n'existe encore.
- Preferer `$radius-*` aux rayons fixes locaux.
- Un composant peut avoir une exception locale seulement si elle est justifiee par son usage.
- Une exception repetee doit devenir un token, un semantic token ou une variante.
- Les changements de palette restent separes de la migration vers des tokens semantiques : on peut introduire les roles sans changer le rendu.

## Impact token

Avant de modifier un token, l'agent doit chercher les composants qui l'utilisent et prevenir l'utilisateur de l'impact probable.

Sortie attendue :

```text
Token touche: $spacing-lg
Composants probablement impactes: card, footer, form controls
Risque: densite verticale changee sur plusieurs pages
```

## Migration progressive

1. Garder les variables actuelles comme compatibilite.
2. Ajouter des alias semantic tokens sans changer la palette.
3. Migrer d'abord les composants a fort effet de levier : `button`, formulaires, `card`, theme.
4. Ajouter un audit non bloquant des valeurs magiques dans les SCSS composants/pages.
5. Rendre progressivement les nouveaux composants dependants des semantic tokens plutot que des primitives.

## Questions a resoudre

- Faut-il generer un index tokens -> composants ?
- Faut-il migrer les tokens SCSS vers un format source JSON partageable ?
- Comment representer les tokens par projet quand Open UI gerera plusieurs projets ?
- Comment detecter automatiquement les valeurs hardcodees qui devraient devenir des tokens ?
- Faut-il exposer les tokens comme controles editables ou les garder comme couche systeme ?
