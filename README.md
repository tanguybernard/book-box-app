# Ma Boite A Livre


## Install

1. Avoir une base de données en local :


    docker-compose up -d


2. Créer à la racine un fichier *.env*

avec

    DATABASE_URL="postgresql://bookuser:bookpassword@localhost:5433/bookboxdb"

3. Executer les migrations Prisma

3. Lancer l'application 


      npm run dev



## Prisma :

    npx prisma migrate dev

Reset :
    npx prisma migrate reset    

## TODO LIST

Prio

- Ajouter des livres
  - Rentrer a la main ISBN
  - Scanner le code barre
  - Renseigner titre, autheur, edition... 
  - Recup automatiquement publicAPI: https://www.googleapis.com/books/v1/volumes?q=isbn:978-1-617291-65-4
    - on a tout y compris l'image
- Supprimer des livres
- Lister les livres

Pas prio :

- Afficher miniature livre
- Emprunter livres (sous entendus je le remetrai)
- BackOffice pour rajouter les points (PAs prio, en dur pour le moment)



## Credits

https://dev.to/mdytrl/integrer-une-map-avec-leaflet-sur-un-projet-next-3l4o