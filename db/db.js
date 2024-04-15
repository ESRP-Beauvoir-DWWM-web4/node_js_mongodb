const { connect } = require('mongoose');

function dbConnexion() {
    connect(process.env.SERVER_ADDRESS)
        .then(() => {console.log("Connexion à la base de données établie !!")})
        .catch((error) => {console.log(error)})
}

module.exports = dbConnexion