const { User } = require('../config/sequelize');
const fs = require('fs');

exports.createUser = (req, res, next) => {
    User.create(req.body)
        .then((user) => {
            const message = `Le user ${req.body.id} a bien été crée.`;
            res.json({ message, data: user });
        })
        .catch((error) => {
            const message = `Le USER n'a pas pu être crée. Réessayez dans quelques instants.`;
            res.status(500).json({ message, data: error });
        });
};

// get one BLOB findByPk findOne
exports.getOneUser = (req, res, next) => {
    const apiId = req.params.id;
    User.findByPk(apiId)
        .then((user) => {
            // console.log(`id ??????? : ${id}`);
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

//  like/dislike BLOB
// A remettre

// update USER
exports.modifyUser = (req, res, next) => {
    const id = req.params.id;
    User.update(req.body, {
        where: { id: id },
    }).then((_) => {
        //Comment.findAll({ where: { id: req.params.id } })
        User.findByPk(id)
            .then((user) => {
                if (user === null) {
                    const message = `Le USER demandé n'existe pas. Réessayez avec un autre identifiant.`;
                    return res.status(404).json({ message });
                }
                const message = `Le USER ${user.id} a bien été modifié.`;
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
    const apiId = req.params.id;
    User.findByPk(apiId)
        .then((user) => {
            if (user === null) {
                const message = `Le USER demandé n'existe pas. Réessayez avec un autre identifiant.`;
                return res.status(404).json({ message });
            }
            //comment.id
            return User.destroy({ where: { id: user.id } }).then((_) => {
                const message = `Le USER avec l'identifiant n° ${user.id} a bien été supprimé.`;
                res.json({ message, data: user });
            });
        })
        .catch((error) => {
            const message = `Le USER n'a pas pu être supprimé. Réessayez dans quelques instants.`;
            res.status(500).json({ message, data: error });
        });
};

// all BLOB
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
