---
name: rgaa
description: Skill RGAA generaliste base sur la methode officielle RGAA 4.1.2. A utiliser pour prevenir, relire ou corriger l'accessibilite de composants UI, bibliotheques de composants, pages HTML/Twig, formulaires, navigation, scripts/interactions, images, tableaux et contenus. Ne remplace pas un audit legal complet.
commands: rgaa-check-component, rgaa-check-page, rgaa-review, rgaa-map-criteria
amk:
  command_descriptions:
    /rgaa-check-component: Vérifier un composant UI avec une lecture RGAA généraliste
    /rgaa-check-page: Vérifier une page ou un template avec une lecture RGAA généraliste
    /rgaa-review: Relire un changement avec un angle RGAA
    /rgaa-map-criteria: Relier une cible UI aux thématiques RGAA pertinentes
  command_prompts:
    /rgaa-check-component: |
      Vérifie un composant selon le RGAA sans promettre d'audit complet.

      1. Lis le template, les styles, le JS éventuel, la doc et les usages du composant.
      2. Charge les références RGAA utiles selon la famille du composant.
      3. Contrôle sémantique, nom accessible, clavier, focus, états, contrastes évidents, erreurs et documentation.
      4. Si possible, teste le rendu au navigateur et les interactions clavier.
      5. Réponds avec `Bloquant`, `A corriger`, `A vérifier manuellement`, `OK / Non applicable`, en citant fichiers/lignes.
    /rgaa-check-page: |
      Vérifie une page selon le RGAA sans promettre d'audit complet.

      1. Lis la page/template, les composants inclus, styles et scripts pertinents.
      2. Charge `socle.md`, `navigation-structure.md`, puis les références des zones présentes.
      3. Contrôle langue, titre, landmarks, titres, liens, navigation, formulaires, images, tableaux, consultation responsive et clavier.
      4. Ouvre le rendu si possible et teste les parcours visibles.
      5. Classe les constats par sévérité et signale les tests manuels restants.
    /rgaa-review: |
      Relis une modification existante avec l'angle RGAA.

      1. Inspecte le diff et la cible utilisateur.
      2. Identifie les thèmes RGAA concernés.
      3. Vérifie si le changement dégrade ou améliore sémantique, clavier, focus, labels, erreurs, alternatives, navigation ou consultation.
      4. Priorise les régressions observables et les manques de tests.
      5. Réponds d'abord avec les risques/problèmes, puis les corrections proposées et validations manquantes.
    /rgaa-map-criteria: |
      Cartographie les thématiques RGAA d'une cible.

      1. Identifie la nature de la cible : image, lien, script, formulaire, navigation, tableau, page, contenu.
      2. Liste les thématiques RGAA pertinentes parmi les 13.
      3. Indique les références du skill à charger.
      4. Propose les contrôles concrets à faire et ce qui restera manuel.
---

# Skill RGAA

Ce skill applique une lecture operationnelle du RGAA a des composants et pages web generalistes. Il aide a concevoir, relire et corriger ; il ne certifie pas une conformite RGAA complete.

## Sources officielles

- Methode technique RGAA : https://accessibilite.numerique.gouv.fr/methode/
- Criteres et tests : https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/
- Introduction : https://accessibilite.numerique.gouv.fr/methode/introduction/
- Environnement de test : https://accessibilite.numerique.gouv.fr/methode/environnement-de-test/

Base courante a la creation de ce skill : RGAA 4.1.2. La page officielle signale que le RGAA 5 est en cours de redaction avec publication prevue fin 2026 ; cela ne suspend pas les travaux d'accessibilite.

## Posture

- Distinguer prevention RGAA, revue agentique et audit officiel.
- Ne pas promettre "conforme RGAA" sans audit complet, echantillon, environnement de test et verification humaine.
- Travailler sur le code reel : HTML/Twig, CSS/SCSS, JS, rendu navigateur et documentation composant.
- Preferer le natif HTML accessible avant ARIA. ARIA complete une semantique absente ; elle ne repare pas une structure incoherente.
- Pour les composants de bibliotheque, documenter les obligations d'usage : contenu attendu, libelles, alt, associations, contraintes clavier, limites.

## Workflow Rapide

1. Identifier la cible : composant, page, template, interaction JS, formulaire, navigation, tableau, image/media ou contenu.
2. Lire le rendu et les sources concernees.
3. Charger seulement les references utiles :
   - socle et thematiques : `references/socle.md`
   - composants interactifs/scripts : `references/scripts-aria-clavier.md`
   - formulaires : `references/formulaires.md`
   - navigation/structure/page : `references/navigation-structure.md`
   - images/icones/medias : `references/images-icones-medias.md`
   - tableaux/listes : `references/tableaux-listes.md`
   - limites audit vs prevention : `references/audit-vs-prevention.md`
4. Tester ce qui est verifiable : semantique, nom accessible, roles/etats, ordre de titres, focus visible, clavier, erreurs, contrastes evidents, zoom/reflow si pertinent.
5. Classer les constats : `Bloquant`, `A corriger`, `A verifier manuellement`, `Non applicable`.
6. Corriger si la demande appelle une modification ; sinon livrer une revue avec fichiers/lignes, risques et tests manquants.

## Socle Minimal

Tout composant ou page doit au minimum verifier :

- HTML valide et semantique pour l'usage.
- Nom accessible des elements interactifs.
- Focus visible et ordre de focus logique.
- Fonctionnement clavier pour toute interaction.
- Etat, role et valeur perceptibles pour composants custom.
- Contraste suffisant pour texte, etats et focus.
- Labels et aides associes aux champs.
- Erreurs de formulaire identifiables, expliquees et reliees au champ.
- Alternatives aux images informatives ; `alt=""` pour images decoratives.
- Liens explicites hors contexte si possible, ou contexte programmatique fiable.
- Structure de titres et landmarks coherente pour les pages.

## Sortie Attendues

Pour une revue :

```markdown
Bloquant
- [fichier:ligne] Probleme, impact utilisateur, correction proposee, theme RGAA.

A corriger
- ...

A verifier manuellement
- ...

Non applicable / OK notable
- ...
```

Pour une correction :

- annoncer le risque RGAA traite ;
- modifier le minimum de fichiers ;
- mettre a jour la doc composant si le comportement accessible fait partie du contrat ;
- lancer les validations disponibles et signaler ce qui reste manuel.
