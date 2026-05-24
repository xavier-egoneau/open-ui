# Sketches

## Intention

Open UI doit savoir creer des esquisses quand l'utilisateur explore une idee, sans polluer le design system canonique.

Une esquisse sert a chercher une direction. Un composant canonique sert a etre reutilise durablement.

## Contrat

- Une esquisse doit etre marquee comme experimentale.
- Une esquisse ne doit pas etre referencee par defaut comme composant stable.
- Une esquisse peut etre moins normalisee, mais doit rester lisible.
- Si une esquisse devient utile, elle doit etre promue en composant canonique avec JSON, Twig, Markdown et SCSS propres.

## Difference avec un composant canonique

| Type | But | Contraintes |
|------|-----|-------------|
| Esquisse | explorer une idee | rapide, explicite, non canonique |
| Composant | reutiliser durablement | JSON/Twig/MD/SCSS, accessibilite, tokens, impact |

## Questions a resoudre

- Ou stocker les esquisses ?
- Quel statut utiliser dans le JSON : `draft`, `sketch`, `canonical` ?
- Comment promouvoir une esquisse en composant sans casser les pages ?
- Faut-il inclure les esquisses dans `npm run list` ?
- Comment eviter que les esquisses deviennent un cimetiere de composants morts ?
