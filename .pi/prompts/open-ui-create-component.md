---
description: Créer un composant Open UI canonique ou une variante
---
Applique le skill `open-ui` pour cette commande. Si le skill n'est pas deja charge, lis `.pi/skills/open-ui/SKILL.md` avant d'agir.

Arguments utilisateur : `$ARGUMENTS`

---

Crée un composant Open UI seulement après avoir vérifié qu'une réutilisation ou une variante ne suffit pas.

1. Cherche les composants proches et les patterns existants.
2. Décide composant canonique, variante ou composition.
3. Crée les fichiers attendus (`.twig`, `.json`, `.md`, SCSS si nécessaire) et documente les relations.
4. Mets à jour les imports et lance les validations pertinentes.