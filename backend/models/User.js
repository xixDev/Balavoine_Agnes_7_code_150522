/*---------
USER
admin : 0 normal, 1 ADMIN moderateur
usersComments : tableau des idUser des commentateurs
pseudo : random : blob_num
lien vers table comments : blobComments (trouver nom) ?
---------*/
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            pseudo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            admin: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            createdAt: 'created',
            updatedAt: false,
        }
    );
};
