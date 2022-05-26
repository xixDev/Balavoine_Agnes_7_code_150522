//const User = require('../models/user');
const { User } = require('../config/sequelize');
// const fs = require('fs');

exports.createUser = (req, res, next) => {
    User.create(req.body).then((user) => {
        const message = `Le user ${req.body.pseudo} a bien été crée.`;
        res.json({ message, data: user });
    });
};

// get one BLOB findByPk findOne
exports.getOneUser = (req, res, next) => {
    User.findOne({ where: { id: req.params.id } })
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((error) => {
            res.status(404).json({
                error: error,
            });
        });
};

//  like/dislike BLOB
// A remettre

// update BLOB
exports.modifyUser = (req, res, next) => {
    const id = req.params.id;
    User.update(req.body, {
        where: { id: id },
    }).then((_) => {
        User.findByPk(id).then((user) => {
            const message = `Le User ${user.pseudo} a bien été modifié.`;
            res.json({ message, data: user });
        });
    });
};

// delete BLOB findByPk findOne
// Blob.findOne({ where: { id: req.params.id } })

// exports.deleteUser = (req, res, next) => {

// };

// all BLOB
exports.getAllUser = (req, res, next) => {
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
