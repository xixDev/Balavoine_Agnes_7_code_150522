const express = require('express');
const favicon = require('serve-favicon');
// URL image
const path = require('path');
const cors = require('cors');

// const dotenv = require('dotenv');
const helmet = require('helmet');
// (ou bodyparser)
const bodyParser = require('body-parser');
const app = express();

//const sequelize
const sequelize = require('./config/sequelize.js');

// import des MODELS
const userRoutes = require('./routes/user');
const blobRoutes = require('./routes/blob');
const commentRoutes = require('./routes/comment');

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
// securite / express
app.use(helmet());

// gestionnaire de routage
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));
app.use(express.urlencoded({ extended: true }));

/* ---------------------------
accès à toutes les sortes CORPS de requetes au format JSON ?
(ou bodyparser)
*/
app.use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())
    .use(cors());
// app.use(express.json());

// connexion base
sequelize.initDb();

app.use('/api/auth', userRoutes);
// à revoir
app.use('/api/users', userRoutes);
app.use('/api/blobs', blobRoutes);
// à modiifer /api/blobs/
app.use('/api/comments', commentRoutes);

module.exports = app;
