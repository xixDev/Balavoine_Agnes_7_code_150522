//const Blob = require('../models/blob');
const { Blob } = require('../config/sequelize');
//const fs = require('fs');

// create BLOB
exports.createBlob = (req, res, next) => {
    Blob.create(req.body).then((blob) => {
        const message = `Le BLOB ${req.body.id} a bien été crée.`;
        res.json({ message, data: blob });
    });
};

// get one BLOB
exports.getOneBlob = (req, res, next) => {
    //req.params.id = id;
    const apiId = req.params.id;
    Blob.findAll({ where: { id: apiId } })
        //Blob.findById(apiId)
        //Blob.findOne({ where: { id: apiId } })
        .then((blob) => {
            // console.log(`id ??????? : ${id}`);
            console.log(`BLOB : ${blob}`);

            if (blob === null) {
                const message = `Le BLOB demandé n'existe pas. Réessayez avec un autre identifiant.`;
                return res.status(404).json({ message });
            }

            const message = 'Un BLOB a bien été trouvé.';
            res.json({ message, data: blob });
            //res.json({ message, data: blob });
        })
        .catch((error) => {
            const message = `Le BLOB n'a pas pu être récupéré. Réessayez dans quelques instants.`;
            res.status(500).json({ message, data: error });
        });
};

//  like/dislike BLOB
// A remettre

// update BLOB
exports.modifyBlob = (req, res, next) => {
    const blobObject = req.file
        ? {
              ...JSON.parse(req.body.blob),
              imageUrl: `${req.protocol}://${req.get('host')}/images/${
                  req.file.filename
              }`,
          }
        : { ...req.body };
    // updateOne
    Blob.update({ id: req.params.id }, { ...blobObject, id: req.params.id })
        .then(() => {
            res.status(201).json({
                message: 'BLOB updated successfully!',
            });
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

// all BLOB
exports.getAllBlob = (req, res, next) => {
    // find mongo
    Blob.findAll()
        .then((blobs) => {
            res.status(200).json(blobs);
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};
