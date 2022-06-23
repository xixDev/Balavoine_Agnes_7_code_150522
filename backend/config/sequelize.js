// dotenv.config({ path: './config.env' });
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const BlobModel = require('../models/blob');
const CommentModel = require('../models/comment');
// connexion base de données
// dotenv.config({ path: './config.env' });

// test
//const users = require('../models/mock-user');
//const blobs = require('../models/mock-blob');
//const comments = require('../models/mock-comments');
// ??
// const {
//     default: xXssProtection,
// } = require('helmet/dist/types/middlewares/x-xss-protection');

// TO DO --> cfP6 P7 #utuliser dotend / confignpm start
const sequelize = new Sequelize('blob_v1', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    // show/hide log
    logging: false,
});

const User = UserModel(sequelize, DataTypes);
const Blob = BlobModel(sequelize, DataTypes);
const Comment = CommentModel(sequelize, DataTypes);

// TO SEE -->
const initDb = () => {
    return sequelize.sync().then((_) => {
        //return sequelize.sync({ force: true }).then((_) => {
        // user
        // const users = [];
        // users.map((user) => {
        //     User.create({
        //         email: user.email,
        //         password: user.password,
        //         pseudo: user.pseudo,
        //         picture: user.picture,
        //         admin: user.admin,
        //     }).then((user) => console.log(user.toJSON()));
        // });

        // blob
        // const blobs = [];
        // blobs.map((blob) => {
        //     Blob.create({
        //         userId: blob.userId,
        //         status: blob.status,
        //         title: blob.title,
        //         description: blob.description,
        //         imageUrl: blob.imageUrl,
        //         likes: blob.likes,
        //         dislikes: blob.dislikes,
        //         usersLiked: blob.usersLiked,
        //         usersDisliked: blob.usersDisliked,
        //         usersComments: blob.usersComments,
        //     }).then((blob) => console.log(blob.toJSON()));
        // });

        // TEST
        // comments.map((comment) => {
        //     Comment.create({
        //         id: comment.id,
        //         userId: comment.userId,
        //         status: comment.status,
        //         description: comment.description,
        //     }).then((comment) => console.log(comment.toJSON()));
        // });

        console.log('La base de donnée a bien été initialisée !');
    });
};

module.exports = {
    initDb,
    User,
    Blob,
    Comment,
};
