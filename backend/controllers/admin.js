const { User } = require('../config/sequelize');
const bcrypt = require('bcrypt');
// token
//const jwt = require('jsonwebtoken');

// SIGN UP
exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            user.save()
                // bug
                // user.create()
                .then((user) => {
                    const message = `Le user ${user.id} a bien été crée.`;
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
    const apiEm = req.body.email;
    //User.findOne({ email: req.body.email })
    //  Blob.findAll({ where: { id: apiId } })
    //Blob.findById(apiId)
    //Blob.findOne({ where: { id: apiId } })
    User.findByPk(req.body.email)
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
                        userId: user.id,
                        token: 'TOKEN',
                        // token: jwt.sign(
                        //     { userId: user._id },
                        //     '2077adb93ec0582018664642477026fcf972e08fc345663d5814c1fff355b34f7a2f3ba9c663dba58c1249557bab5b84d2b3ebefae5032ecc34c776c457ad926c218a8fb60e3b0b21773875e38b7e3fa6e95d6fe8e758e6c895948afe4ab943ad7180ccfdf7d2e4ccfd9e3008977e4d9bceef8c5376900cec5dae484c7db9309f75b65d0136257b79fe72bf7c5ec8bc9f1a71f46da1f38f8fe6930e85010538c04b24d6493051312c38eb6f96d07ea469a96aae532011a0e3c4a08a6b4475a60',
                        //     { expiresIn: '24h' }
                        //),//
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};
