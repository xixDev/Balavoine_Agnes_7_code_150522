//const Blob = require('../models/blob');
const { Blob } = require('../config/sequelize');
const fs = require('fs');

// create BLOB
exports.createBlob = (req, res, next) => {
    Blob.create(req.body)
        .then((blob) => {
            const message = `Le BLOB ${req.body.id} a bien été crée.`;
            res.json({ message, data: blob });
        })
        .catch((error) => {
            const message = `Le BLOB n'a pas pu être crée. Réessayez dans quelques instants.`;
            res.status(500).json({ message, data: error });
        });
};

// get one BLOB
exports.getOneBlob = (req, res, next) => {
    const apiId = req.params.id;
    Blob.findByPk(apiId)
        .then((blob) => {
            if (blob === null) {
                const message = `Le BLOB demandé n'existe pas. Réessayez avec un autre identifiant.`;
                return res.status(404).json({ message });
            }
            const message = `Un BLOB a bien été trouvé.`;
            res.status(200).json({ message, data: blob });
        })
        .catch((error) => {
            const message = `Le BLOB n'a pas pu être récupéré. Réessayez dans quelques instants.`;
            res.status(500).json({ message, data: error });
        });
};

//  like/dislike BLOB
// A remettre

// update BLOB P6
// exports.modifyBlob = (req, res, next) => {
//     const apiId = req.params.id;
//     const blobObject = req.file
//         ? {
//               ...JSON.parse(req.body.blob),
//               imageUrl: `${req.protocol}://${req.get('host')}/images/${
//                   req.file.filename
//               }`,
//           }
//         : { ...req.body };
//     // updateOne
//     Blob.update({ id: apiId }, { ...blobObject, id: req.params.id })
//         .then(() => {
//             res.status(201).json({
//                 message: 'BLOB updated successfully!',
//             });
//         })
//         .catch((error) => {
//             res.status(400).json({
//                 error: error,
//             });
//         });
// };

// Update BLOB
exports.modifyBlob = (req, res, next) => {
    const id = req.params.id;
    Blob.update(req.body, {
        where: { id: id },
    }).then((_) => {
        Blob.findByPk(id)
            .then((blob) => {
                if (blob === null) {
                    const message = `Le BlOB demandé n'existe pas. Réessayez avec un autre identifiant.`;
                    return res.status(404).json({ message });
                }
                const message = `Le BlOB ${blob.id} a bien été modifié.`;
                res.status(200).json({ message, data: blob });
            })
            .catch((error) => {
                const message = `Le BlOB n'a pas pu être modifié. Réessayez dans quelques instants.`;
                res.status(500).json({ message, data: error });
            });
    });
};

// delete BLOB
exports.deleteBlob = (req, res, next) => {
    const apiId = req.params.id;
    Blob.findByPk(apiId)
        .then((blob) => {
            if (blob === null) {
                const message = `Le BLOB demandé n'existe pas. Réessayez avec un autre identifiant.`;
                return res.status(404).json({ message });
            }
            return Blob.destroy({ where: { id: blob.id } }).then((_) => {
                const message = `Le BLOB avec l'identifiant n° ${blob.id} a bien été supprimé.`;
                res.json({ message, data: blob });
            });
        })
        .catch((error) => {
            const message = `Le BLOB n'a pas pu être supprimé. Réessayez dans quelques instants.`;
            res.status(500).json({ message, data: error });
        });
};

// exports.deleteBlob = (req, res, next) => {
//     const apiId = req.params.id;
//     Blob.findAll({ where: { id: apiId } })
//         //Blob.findOne({ id: apiId })
//         .then((blob) => {
//             if (!blob) {
//                 res.status(404).json({
//                     error: new Error('No such BLOB!'),
//                 });
//             }
//             if (sauce.userId !== req.auth.userId) {
//                 res.status(400).json({
//                     error: new Error('Unauthorized request!'),
//                 });
//             }

//             // delete sauce and image
//             const filename = blob.imageUrl.split('/images/')[1];
//             fs.unlink(`images/${filename}`, () => {
//                 // destroy / deleteOne
//                 Blob.destroy({ where: { id: pokemon.id } })
//                     .then(() =>
//                         res
//                             .status(200)
//                             .json({ message: 'Image & BLOB supprimés !' })
//                     )
//                     .catch((error) => res.status(400).json({ error }));
//             });
//         })
//         .catch((error) => res.status(500).json({ error }));
// };

// get all BLOB
exports.getAllBlob = (req, res, next) => {
    //
    Blob.findAll({ order: ['title'] })
        .then((blobs) => {
            const message = 'La liste des BLOBS a bien été récupéré.';
            //res.json({ message, data: blobs });
            res.status(200).json({ message, data: blobs });
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};
