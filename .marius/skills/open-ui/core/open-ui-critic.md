---
description: Intégrer un retour critique utilisateur dans MEMORY.md et corriger le livrable
---
Utilise cette commande après une livraison Open UI critiquée par l'utilisateur.

Objectif : transformer le retour critique en apprentissage réutilisable, corriger si nécessaire, et éviter les doublons avec le skill.

Workflow :

1. Relire la demande initiale, le résultat livré et le retour utilisateur.
2. Vérifier les faits observables dans fichiers, scripts, rendu navigateur ou docs avant de conclure.
3. Classer chaque point en :
   - échec : erreur réelle, oubli, mauvaise décision, vérification insuffisante ;
   - réussite : comportement à reproduire ;
   - réussite améliorable : bonne direction mais finition/cadrage/validation insuffisants ;
   - décision produit : préférence durable ou arbitrage utilisateur.
4. Si le retour demande une correction, l'exécuter avec le workflow Open UI standard.
5. Ajouter à `MEMORY.md` seulement ce qui n'est pas déjà couvert par `SKILL.md` ou ce qui documente une décision/problème concret utile.
6. Si une règle générale est désormais dans `SKILL.md`, compacter ou supprimer l'entrée doublon de `MEMORY.md`.
7. Répondre avec corrections faites, apprentissages ajoutés/compactés, validations exécutées, points ouverts.

Format d'entrée si nécessaire :

```markdown
### YYYY-MM-DD — Sujet court

**Contexte**  
[Demande initiale + retour critique en une ou deux phrases.]

**À retenir**
- [Décision ou apprentissage non déjà couvert par le skill.]

**Suite utile**
- [Optionnel : correction ou vigilance future.]
```
