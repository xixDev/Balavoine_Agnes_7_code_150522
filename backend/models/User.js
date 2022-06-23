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
            // au lieu de id
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: 'Cet email est déjà pris',
                },
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            pseudo: {
                type: DataTypes.STRING,
                //defaultValue: 'Pseudo',
            },
            picture: {
                type: DataTypes.STRING,
                defaultValue: './images/colors/bordeaux.png',
            },
            admin: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
        },
        {
            // bug table name
            tableName: 'users',
            timestamps: true,
            createdAt: 'created',
            updatedAt: false,
        }
    );
};
