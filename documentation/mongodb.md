# MongoDB

## MongoDB C'est quoi ?

MongoDB est un système de base de données non relationnelle.

Ce système à l'avantage d'être flexible, de pouvoir être déployé sur plusieurs serveurs contrairement au modèle SQL

## Téléchargement et installation


Pour télécharger MongoDB, il faut se rendre sur le site officiel, puis ans l'onglet "products" puis "Community Server" puis télécharger la dernière version.

L'installation comprendra Compass qui est l'interface graphique pour les bases de données. (L'équivalent de phpMyAdmin pour sql)

Sur Compass, nous allons d'abord créer une base de données que l'on appellera "toto" et dans laquelle nous allons créer une nouvelle collection appelée "users".

Les collections sont comparables aux tables d'une base de données relationnelle.

Les données avec MongoDB sont gérées en JSON.

Une fois une collection mise en place on peut soit importer des fichiers, soit ajouter à la main des données, nous allons créer l'utilisateur John Doe. L'id sera automatique et vous voyez qu'il est plus complexe qu'un id sous sql.

```json
_id: ObjectId('000000000000000000000000'),
"name" : "Doe",
"first_name" : "John"
```

Nous avons notre premier utilisateur qui a pour propriétés un nom et un prénom.

La différence avec une base de données relationnelle est cette flexibilité des propriétés, si dans une base de données SQL, les propriétés doivent être toutes égales, dans un modèle no SQL, nous pouvons retirer ou ajouter des propriétés pour chaque utilisateur sans que cela soit problématique.

```json
_id: ObjectId('000000000000000000000000'),
"name" : "Dae",
"first_name" : "Jane",
"address" : "3 rue des fleurs
"
```

Nous pouvons utiliser mockaroo pour instancier des données au format JSON.

## Lignes de commande


Vous pouvez aussi utiliser MongoDB par le biais de votre terminal en installant et en utilisant mongo Shell (monsgosh), pour cela on le recherche sur internet, on le télécharge, et l'installe.

Une fois sur le terminal, nous appelons MongoDB avec cette commande :

```shell
mongosh
```

Pour consulter la liste des bases de données, nous mettons en place la commande suivante :

```shell
show dbs
```

Pour accéder à une base de données nous faisons:

```shell
use toto
```

pour créer une collection on utilise : 

```bash
db.createCollection('nomDeLaCollection')
```

Pour insérer une donnée qui comporte un "nom", un "prénom" dans la collection "users" on utilise

```bash
db.users.insertOne({"name":"Doe", "first_name":"John"})
```

Pour modifier une donnée : 

```bash
db.users.updateOne({"name":"Doe"}, {$set : {"name":"Dodoe"}})
```

Pour supprimer une donnée : 

```bash
db.users.deleteOne({"name":"Doe"})
```

Nous pouvons consulter les collections d'une base de données en faisant la commande dans la base de données : 

```bash
show collections
```

Nous supprimons une collection en utilisant : 

```bash
db.nomDeLaCollection.drop()
```
