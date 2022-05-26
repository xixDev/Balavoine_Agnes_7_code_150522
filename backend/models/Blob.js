/*---------
BLOB
status : 0 en ligne, 1 hors ligne
usersComments : tableau des idUser des commentateurs
lien vers table comments : blobComments (trouver nom)
---------*/

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Blob',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            likes: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            dislikes: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            usersLiked: {
                type: DataTypes.STRING,
                allowNull: false,
                // pour tableaux
                get() {
                    return this.getDataValue('usersLiked').split(',');
                },
                set(usersLiked) {
                    this.setDataValue('usersLiked', usersLiked.join());
                },
            },
            usersDisliked: {
                type: DataTypes.STRING,
                allowNull: false,
                // pour tableaux
                get() {
                    return this.getDataValue('usersDisliked').split(',');
                },
                set(usersDisliked) {
                    this.setDataValue('usersDisliked', usersDisliked.join());
                },
            },
            usersComments: {
                type: DataTypes.STRING,
                allowNull: false,
                // pour tableaux
                get() {
                    return this.getDataValue('usersComments').split(',');
                },
                set(usersComments) {
                    this.setDataValue('usersComments', usersComments.join());
                },
            },
        },

        {
            timestamps: true,
            createdAt: 'created',
            updatedAt: false,
        }
    );
};
