# Déployer sur Render.com

Voici les étapes pour déployer votre application Next.js sur Render.com.

## 1. La Base de Données (PostgreSQL)

Actuellement, votre application utilise **SQLite** (`dev.db`). SQLite est un fichier stocké sur le disque.
**Problème :** Sur Render (et la plupart des hébergeurs cloud), le système de fichiers est "éphémère". Cela signifie qu'à chaque redémarrage ou déploiement, tous les fichiers créés (comme votre base de données) sont effacés.
**Solution :** Vous devez utiliser une base de données externe comme **PostgreSQL**. Render offre une instance PostgreSQL gratuite.

### Étapes pour la base de données :
1.  Créez un compte sur [Render.com](https://render.com/).
2.  Cliquez sur **"New +"** et sélectionnez **"PostgreSQL"**.
3.  Donnez un nom (ex: `book-box-db`).
4.  Choisissez le plan **"Free"**.
5.  Une fois créée, copiez l'**Internal Database URL** (pour le déploiement) et l'**External Database URL** (si vous souhaitez y accéder depuis votre ordinateur).

## 2. Préparer le Code (Prisma)

Vous devez modifier `prisma/schema.prisma` pour utiliser PostgreSQL au lieu de SQLite.

**Attention :** Une fois cette modification effectuée, votre base de données locale `dev.db` ne fonctionnera plus directement avec ce schéma. Il est recommandé d'utiliser PostgreSQL aussi en local, ou de gérer deux configurations (plus complexe).

### Modifications à faire :

Dans `prisma/schema.prisma` :

```prisma
datasource db {
  provider = "postgresql" // Remplace "sqlite"
  url      = env("DATABASE_URL")
}
```

## 3. Configuration du Service Web sur Render

1.  Sur le dashboard Render, cliquez sur **"New +"** -> **"Web Service"**.
2.  Connectez votre dépôt GitHub/GitLab.
3.  **Name** : `my-book-box-app` (ou autre).
4.  **Runtime** : `Node`.
5.  **Build Command** :
    ```bash
    npm install && npx prisma generate && npm run build
    ```
    *Note : `npx prisma generate` est important pour créer le client Prisma compatible avec l'environnement Render.*
6.  **Start Command** :
    ```bash
    npm start
    ```
    *Optionnel : Pour appliquer les migrations automatiquement au démarrage, utilisez :*
    ```bash
    npx prisma migrate deploy && npm start
    ```

## 4. Variables d'Environnement

Dans la configuration du Web Service sur Render, allez dans l'onglet **"Environment"** et ajoutez :

*   **Key** : `DATABASE_URL`
*   **Value** : (Collez l'**Internal Database URL** de votre base PostgreSQL créée à l'étape 1).
*   **Key** : `NODE_ENV`
*   **Value** : `production`

## 5. Migration des Données

Lors du premier déploiement, la base de données sera vide. La commande `npx prisma migrate deploy` dans le *Start Command* se chargera de créer les tables.

Si vous avez besoin de données initiales (comme vos "sponsored books" s'ils sont en DB, ou des catégories), vous devrez peut-être exécuter un script de "seed" ou les ajouter manuellement.
