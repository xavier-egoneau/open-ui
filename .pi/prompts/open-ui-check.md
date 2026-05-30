---
description: Vérifier cohérence, rendu et validations Open UI
---
Applique le skill `open-ui` pour cette commande. Si le skill n'est pas deja charge, lis `.pi/skills/open-ui/SKILL.md` avant d'agir.

Arguments utilisateur : `$ARGUMENTS`

---

Vérifie l'état Open UI.

1. Inspecte les changements ou la cible demandée.
2. Lance au minimum `npm run validate` si le projet est prêt.
3. Ajoute `npm run lint:scss`, `npm run build`, `npm run list` ou `npm run impact <nom>` selon le risque.
4. Si une UI visible a changé, ouvre la page au navigateur et vérifie rendu, interaction et libellés.
5. Résume validations passées, impacts, preuve visuelle, échecs et corrections proposées.