// On importe les paquets Express et Cors.
const express = require('express');
const cors = require('cors');

// On importe le fichier de configuration de notre base de données.
const db = require('./db/db');

// On importe le contrôleur User
const userController = require('./controllers/userController')

// Nous placons express dans une constante.
const app = express();

// Nous activons le fichier de configuration de la BDD.
db()

// Nous configurons Cors
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}))

// On demande à l'api de traiter les données au format JSON.
app.use(express.json())

// NOus écoutons notre api sur un port particulier
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Vous êtes connecté sur le port ${process.env.SERVER_PORT}`)
})

app.use('/', userController)