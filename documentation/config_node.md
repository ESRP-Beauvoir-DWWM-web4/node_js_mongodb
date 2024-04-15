# Configuration de Node.js

### Création de package.json

Tout d'abord il faut créer un dossier, dans notre exemple il se nommera node_1.

Il faut à présent ouvrir ce dossier dans VS Code et faire la manipulation suivante dans le terminal

```bash
npm init -y
```

### Les packages

Il faut à présent installer tous les packages dont nous aurons besoin

- Express : Le Framework qui va servir à gérer notre serveur Node.

- Cors : Qui va nous servir à ajouter des entêtes http afin d'accéder à des ressources d'un autre serveur (React par exemple).

- Nodemon : Qui va automatiser les mises à jour au niveau des changements opérés sur l'API et afficher les erreurs le cas échéant.

- Mongoose : Qui va s'occuper de mettre en place tous les outils de communication avec la base de données No SQL.

- DotEnv : Qui va gérer les variables d'environnement.

Voila ce que l'on va installer pour le moment.

### Fichier central

Nous créons nous notre fichier central "index.js".

Nous importons les premiers éléments qui sont "Express" et "Cors"

```javascript
const express = require('express')
const cors = require('cors')
```

Nous initialisons nôtre API.

```javascript
const app = express()

app.listen(8080, () => {
    console.log("Vous êtes connecté sur le port 8080")
})
```

Pour lancer l'API, dans un premier temps nous pouvons faire la commande suivante : 

```bash
node index.js
```

### Automatisation du serveur

Cela est cependant pas très facile à tenir dans le temps car pour chaque changement, il faudrait couper la connexion et relancer la commande à chaque fois.

Nous allons paramétrer Nodemon qui fera ce travail à notre place.

Dans le fichier "package.json", nous plaçons dans la section scripts un nouveau mode de démarrage

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
	"dev": "nodemon index.js"
  },
```

Nous faisons ensuite la commande : 

```bash
npm run dev
```

Cela lancera le serveur avec l'aide de Nodemon et si la moindre modification est réalisée, le fait d'enregistrer les changements fera en sorte que Nodemon se mette à jour.

### Les variables d'environnement.

Pour cela nous allons utiliser le package "dotenv" que nous avons installer précédemment.

Nous allons utiliser cela sur nôtre appel au serveur.

Nous créons le fichier ".env" à la racine et nous mettons dedans le port sur lequel est appelé le serveur.

Pour pouvoir utiliser les variables d'environnement, il faut modifier le script du fichier "package.json"

Ajouter dotenv de cette manière : 

```json
"dev": "nodemon -r dotenv/config index.js"
```

Une fois cela terminé, nous modifions l'appel du serveur sur le fichier "index.js".

```javascript
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Vous êtes connecté sur le port ${process.env.SERVER_PORT}`)
})
```

Le SERVER_PORT correspond à ça dans le .env : 

```
API_PORT = 8080
```
### Connexion à la BDD

Pour faire la connexion à la base de données on va créer un dossier appelé "db" et y ajouter un fichier de configuration : "db.js".

Sur MongoDB, nous récupérons l'adresse du système local et on le met dans le fichier ".env".

```
SERVER_ADDRESS = "mongodb://localhost:27017/api_1"
```

Nous collons l'adresse de la BDD suivi du nom de la bdd que nous voulons créer.

Ensuite on met en place le système.

```javascript
const { connect } = require('mongoose');

function dbConnexion() {
    connect(process.env.SERVER_ADDRESS)
        .then(() => console.log("Connexion à la base de données établie"))
        .catch((error) => {console.log(error)})
}

module.exports = dbConnexion
```

Dans index.js, nous appelons l'import

```javascript
const db = require ('./db/db')
```

Nous appelons le fichier de configuration

```javascript
db()
```

Nodemon devrait afficher un nouveau message.

### Encore un peu de configuration

Mettons en place cors qui permettra au frontend de consommer l'api sans être bloqué : 

```javascript
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}));
```

Pour finir, nous souhaitons traiter des données au format JSON, pour cela il faut dire à express d'utiliser ce format

```javascript
app.use(express.json())
```

### Les modèles

Pour fonctionner, la BDD à besoin d'avoir un modèle afin de savoir quelles données seront traitées par l'API.

Pour cela on créer un dossier appelé "models" et on ajoute à l'intérieur un fichier appelé "User.js", ce fichier contiendra les propriétés de nos utilisateurs.

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        firstName : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    }
);

userSchema.pre("save", async function() {
    if ( this.isModified("password") ) {
        this.password = await bcrypt.hash(this.password, 10)
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```