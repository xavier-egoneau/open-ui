# Toast stack

Pile de notifications courtes, empilées dans une région dédiée.

## Usage

- Utiliser pour des retours système non bloquants : succès, erreur, avertissement, information ou notification neutre.
- Garder les messages courts et actionnables.
- Ajouter `action` uniquement quand l’utilisateur peut corriger ou consulter immédiatement.
- Ne pas remplacer une erreur de formulaire liée à un champ : l’erreur doit rester associée au champ concerné.

## API Twig

| Propriété | Type | Défaut | Description |
| --- | --- | --- | --- |
| `label` | string | `Notifications` | Libellé accessible de la région. |
| `position` | string | `top-right` | Position visuelle : `top-right`, `top-left`, `bottom-right`, `bottom-left`. |
| `toasts` | array | `[]` | Notifications à afficher. |

### Toast

| Propriété | Type | Défaut | Description |
| --- | --- | --- | --- |
| `variant` | string | `neutral` | `success`, `error`, `warning`, `info`, `neutral`. |
| `title` | string | — | Titre optionnel. |
| `message` | string | — | Message de la notification. |
| `action.label` | string | `Voir` | Libellé du lien d’action optionnel. |
| `action.href` | string | `#` | Cible du lien d’action optionnel. |
| `dismissible` | boolean | `true` | Affiche le bouton de fermeture. |
| `dismissLabel` | string | `Fermer la notification` | Nom accessible du bouton de fermeture. |
| `role` | string | `alert` pour `error`, sinon `status` | Rôle live region personnalisable. |
| `live` | string | `assertive` pour `error`, sinon `polite` | Niveau d’annonce personnalisable. |

## Accessibilité

- La pile est une région nommée avec `role="region"` et `aria-label`.
- Les toasts d’erreur utilisent `role="alert"` / `aria-live="assertive"`; les autres utilisent `status` / `polite`.
- Les icônes sont décoratives (`aria-hidden="true"`).
- Le bouton de fermeture possède un nom accessible explicite.
- Le script de fermeture doit retirer le toast du DOM ou le masquer proprement, puis préserver un ordre de focus logique.

## Exemple multi-toasts

Voir `toast-stack.json` pour un exemple couvrant les variantes `success`, `error`, `warning`, `info` et `neutral`, avec actions optionnelles.
