const { User } = require('../config/sequelize');
const fs = require('fs');

// get one BLOB findByPk findOne
exports.getOneUser = (req, res, next) => {
    const apiId = req.params.userId;
    User.findByPk(apiId)
        .then((user) => {
            // console.log(`userId ??????? : ${userId}`);
            if (user === null) {
                const message = `Le USER demandé n'existe pas. Réessayez avec un autre identifiant.`;
                return res.status(404).json({ message });
            }
            const message = `Un USER a bien été trouvé.`;
            res.status(200).json({ message, data: user });
        })
        .catch((error) => {
            const message = `Le USER n'a pas pu être récupéré. Réessayez dans quelques instants.`;
            res.status(500).json({ message, data: error });
        });
};

// post dashboard findByPk findOne
exports.postOneUser = (req, res, next) => {
    console.log('route dashboard');

    // const apiId = req.params.userId;
    // User.findByPk(apiId)
    //     .then((user) => {
    //         // console.log(`userId ??????? : ${userId}`);
    //         if (user === null) {
    //             const message = `Le USER demandé n'existe pas. Réessayez avec un autre identifiant.`;
    //             return res.status(404).json({ message });
    //         }
    //         const message = `Un USER a bien été trouvé.`;
    //         res.status(200).json({ message, data: user });
    //     })
    //     .catch((error) => {
    //         const message = `Le USER n'a pas pu être récupéré. Réessayez dans quelques instants.`;
    //         res.status(500).json({ message, data: error });
    //     });
};

// update USER
exports.modifyUser = (req, res, next) => {
    const userId = req.params.userId;
    User.update(req.body, {
        where: { userId: userId },
    }).then((_) => {
        //Comment.findAll({ where: { userId: req.params.userId } })
        User.findByPk(userId)
            .then((user) => {
                if (user === null) {
                    const message = `Le USER demandé n'existe pas. Réessayez avec un autre identifiant.`;
                    return res.status(404).json({ message });
                }
                const message = `Le USER ${user.userId} a bien été modifié.`;
                res.status(200).json({ message, data: user });
            })
            .catch((error) => {
                const message = `Le USER n'a pas pu être modifié. Réessayez dans quelques instants.`;
                res.status(500).json({ message, data: error });
            });
    });
};

// Delete USER
exports.deleteUser = (req, res, next) => {
    const apiId = req.params.userId;
    User.findByPk(apiId)
        .then((user) => {
            if (user === null) {
                const message = `Le USER demandé n'existe pas. Réessayez avec un autre identifiant.`;
                return res.status(404).json({ message });
            }
            //comment.userId
            return User.destroy({ where: { userId: user.userId } }).then(
                (_) => {
                    const message = `Le USER avec l'identifiant n° ${user.userId} a bien été supprimé.`;
                    res.json({ message, data: user });
                }
            );
        })
        .catch((error) => {
            const message = `Le USER n'a pas pu être supprimé. Réessayez dans quelques instants.`;
            res.status(500).json({ message, data: error });
        });
};

// all USER
exports.getAllUser = (req, res, next) => {
    //User.query('SELECT * from Blobs');
    // find mongo
    User.findAll()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};
