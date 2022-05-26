const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../models/user');
const BlobModel = require('../models/blob');
const users = require('../models/mock-user');
// const blobs = require('../models/mock-blob');

// TO DO --> cfP6 P7 #utuliser dotend / confignpm start
const sequelize = new Sequelize('blob01', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    // dialectOptions: {
    //     timezone: 'Etc/GMT-2',
    // },
    // ?
    logging: false,
});

const User = UserModel(sequelize, DataTypes);
const Blob = BlobModel(sequelize, DataTypes);

// TO SEE -->
const initDb = () => {
    return sequelize.sync().then((_) => {
        //return sequelize.sync({ force: true }).then((_) => {
        // user
        //const users = [];
        users.map((user) => {
            User.create({
                email: user.email,
                password: user.password,
                pseudo: user.pseudo,
                picture: user.picture,
                admin: user.admin,
            }).then((user) => console.log(user.toJSON()));
        });

        // blob
        const blobs = [];
        blobs.map((blob) => {
            Blob.create({
                userId: blob.userId,
                status: blob.status,
                title: blob.title,
                description: blob.description,
                imageUrl: blob.imageUrl,
                likes: blob.likes,
                dislikes: blob.dislikes,
                usersLiked: blob.usersLiked,
                usersDisliked: blob.usersDisliked,
                usersComments: blob.usersComments,
            }).then((blob) => console.log(blob.toJSON()));
        });
        console.log('La base de donnée a bien été initialisée !');
    });
};

module.exports = {
    initDb,
    User,
    Blob,
};
