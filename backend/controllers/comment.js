//const Blob = require('../models/comment');
const { Comment } = require('../config/sequelize');

// create Comment
exports.createComment = (req, res, next) => {
    Comment.create(req.body)
        .then((comment) => {
            const message = `Le COMMENT ${comment.id} a bien été crée.`;
            res.status(200).json({ message, data: comment });
        })
        .catch((error) => {
            const message = `Le COMMENT  n'a pas pu être crée. Réessayez dans quelques instants.`;
            res.status(500).json({ message, data: error });
        });
};

// getOne COMMENT
exports.getOneComment = (req, res, next) => {
    const apiId = req.params.id;
    Comment.findByPk(apiId)
        .then((comment) => {
            // console.log(`id ??????? : ${id}`);
            if (comment === null) {
                const message = `Le COMMENT demandé n'existe pas. Réessayez avec un autre identifiant.`;
                return res.status(404).json({ message });
            }
            const message = `Un COMMENT ${comment.id} a bien été trouvé.`;
            res.status(200).json({ message, data: comment });
        })
        .catch((error) => {
            const message = `Le COMMENT  n'a pas pu être récupéré. Réessayez dans quelques instants.`;
            res.status(500).json({ message, data: error });
        });
};

// Update COMMENT
exports.modifyComment = (req, res, next) => {
    const id = req.params.id;
    Comment.update(req.body, {
        where: { id: id },
    }).then((_) => {
        //Comment.findAll({ where: { id: req.params.id } })
        Comment.findByPk(id)
            .then((comment) => {
                if (comment === null) {
                    const message = `Le COMMENT demandé n'existe pas. Réessayez avec un autre identifiant.`;
                    return res.status(404).json({ message });
                }
                const message = `Le COMMENT ${comment.id} a bien été modifié.`;
                res.status(200).json({ message, data: comment });
            })
            .catch((error) => {
                const message = `Le COMMENT n'a pas pu être modifié. Réessayez dans quelques instants.`;
                res.status(500).json({ message, data: error });
            });
    });
};

// delete comment
exports.deleteComment = (req, res, next) => {
    const apiId = req.params.id;
    Comment.findByPk(apiId)
        .then((comment) => {
            if (comment === null) {
                const message = `Le COMMENT demandé n'existe pas. Réessayez avec un autre identifiant.`;
                return res.status(404).json({ message });
            }
            //comment.id
            return Comment.destroy({ where: { id: comment.id } }).then((_) => {
                const message = `Le COMMENT avec l'identifiant n° ${comment.id} a bien été supprimé.`;
                res.json({ message, data: comment });
            });
        })
        .catch((error) => {
            const message = `Le COMMENT n'a pas pu être supprimé. Réessayez dans quelques instants.`;
            res.status(500).json({ message, data: error });
        });
};

// get all Comment
exports.getAllComment = (req, res, next) => {
    //Comment.findAll({ order: ['title'] })
    Comment.findAll()
        .then((comments) => {
            const message = 'La liste des COMMENT a bien été récupéré.';
            res.status(200).json({ message, data: comments });
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};
