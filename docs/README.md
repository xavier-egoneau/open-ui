# Open UI Docs

Ces documents posent les contrats du projet. `GUIDELINES_AI.md` reste le document universel chargeable par un agent, mais les sujets structurants vivent ici pour rester lisibles.

## Documents

- `component-model.md` : modele composant, structure JSON/Twig/MD/SCSS, relations.
- `impact-analysis.md` : comment evaluer et annoncer les impacts d'une modification.
- `agent-workflow.md` : workflow attendu d'un agent qui modifie Open UI.
- `design-tokens.md` : role et regles des tokens de design.
- `project-workspaces.md` : cible multi-projets, non appliquee pour l'instant.
- `sketches.md` : difference entre esquisse exploratoire et composant canonique.
- `sketch-to-canonical.md` : procedure pour transformer une esquisse selectionnee en composant ou pattern canonique.

## Regle

Les sources de gouvernance ont des roles distincts :

- `MEMORY.md` : direction locale stabilisee, decisions produit/design et provenance des critiques.
- `GUIDELINES_AI.md` : regles minimales de contribution chargeables par un agent.
- `docs/` : contrats detailles et procedures structurantes.
- `.marius/skills/` et `.pi/skills/` : comportements agents reutilisables, sans journal de decisions.

Quand une decision devient durable, elle doit etre refletee soit dans ces docs, soit dans `GUIDELINES_AI.md` si elle concerne directement les agents contributeurs. Si elle vient d'un retour critique local, garder la provenance compacte dans `MEMORY.md` et promouvoir uniquement les comportements reutilisables dans les skills.
