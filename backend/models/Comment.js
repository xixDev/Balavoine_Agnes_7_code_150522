/*---------
BLOB
status : 0 en ligne, 1 hors ligne
usersComments : tableau des idUser des commentateurs
lien vers table comments : blobComments (trouver nom)
---------*/

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Comment',
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
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },

        {
            // bug table name
            tableName: 'comments',
            timestamps: true,
            createdAt: 'created',
            updatedAt: false,
        }
    );
};
