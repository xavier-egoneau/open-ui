---
description: Nettoyer traces mortes et incohérences Open UI
---
Applique le skill `open-ui` pour cette commande. Si le skill n'est pas deja charge, lis `.pi/skills/open-ui/SKILL.md` avant d'agir.

Arguments utilisateur : `$ARGUMENTS`

---

Nettoie Open UI avec prudence.

1. Cherche toutes les occurrences avant suppression ou renommage.
2. Vérifie scripts, docs, dépendances, tokens et usages runtime.
3. Évite les renommages massifs sans migration contrôlée.
4. Lance les validations adaptées et liste ce qui a été supprimé, conservé ou laissé en attente.