# Open UI — mémoire de collaboration

Ce fichier garde seulement les apprentissages concrets ou décisions produit qui ne sont pas déjà intégrés dans le skill projet `open-ui`.

## Principe

Après une demande réalisée puis critiquée par l'utilisateur :

- corriger le livrable si nécessaire ;
- promouvoir les règles générales dans `.marius/skills/open-ui/SKILL.md` ;
- garder ici uniquement les cas concrets, décisions utilisateur ou vigilances non couvertes ailleurs ;
- compacter/fusionner les doublons plutôt que transformer ce fichier en journal.

## Entrées


### 2026-05-24 — Cadrage insuffisant avant création de contenu UI

**Contexte**  
Sur une demande de page/listing avec cards, filtres et actions, le résultat pouvait être correct visuellement mais trop improvisé faute de cadrage préalable.

**À retenir**
- Quand une demande ne précise pas les données, critères de filtres, actions des cards ou périmètre, il faut prendre un tour pour cadrer au lieu de combler les vides.
- Une page correcte ne suffit pas si les choix produit structurants ont été inventés sans validation utilisateur.

**Suite utile**
- La règle générale est intégrée dans le skill projet : repérer les vides produit et poser les questions minimales avant d'implémenter.

### 2026-05-24 — Exemples fondateurs de la boucle critique

**Contexte**  
Les premiers retours critiques ont porté sur deux cas : ajout d'un champ `Tél. fixe` dans la page formulaire, puis ajout d'une bascule clair/sombre dans `header-nav`.

**À retenir**
- Le champ `Tél. fixe` a validé le bon niveau de modification pour une page : réutiliser `input`, ajouter l'instance dans `form.json`, adapter la grille responsive, puis vérifier visuellement.
- Le wording email a établi une préférence : ne pas ajouter des aides inutiles pour équilibrer une grille ; préférer une microcopy plus courte et utile.
- La bascule clair/sombre a révélé un risque produit : `header-nav` est partagé par `form` et `listing`; une demande sur le menu peut nécessiter une confirmation global/optionnel/variante avant modification.

**Suite utile**
- Les règles générales issues de ces retours sont maintenant dans le skill projet `open-ui`; ne pas les dupliquer ici sauf nouveau cas concret ou décision produit.
