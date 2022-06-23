const { User } = require('../config/sequelize');
const bcrypt = require('bcrypt');
// token
const jwt = require('jsonwebtoken');

// SIGN UP
exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                pseudo: req.body.pseudo,
                password: hash,
            });
            user.save()
                // bug
                // user.create()
                .then((user) => {
                    const message = `Le user ${user.userId} ${user.pseudo} a bien été crée.`;
                    res.json({ message, data: user });
                })
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => {
            const message = `Le USER n'a pas pu être crée. Réessayez dans quelques instants.`;
            res.status(500).json({ message, data: error });
        });
};

// LOGIN
exports.login = (req, res, next) => {
    //const apiEm = req.body.email;
    User.findOne({ where: { email: req.body.email } })
        //User.findByPk(req.body.email)
        .then((user) => {
            if (user === null) {
                return res
                    .status(401)
                    .json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res
                            .status(401)
                            .json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user.userId,
                        // token: 'TOKEN',
                        token: jwt.sign(
                            { userId: user.userId },
                            'RANDOM_TOKEN_SECRET',
                            {
                                expiresIn: '24h',
                            }
                        ), //
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};
