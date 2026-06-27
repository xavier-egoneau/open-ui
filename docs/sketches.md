# Sketches

## Intention

Open UI doit savoir creer des esquisses quand l'utilisateur explore une idee, sans polluer le design system canonique.

Une esquisse sert a chercher une direction. Un composant canonique sert a etre reutilise durablement.

Le mode normal d'Open UI reste le design system : reutilisation, variantes, impacts, tokens et validation. Le mode esquisse est un tunnel a part, declenche explicitement, pour autoriser une recherche plus libre en debut de projet.

## Declenchement

Le tunnel esquisse doit etre declenche par la commande `/open-ui-sketch` ou par une demande explicite equivalente : maquette libre, exploration visuelle, brouillon, sketch, tester une direction sans l'integrer au DS.

Une demande vague ne suffit pas a basculer en esquisse : dans ce cas, il faut cadrer la demande ou rester dans le workflow design system.

## Contrat

- Une esquisse doit etre marquee comme experimentale.
- Une esquisse ne doit pas etre referencee par defaut comme composant stable.
- Une esquisse peut etre moins normalisee, mais doit rester lisible et visualisable.
- Une esquisse ne doit pas modifier des composants canoniques, tokens globaux ou conventions partagees sans confirmation explicite.
- Si une esquisse devient utile, elle doit etre promue en composant canonique avec JSON, Twig, Markdown et SCSS propres.
- La promotion doit inclure une analyse d'impact, les variantes/tokens necessaires et une verification RGAA selon la cible.

## Statuts d'artefacts

Open UI utilise trois statuts pour eviter de confondre exploration, brouillon structure et design system stable :

- `canonical` : artefact stable du design system, reutilisable par defaut. Dans `dev/components/`, l'absence temporaire de `status` vaut `canonical` pour compatibilite, mais tout nouveau JSON doit declarer le statut explicitement.
- `draft` : brouillon structure ou candidat a consolidation. Il ne doit pas etre reutilise par defaut par les pages/composants canoniques. Emplacement recommande : `dev/drafts/` ou `dev/drafts/components/` tant que les scripts ne filtrent pas les drafts dans `dev/components/`.
- `sketch` : exploration experimentale, visible dans le tunnel `dev/sketches/` et publiee sous `/sketches/`. Un dossier de sketch peut contenir un manifeste `sketch.json` avec `status: "sketch"`, ses limites et les pistes de promotion.

Regles de reference :

- Un composant ou une page `canonical` ne reference pas de `draft` ou `sketch` sans confirmation explicite.
- Un `draft` peut referencer du `canonical` pour preparer une promotion.
- Un `sketch` reste autoportant autant que possible et ne modifie pas les sources canoniques pendant l'exploration.
- `npm run list` reste centre sur le canonique ; les sketches/drafts doivent etre listes separement si besoin.

## Difference avec un composant canonique

| Type | But | Contraintes |
|------|-----|-------------|
| Esquisse | explorer une idee | rapide, explicite, non canonique, tunnel a part |
| Composant | reutiliser durablement | JSON/Twig/MD/SCSS, accessibilite, tokens, impact |

## Sortie attendue d'une esquisse

- Le rendu ou la page visualisable.
- Le statut experimental clairement visible dans le nom, le chemin ou la documentation.
- Les limites assumées du brouillon.
- Une section "A consolider si on garde cette direction" : composants a extraire, variantes/tokens a creer, impacts a analyser, RGAA a reprendre.

## Questions a resoudre

- Quel niveau de validation rendre bloquant pour `status` apres la phase de compatibilite ?
- Faut-il ajouter une commande dediee `npm run list:sketches` ou `npm run list:drafts` ?
- Comment promouvoir une esquisse en composant sans casser les pages ?
- Comment eviter que les esquisses deviennent un cimetiere de composants morts ?
