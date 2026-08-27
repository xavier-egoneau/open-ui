---
description: Analyser les impacts Open UI avant changement
---
Analyse l'impact avant modification.

1. Clarifie l'élément touché et le type de changement attendu.
2. Cherche les usages composants/pages/tokens : lecture directe + `npm run impact <nom>` si applicable.
3. Distingue les options : changement global, prop optionnelle, variante dédiée, patch page/local ou esquisse.
4. Signale pages/composants/tokens touchés, risques visuels/a11y, validations nécessaires.
5. Si l'impact dépasse une page ou l'intention est ambiguë, arrête-toi et demande validation avant d'écrire.
