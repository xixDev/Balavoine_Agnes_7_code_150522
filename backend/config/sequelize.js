const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const BlobModel = require('../models/blob');
const CommentModel = require('../models/comment');
// connexion base de données

// CONFIG
const sequelize = new Sequelize('blob_v1', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    // show/hide log
    logging: false,
});

const User = UserModel(sequelize, DataTypes);
const Blob = BlobModel(sequelize, DataTypes);
const Comment = CommentModel(sequelize, DataTypes);

//
const initDb = () => {
    return sequelize.sync().then((_) => {
        // pr test
        console.log('La base de donnée a bien été initialisée !');
    });
};

module.exports = {
    initDb,
    User,
    Blob,
    Comment,
};
