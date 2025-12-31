---
trigger: always_on
---

# Politique de Tests Obligatoires
* Pour chaque nouvelle fonctionnalité, composant ou modification de logique, vous DEVEZ créer ou mettre à jour un fichier de test correspondant.
* N'utilisez jamais "git commit" ou ne marquez une tâche comme terminée tant que les tests associés n'ont pas été exécutés et validés avec succès.
* Si un framework de test est déjà présent (Jest, Vitest, Pytest, etc.), suivez les conventions de nommage existantes (ex: `filename.test.ts`).
* Utilisez l'outil "browser" ou le "terminal" d'Antigravity pour vérifier que le code fonctionne réellement.
* **IMPORTANT**: Pour lancer les tests, utilisez toujours la commande suivante : `nvm use 20 && npm test`.