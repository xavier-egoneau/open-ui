# Open UI Showcase

Le Showcase est l'interface locale de consultation du design system. Il lit les composants canoniques dans `dev/components/`, génère tous les contrôles déclarés dans leurs groupes `variants` et `content`, puis demande au serveur Vite un nouveau rendu Twig à chaque modification.

Il fait partie du moteur Open UI et doit rester versionné. Il n'est pas généré depuis `dev/`.

## Lancer

```bash
npm run dev
```

Puis ouvrir `/showcase/` depuis l'index Open UI.

## Frontières

- `showcase/` contient l'outil système suivi par Git.
- `dev/` reste la source locale du projet utilisateur.
- `dev/` peut être absent ou vide : le catalogue expose alors un état de démarrage sans erreur ;
- `dev/assets/scss/style.scss` est chargé par un module virtuel et remplacé par une feuille vide tant que ce fichier n'existe pas ;
- le formulaire du Showcase ne modifie jamais les JSON : ses valeurs sont temporaires ;
- les contrôles `array` avec un schéma `item` utilisent un éditeur de liste avec ajout, suppression et champs nommés ; le JSON brut reste uniquement un repli quand la forme d'un item est indéterminable ;
- le panneau `HTML généré` expose et copie uniquement le dernier HTML effectivement rendu dans l'iframe ; la copie est désactivée pendant une mise à jour ou après une erreur ;
- les relations `parts`, `collections`, `families`, `instances` et `layoutGroups` sont présentées comme contrat de composition ; les contrôles effectivement rendus viennent des groupes `variants` et `content` du composant sélectionné ;
- le rendu live dépend du serveur Vite et n'est pas destiné à fonctionner en `file://`.

## Rendu live

Le shell et l'iframe communiquent par `postMessage`. L'iframe appelle l'API locale de rendu, injecte uniquement le HTML du composant et conserve la feuille de styles du projet chargée. Chaque demande porte une révision : le shell ignore une réponse ancienne et n'expose à la copie que le HTML correspondant au rendu courant. Un changement de valeur rerend le composant ; un changement de source JSON, Twig ou SCSS passe par le watcher Vite.

Le contrat de démarrage sans `dev/` ni `public/` se vérifie avec `npm run test:empty`.
