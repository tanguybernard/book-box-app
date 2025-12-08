# Règles et Standards du Projet

## Stack Technique
- **Framework** : Next.js 16 (App Router)
- **Langage** : TypeScript (Strict mode)
- **Styling** : Tailwind CSS v4
- **Base de données** : PostgreSQL (via Docker en local sur port 5433)
- **ORM** : Prisma
- **Cartographie** : Leaflet

## Architecture (Clean Architecture)
Ce projet suit les principes de la Clean Architecture. Tu dois respecter strictement la séparation des couches :

1.  **Core (/core)** :
    - Contient la logique métier, les entités et les règles.
    - **INTERDIT** : D'importer du code React, Next.js, ou des librairies d'infrastructure (Prisma, etc.).
    - Doit rester pur et testable isolément.

2.  **Infrastructure (/infrastructure)** :
    - Implémente les interfaces définies dans le Core (ex: Repositories).
    - Gère les accès aux données (Prisma, API Google Books).
    - C'est ici que prisma est importé.

3.  **App / Interface (/app)** :
    - Couche de présentation (React/Next.js).
    - Utilise les UseCases du Core.
    - Injecte les dépendances de l'Infrastructure dans le Core.

## Bonnes Pratiques de Code
- **Typage** : Utiliser des types explicites. any est proscrit.
- **Nommage** :
    - Composants : PascalCase
    - Fonctions/Variables : camelCase
    - Fichiers : kebab-case ou PascalCase (pour les composants).
- **Asynchrone** : Préférer async/await.
- **Imports** : Utiliser les alias @/core, @/infrastructure, @/app.

## Comportement Attendu de l'IA
- **Langue** : Répondre en Français (sauf si l'utilisateur change de langue).
- **Vérification** : Toujours vérifier la cohérence avec le schema.prisma.
- **Sécurité** : Ne jamais hardcoder de secrets/mots de passe, utiliser .env.

