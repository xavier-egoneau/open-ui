---
name: open-ui
description: >-
  Skill projet pour Open UI : gardien agent-first du design system. À utiliser
  pour cartographier composants/pages/tokens, analyser les impacts, choisir
  entre composant/page/variante/token, modifier prudemment, vérifier le rendu
  navigateur, maintenir docs, appliquer une vision RGAA via le skill rgaa et
  intégrer les retours critiques via MEMORY.md. Le mode maquette libre se
  déclenche explicitement via /open-ui-sketch et reste hors design system
  canonique.
commands: open-ui-map, open-ui-impact, open-ui-modify, open-ui-create-component, open-ui-sketch, open-ui-consolidate-sketch, open-ui-check, open-ui-review, open-ui-rgaa-check, open-ui-cleanup, open-ui-docs, open-ui-critic
amk:
  command_descriptions:
    /open-ui-map: Cartographier pages, composants, tokens et relations Open UI
    /open-ui-impact: Analyser les impacts Open UI avant changement
    /open-ui-modify: Modifier Open UI au bon niveau avec impact, variantes et validation
    /open-ui-create-component: Créer un composant Open UI canonique ou une variante
    /open-ui-sketch: Déclencher le tunnel maquette libre / esquisse exploratoire Open UI, hors design system canonique
    /open-ui-consolidate-sketch: Consolider une esquisse retenue en composant, variante, page, token ou pattern canonique Open UI
    /open-ui-check: Vérifier cohérence, rendu et validations Open UI
    /open-ui-review: Revoir une modification UI/design system Open UI
    /open-ui-rgaa-check: Vérifier une cible Open UI avec le skill RGAA
    /open-ui-cleanup: Nettoyer traces mortes et incohérences Open UI
    /open-ui-docs: Mettre à jour la documentation projet Open UI
    /open-ui-critic: Intégrer un retour critique utilisateur via MEMORY.md et corriger le livrable
  command_prompts:
    /open-ui-map: |
      Cartographie Open UI avant toute modification.

      1. Identifie la cible demandée : page, composant, token, variante ou workflow.
      2. Lis les sources de vérité utiles dans `docs/` et les fichiers source concernés.
      3. Utilise les scripts de cartographie disponibles si pertinents (`npm run list`, scripts sous `scripts/`).
      4. Réponds avec les fichiers clés, les relations, les usages, les risques et la prochaine action utile.
    /open-ui-impact: |
      Analyse l'impact avant modification.

      1. Clarifie l'élément touché et le type de changement attendu.
      2. Cherche les usages composants/pages/tokens : lecture directe + `npm run impact <nom>` si applicable.
      3. Distingue les options : changement global, prop optionnelle, variante dédiée, patch page/local ou esquisse.
      4. Signale pages/composants/tokens touchés, risques visuels/a11y, validations nécessaires.
      5. Si l'impact dépasse une page ou l'intention est ambiguë, arrête-toi et demande validation avant d'écrire.
    /open-ui-modify: |
      Modifie Open UI comme gardien du design system.

      1. Lis la demande et identifie la cible réelle : page, composant, variante, instance, collection, token, script ou doc.
      2. Avant d'écrire, lis les fichiers concernés et vérifie les usages. Si la cible est partagée, annonce l'impact et demande confirmation si global/optionnel/variante n'est pas évident.
      3. Choisis le niveau durable : token, composant, variante, composition, page ou esquisse. Réutilise avant de créer.
      4. Applique le changement minimal cohérent avec les tokens et conventions.
      5. Valide : `npm run validate`; ajoute `npm run lint:scss`, `npm run build`, `npm run impact <nom>` selon le risque.
      6. Si UI visible, vérifie au navigateur : demande satisfaite, rendu, interaction, responsive évident, orthographe/libellés.
      7. Réponds avec changements, impacts, validations, preuve visuelle et risques restants.
    /open-ui-create-component: |
      Crée un composant Open UI seulement après avoir vérifié qu'une réutilisation ou une variante ne suffit pas.

      1. Cherche les composants proches et les patterns existants.
      2. Décide composant canonique, variante ou composition.
      3. Crée les fichiers attendus (`.twig`, `.json`, `.md`, SCSS si nécessaire) et documente les relations.
      4. Mets à jour les imports et lance les validations pertinentes.
    /open-ui-sketch: |
      Utilise cette commande quand l'utilisateur veut explicitement une maquette libre, une exploration visuelle, un brouillon ou un test de direction sans intégrer immédiatement au design system.

      Intention : produire une esquisse utile pour explorer une direction, pas un composant canonique. Le résultat peut être plus libre, mais doit rester visualisable, lisible et clairement séparé du design system stable.

      Protocole :
      1. Clarifier l'objectif exploratoire si nécessaire : direction visuelle, type de page/composant, public, contenu minimal, contrainte forte.
      2. Avant de designer, fixer une mini-spec en 5 décisions : persona principal, cas d'usage prioritaire, écran livré, ton visuel, composants indispensables.
      3. Charger `design-sketching` si la demande implique de la divergence créative ou plusieurs directions.
      4. Annoncer que le travail est une esquisse hors DS canonique.
      5. Ne pas modifier un composant canonique, un token global ou une convention partagée sans confirmation explicite.
      6. Placer les fichiers HTML/CSS/JS autonomes dans `public/sketches/<slug>/`, jamais dans `dev/sketches/`.
      7. Ne jamais livrer un bloc complet HTML/CSS en conversation comme résultat final : le livrable doit être écrit dans les fichiers du sketch.
      8. Réutiliser les tokens/patterns existants quand ça aide, mais ne pas brider l'exploration au point de tuer la recherche visuelle.
      9. Éviter le dashboard générique : le premier viewport doit contenir au moins 3 éléments spécifiques au métier du produit.
      10. Vérifier le rendu réel au navigateur si une UI est produite : ouvrir la page, contrôler le contenu visible et prendre une capture.
      11. Relire la capture comme un objet visuel : hiérarchie, rythme, densité, alignements, lisibilité, personnalité, responsive évident, impression générale.
      12. Livrer seulement après une passe produire → screenshot → critique → correction raisonnable.
      13. La sortie finale doit donner un verdict factuel : `livrable visuellement validé` ou `non livrable / à corriger`.
      14. Terminer par une section : `À consolider si on garde cette direction`.

      Sortie attendue : ce qui a été esquissé, où se trouve l'esquisse, preuve visuelle si possible, limites assumées, éléments à consolider.
    /open-ui-consolidate-sketch: |
      Utilise cette commande quand l'utilisateur veut transformer une esquisse ou une direction retenue en production.

      Intention : faire passer une maquette libre par un sas de consolidation avant intégration au design system canonique. Le but n'est pas de copier le sketch, mais d'en extraire un contrat durable.

      Protocole :
      1. Charger le skill `sketch-to-production`.
      2. Identifier la source : sketch, direction, fichier, capture ou retour utilisateur.
      3. Relire la section "À consolider si on garde cette direction" si elle existe.
      4. Cartographier les composants, variantes, tokens et pages proches.
      5. Décider le niveau d'intégration : composant canonique, variante, composition, page locale, token ou pattern documenté.
      6. Annoncer la décision et les impacts si le changement est transversal.
      7. Implémenter avec les garde-fous `open-ui` : fichiers attendus, docs, imports, impact, validations.
      8. Appliquer `rgaa` pour toute UI interactive, formulaire, navigation, tableau, media ou page complète.
      9. Vérifier visuellement le rendu navigateur.
      10. Utiliser `design-memory` si la direction devient une décision projet durable.

      Sortie attendue : source consolidée, choix d'intégration, changements effectués, impacts et validations, preuve visuelle si disponible, ce qui reste volontairement hors production.

      Anti-déclencheurs : ne pas utiliser pour explorer de nouvelles directions (utiliser `/open-ui-sketch`) ni pour une correction ordinaire d'un composant déjà canonique (utiliser `/open-ui-modify`). Ne pas promouvoir une esquisse sans décision utilisateur claire.
    /open-ui-check: |
      Vérifie l'état Open UI.

      1. Inspecte les changements ou la cible demandée.
      2. Lance au minimum `npm run validate` si le projet est prêt.
      3. Ajoute `npm run lint:scss`, `npm run build`, `npm run list` ou `npm run impact <nom>` selon le risque.
      4. Si une UI visible a changé, ouvre la page au navigateur et vérifie rendu, interaction et libellés.
      5. Résume validations passées, impacts, preuve visuelle, échecs et corrections proposées.
    /open-ui-review: |
      Relis une modification avec un angle produit + design system.

      1. Vérifie l'intention : la modification répond-elle vraiment à la demande ?
      2. Vérifie le niveau de changement : page, composant, variante, token ; signale si une variante/prop aurait été plus juste.
      3. Vérifie les impacts : parents/enfants, pages touchées, tokens, accessibilité, dette.
      4. Si UI visible, inspecte au navigateur ou via capture : hiérarchie, alignement, densité, contraste, responsive évident, interaction.
      5. Relis les libellés : orthographe, accents, microcopy ; propose 2-3 options si subjectif.
      6. Contrôle les validations exécutées ou manquantes.
      7. Réponds d'abord avec bugs/risques, puis améliorations utiles, puis ce qui est OK.
    /open-ui-rgaa-check: |
      Vérifie une cible Open UI avec la vision RGAA généraliste.

      1. Cartographie la cible Open UI : page, composant, variante, instance, template ou token touché.
      2. Identifie les composants/pages impactés avec lecture directe et `npm run impact <nom>` si pertinent.
      3. Utilise le skill `rgaa` : composant -> `rgaa-check-component`, page/template -> `rgaa-check-page`, diff -> `rgaa-review`.
      4. Relie les constats RGAA au modèle Open UI : faut-il corriger le composant canonique, une variante, la page, la doc ou un usage consommateur ?
      5. Valide avec les commandes Open UI adaptées et réponds avec impacts design system, risques RGAA, validations et limites manuelles.
    /open-ui-cleanup: |
      Nettoie Open UI avec prudence.

      1. Cherche toutes les occurrences avant suppression ou renommage.
      2. Vérifie scripts, docs, dépendances, tokens et usages runtime.
      3. Évite les renommages massifs sans migration contrôlée.
      4. Lance les validations adaptées et liste ce qui a été supprimé, conservé ou laissé en attente.
    /open-ui-docs: |
      Mets à jour la documentation Open UI.

      1. Identifie la doc source concernée dans `docs/` ou les `.md` de composants.
      2. Aligne la documentation sur le code réel et les scripts disponibles.
      3. Évite les pages génériques inutiles ; écris des règles opératoires et vérifiables.
      4. Résume les docs modifiées et les écarts restants entre code et documentation.
    /open-ui-critic: |
      Utilise cette commande après une livraison Open UI critiquée par l'utilisateur.

      Objectif : transformer le retour critique en apprentissage réutilisable, corriger si nécessaire, et éviter les doublons entre `MEMORY.md` et les skills.

      Workflow :
      1. Relire la demande initiale, le résultat livré et le retour utilisateur.
      2. Vérifier les faits observables dans fichiers, scripts, rendu navigateur ou docs avant de conclure.
      3. Classer chaque point en : échec, réussite, réussite améliorable, décision produit.
      4. Si le retour demande une correction, l'exécuter avec le workflow Open UI standard.
      5. Utiliser `design-critique` si le retour concerne composition, hiérarchie, caractère, densité, interaction ou accessibilité visuelle.
      6. Utiliser `design-memory` pour décider où stabiliser l'apprentissage (direction stabilisée, provenance, ou règle de skill).
      7. Si une règle est désormais dans la direction stabilisée ou un skill, compacter ou supprimer l'entrée doublon de `MEMORY.md`.
      8. Répondre avec corrections faites, apprentissages ajoutés/compactés, validations exécutées, points ouverts.
---

# Skill projet : Open UI

Ce skill guide l'agent AMK dans Open UI comme gardien prudent du design system, pas comme simple exécutant rapide.

## Intention produit

Open UI est un framework agentique de design/dev UI sans friction : l'agent conçoit directement en Twig/SCSS/JS, dans un workspace de design system lisible, réutilisable et contrôlé.

L'effort premier porte sur la structure durable du projet : comprendre les composants, réutiliser avant de créer, modifier au bon niveau, préserver les tokens et prévenir clairement des impacts. Open UI doit aussi permettre des maquettes libres en début de projet, mais ce tunnel est séparé du design system canonique et doit être déclenché explicitement.

## Posture

- Protéger le design system avant de fermer vite la demande.
- Agir quand l'intention est claire, mais accepter de perdre un tour pour vérifier l'impact ou l'intention produit.
- Ne pas appliquer tête baissée une demande qui touche un composant partagé, un token transversal, une variante ou une convention structurante.
- Informer l'utilisateur des impacts et des alternatives pertinentes avant les changements transversaux.
- Distinguer le travail canonique du design system et le brouillon exploratoire : par défaut, rester en mode design system ; n'entrer en maquette libre que via déclencheur explicite.

## Sources de vérité projet

- `GUIDELINES_AI.md` : règles générales pour agents.
- `MEMORY.md` : source projet unique pour direction design stabilisée, décisions et provenance des retours critiques, compactée sans doublons.
- `docs/component-model.md` : modèle composants/pages/relations.
- `docs/impact-analysis.md` : protocole d'analyse d'impact.
- `docs/agent-workflow.md` : workflow agent-first.
- `docs/design-tokens.md` : règles tokens/design system.
- `docs/project-workspaces.md` : cible multi-projets.
- `docs/sketches.md` : différence esquisse vs composant canonique et tunnel maquette libre.
- `.agents/skills/rgaa/` : revue RGAA generaliste pour composants, pages, formulaires, navigation et interactions.
- `.agents/skills/design-sketching/` : divergence créative en mode esquisse.
- `.agents/skills/sketch-to-production/` : consolidation d'une esquisse retenue vers composant, variante, page, token ou pattern canonique.
- `.agents/skills/design-critique/` : relecture UI/UX et diagnostic visuel.
- `.agents/skills/design-memory/` : maintien de `MEMORY.md` et promotion des apprentissages.
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
- Ne jamais présenter une maquette libre comme un composant stable : elle doit être isolée, marquée exploratoire et non référencée par défaut dans le design system canonique.

## Modes de travail

### Mode design system — par défaut

Toute demande normale sur une page, un composant, une variante, une navigation, un token, un formulaire ou un listing est traitée en mode design system : prudence, réutilisation, impact, validation, documentation et cohérence durable.

Même si l'utilisateur demande vite une modification, ne pas basculer en maquette libre sans signal clair. Une demande vague ne signifie pas "improvise librement" ; elle signifie souvent "cadre d'abord".

### Mode maquette libre — `/open-ui-sketch` uniquement

Le mode maquette libre sert à tester une direction visuelle ou produit en début de projet. Il est volontairement séparé du design system canonique.

Déclencheurs acceptés : commande `/open-ui-sketch` ou demande explicite du type "maquette libre", "exploration visuelle", "brouillon", "sketch", "teste une direction sans intégrer au DS".

Dans ce mode :

- charger le skill `design-sketching` si l'objectif est de chercher plusieurs directions créatives ;
- produire une esquisse utile et visuelle, mais clairement marquée comme brouillon exploratoire ;
- ne pas modifier un composant canonique, un token global ou une convention partagée sans confirmation explicite ;
- ne pas référencer l'esquisse comme composant stable ;
- privilégier un emplacement/tunnel dédié aux esquisses ;
- documenter ce qu'il faudrait consolider ensuite : composants à extraire, tokens à créer, variantes à stabiliser, impacts à analyser, points RGAA à reprendre.

Sortie attendue du mode sketch : une proposition visualisable + une section "À consolider si on garde cette direction".

### Mode consolidation — `/open-ui-consolidate-sketch` uniquement

Le mode consolidation sert quand une esquisse ou direction retenue doit devenir production. Il est distinct du mode sketch : on ne cherche plus de nouvelles directions, on extrait un contrat durable.

Déclencheurs acceptés : commande `/open-ui-consolidate-sketch` ou demande explicite du type "on garde ce sketch", "passe cette maquette en composant", "industrialise cette direction", "integre cette piste dans le design system", "consolide l'esquisse".

Dans ce mode :

- charger le skill `sketch-to-production` ;
- relire le sketch source et sa section "À consolider si on garde cette direction" si elle existe ;
- décider le niveau d'intégration : composant canonique, variante, composition, page locale, token ou pattern documenté ;
- cartographier les composants/tokens/pages proches avant de créer ;
- ne pas copier-coller le code expérimental comme production ;
- appliquer les garde-fous Open UI : impact, docs, validations, RGAA et vérification visuelle ;
- utiliser `design-memory` si la direction devient une décision projet durable.

Sortie attendue du mode consolidation : source retenue + choix d'intégration + fichiers modifiés + impacts/validations + preuve visuelle + ce qui reste hors production.

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

Le tunnel recommandé pour les esquisses est la commande `/open-ui-sketch`. Hors de cette commande, ne pas considérer une demande floue comme autorisation de faire une maquette libre : cadrer ou rester dans le design system.

## Nettoyage

Pour supprimer ou renommer une trace ancienne, vérifier : occurrences code/docs, dépendances, scripts npm, build/validation, compatibilité avec attributs/protocoles existants. Ne pas renommer massivement un protocole comme `data-gf-*` sans migration contrôlée.

## Boucle critique utilisateur

Quand l'utilisateur critique une livraison Open UI :

1. Ne pas défendre le travail par réflexe : vérifier les faits observables.
2. Classer le retour en `échec`, `réussite`, `réussite améliorable` ou `décision produit`.
3. Corriger le livrable si une action est attendue.
4. Utiliser `design-critique` si le retour porte sur la qualité visuelle, la composition ou le fit produit.
5. Utiliser `design-memory` pour décider quoi stabiliser dans `MEMORY.md`, quoi garder comme provenance, et quoi transformer en règle de skill.
6. Compacter/fusionner les doublons plutôt qu'empiler l'historique.

## Commandes

Les commandes dans `core/` sont préfixées par `open-ui-` pour rester lisibles dans `/help` et éviter les collisions. Elles doivent agir réellement : lire, modifier si demandé, tester et résumer.
