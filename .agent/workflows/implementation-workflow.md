---
description: Workflow standard pour l'implémentation de fonctionnalités avec respect strict des règles (SOLID, Tests).
---

# Workflow d'Implémentation de Fonctionnalité

Ce workflow guide l'implémentation de toute nouvelle fonctionnalité ou modification significative, en garantissant le respect des règles du projet (SOLID, Tests).

## 1. Analyse et Planification
- [ ] Analyser la demande de l'utilisateur.
- [ ] Créer ou mettre à jour un fichier `task.md` pour découper le travail.
- [ ] Rédiger un `implementation_plan.md` si la tâche est complexe.
- [ ] **SOLID Check (Pré-implémentation)** : Vérifier que l'architecture prévue respecte les principes SOLID (SRP, OCP, LSP, ISP, DIP).

## 2. Implémentation
- [ ] Écrire le code en suivant les spécifications.
- [ ] Appliquer les modifications fichier par fichier.

## 3. Tests Obligatoires (Politique "Testing First/Concurrent")
> **RAPPEL :** Ne jamais considérer une tâche comme finie sans tests validés.

- [ ] Créer ou mettre à jour le fichier de test correspondant (ex: `Component.test.tsx` ou `logic.test.ts`).
- [ ] Exécuter les tests via `npm test` ou `npx vitest`.
- [ ] Corriger le code jusqu'à ce que les tests passent (Green).

## 4. Vérification et Solidité
- [ ] **SOLID Audit (Post-implémentation)** : Relire le code généré.
    - Est-ce que chaque classe/fonction a une responsabilité unique ?
    - Le code est-il ouvert à l'extension mais fermé à la modification ?
- [ ] Vérification manuelle (via `browser` tool si applicable) ou lecture des logs.

## 5. Finalisation
- [ ] Mettre à jour `walkthrough.md` avec les preuves de fonctionnement (screenshots, logs de tests).
- [ ] Notifier l'utilisateur.
