const express = require('express');
// URL image
const path = require('path');

// const dotenv = require('dotenv');
const helmet = require('helmet');
// (ou bodyparser)
const bodyParser = require('body-parser');
const app = express();

//const sequelize = require('./util/database');
// to SEE ---> connexion base de données A REVOIR
const sequelize = require('./config/sequelize.js');

// import des MODELS
const userRoutes = require('./routes/user');
const blobRoutes = require('./routes/blob');

/* ---------------------------
Ces headers permettent :
d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    next();
});

// gestionnaire de routage
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));
app.use(express.urlencoded({ extended: true }));

/* ---------------------------
accès à toutes les sortes CORPS de requetes au format JSON ?
(ou bodyparser)
*/
//app.use(bodyParser.urlencoded({ extended: false }));
// les 2 ??
app.use(express.json());
app.use(helmet());

// connexion base
sequelize.initDb();

//app.use('/api/auth', userRoutes);
app.use('/api/users', userRoutes);
app.use('/api/blobs', blobRoutes);

// connexion base

// sequelize
//     .sync()
//     .then((result) => {
//         // console.log(result);
//         app.listen(3000);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

module.exports = app;
