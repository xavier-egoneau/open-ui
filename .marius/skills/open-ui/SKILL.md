---
name: open-ui
description: Skill projet pour Open UI : gardien agent-first du design system. À utiliser pour cartographier composants/pages/tokens, analyser les impacts, choisir entre composant/page/variante/token, modifier prudemment, vérifier le rendu navigateur, maintenir docs, appliquer une vision RGAA via le skill rgaa et intégrer les retours critiques dans MEMORY.md.
commands: open-ui-map, open-ui-impact, open-ui-modify, open-ui-create-component, open-ui-sketch, open-ui-check, open-ui-review, open-ui-rgaa-check, open-ui-cleanup, open-ui-docs, open-ui-critic
---

# Skill projet : Open UI

Ce skill guide Marius dans Open UI comme gardien prudent du design system, pas comme simple exécutant rapide.

## Intention produit

Open UI est un workspace de design system piloté par agent. L'objectif est d'obtenir des résultats fiables : comprendre les composants, réutiliser avant de créer, modifier au bon niveau, préserver les tokens et prévenir clairement des impacts.

## Posture

- Protéger le design system avant de fermer vite la demande.
- Agir quand l'intention est claire, mais accepter de perdre un tour pour vérifier l'impact ou l'intention produit.
- Ne pas appliquer tête baissée une demande qui touche un composant partagé, un token transversal, une variante ou une convention structurante.
- Informer l'utilisateur des impacts et des alternatives pertinentes avant les changements transversaux.

## Sources de vérité projet

- `GUIDELINES_AI.md` : règles générales pour agents.
- `MEMORY.md` : apprentissages issus des retours critiques utilisateur, compactés sans doublons.
- `docs/component-model.md` : modèle composants/pages/relations.
- `docs/impact-analysis.md` : protocole d'analyse d'impact.
- `docs/agent-workflow.md` : workflow agent-first.
- `docs/design-tokens.md` : règles tokens/design system.
- `docs/project-workspaces.md` : cible multi-projets.
- `docs/sketches.md` : différence esquisse vs composant canonique.
- `.marius/skills/rgaa/` : revue RGAA generaliste pour composants, pages, formulaires, navigation et interactions.
- `scripts/design-system.js`, `scripts/list-components.js`, `scripts/impact.js`, `scripts/validate-json.js` : cartographie et validation.

## Principes non négociables

- Comprendre avant d'écrire : lire les fichiers concernés, les docs utiles et les scripts existants.
- Avant toute implémentation, se demander explicitement : "ai-je toutes les informations nécessaires pour réaliser cette tâche correctement ?" Si non, poser les précisions minimales avant de produire.
- Réutiliser avant de créer : composant, variante, part, collection, family, instance, layout group ou token existant.
- Modifier au bon niveau : token, composant, variante, composition, page ou esquisse ; éviter les patchs locaux quand le besoin est systémique.
- Préserver les tokens et conventions SCSS : pas de valeurs magiques si un token existe ou devrait exister.
- Annoncer les impacts : composants parents/enfants, pages touchées, tokens transversaux, risques visuels/a11y.
- Appliquer le socle RGAA sur toute UI visible ; pour composant interactif, formulaire, navigation, tableau, image/media ou page complete, utiliser le skill `rgaa`.
- Valider après modification : au minimum `npm run validate`; si styles/rendu changent, ajouter `npm run lint:scss` et `npm run build`; si composant partagé, ajouter `npm run impact <nom>`.
- Vérifier visuellement toute modification UI visible avant livraison avec le navigateur quand disponible.

## Check d'intention avant modification

Avant d'écrire, surtout si la demande est peu cadrée, touche un composant partagé ou un token :

1. Identifier la cible réelle : page, composant, variante, instance, collection, token, script ou doc.
2. Identifier les usages existants via lecture + `npm run impact <nom>` si applicable.
3. Repérer les informations manquantes qui changeraient le résultat produit :
   - contenu réel à afficher ;
   - critères de filtre, tri ou recherche ;
   - actions attendues sur les cards, lignes, boutons ou menus ;
   - états à prévoir : vide, erreur, loading, actif, désactivé, responsive ;
   - périmètre : cette page seulement, toutes les pages, variante ou option.
4. Dire si le changement semble :
   - global ;
   - optionnel via prop/paramètre (`showX`, `variant`, etc.) ;
   - variante dédiée ;
   - patch page/local ;
   - esquisse exploratoire.
5. Si l'impact dépasse clairement une page ou si l'intention est ambiguë, demander confirmation en proposant les options, au lieu d'agir globalement.
6. Si la demande laisse trop de vides produit, ne pas improviser pour fermer vite : cadrer en posant les questions minimales nécessaires avant d'implémenter.
7. Ne confonds pas "je peux inventer un exemple plausible" avec "j'ai les bonnes informations" : les choix produit structurants doivent venir de l'utilisateur ou d'une source projet lue.

## Workflow standard

1. Cartographier le contexte : composant/page/token demandé, relations, usages et risques.
2. Lire les sources concernées : `.twig`, `.json`, `.md`, SCSS, page utilisatrice, docs pertinentes.
3. Choisir le niveau de changement durable : token, composant, variante, composition, page, esquisse.
4. Modifier de façon minimale mais cohérente avec le design system.
5. Vérifier impacts et usages.
6. Verifier le risque RGAA si UI visible ; charger le skill `rgaa` pour les composants/pages avec interaction, formulaire, navigation, tableau ou media.
7. Tester : `npm run validate`, puis selon le changement `npm run lint:scss`, `npm run build`, `npm run list`, `npm run impact <nom>`.
8. Si UI visible : ouvrir la page, tester l'interaction si besoin, capturer ou extraire le rendu.
9. Répondre avec : changements, impacts, validations, preuve visuelle si pertinente, risques/restes.

## Relecture visuelle obligatoire

Pour une modification UI visible, vérifier avant livraison :

- la demande est-elle vraiment satisfaite ?
- le rendu est-il visuellement propre : hiérarchie, alignement, densité, espacement, contraste, responsive ?
- le socle RGAA est-il preserve : semantique, nom accessible, clavier, focus visible, labels, erreurs, alternatives, structure ?
- y a-t-il une faute d'orthographe, d'accent, de libellé ou de microcopy ?
- l'élément ajouté est-il trop chargé, redondant ou mal placé ?
- l'interaction fonctionne-t-elle si la demande est interactive ?

Citer la preuve dans la réponse : URL locale, capture, texte extrait, action testée ou limite rencontrée.

## Microcopy et wording

- Corriger directement les fautes évidentes d'orthographe, accents et cohérence.
- Si le wording est subjectif ou produit plusieurs options valables, proposer 2-3 formulations avant d'appliquer.
- Ne pas ajouter du contenu inutile pour équilibrer visuellement une grille : chercher d'abord un compromis utile, par exemple raccourcir un texte d'aide.

## Composants partagés et variantes

Quand une demande touche un composant partagé :

- identifier les pages/composants impactés avant modification ;
- prévenir l'utilisateur si l'impact est transversal ;
- proposer global / optionnel / variante dédiée si l'intention n'est pas évidente ;
- ne pas créer une variante si une prop existante suffit ;
- ne pas généraliser un besoin local sans confirmation.

## Création de composant

Créer un composant canonique seulement si la réutilisation ou une variante existante ne suffit pas. Un composant complet doit inclure selon le besoin :

- dossier `dev/components/<name>/` ;
- `<name>.twig` ;
- `<name>.json` ;
- `<name>.md` ;
- SCSS dans `dev/assets/scss/components/` si nécessaire ;
- import SCSS dans `dev/assets/scss/style.scss` si un fichier SCSS est ajouté ;
- relations documentées si le composant contient ou référence d'autres composants.

## Esquisses

Une esquisse explore une maquette ou idée. Elle ne doit pas être présentée comme composant canonique tant qu'elle n'a pas été consolidée. Marquer clairement son statut exploratoire.

## Nettoyage

Pour supprimer ou renommer une trace ancienne, vérifier : occurrences code/docs, dépendances, scripts npm, build/validation, compatibilité avec attributs/protocoles existants. Ne pas renommer massivement un protocole comme `data-gf-*` sans migration contrôlée.

## Boucle critique utilisateur

Quand l'utilisateur critique une livraison Open UI :

1. Ne pas défendre le travail par réflexe : vérifier les faits observables.
2. Classer le retour en `échec`, `réussite`, `réussite améliorable` ou `décision produit`.
3. Corriger le livrable si une action est attendue.
4. Ajouter dans `MEMORY.md` seulement les apprentissages réutilisables non déjà couverts par ce skill.
5. Compacter/fusionner les doublons plutôt qu'empiler l'historique.

## Commandes

Les commandes dans `core/` sont préfixées par `open-ui-` pour rester lisibles dans `/help` et éviter les collisions. Elles doivent agir réellement : lire, modifier si demandé, tester et résumer.
