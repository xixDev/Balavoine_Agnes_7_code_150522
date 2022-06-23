const { Blob } = require('../config/sequelize');

//  like/dislike BLOB
exports.rateBlob = (req, res, next) => {
    let likeRate = req.body.likeRate;
    let userId = req.body.userId;
    // ou parseFloat ?
    // userId = parseInt(userId);
    const id = req.params.id;
    console.log(`userId : ${userId}`);
    console.log(`likeRate : ${likeRate}`);

    // LIKE = 1 j'aime
    if (likeRate === 1) {
        Blob.findByPk(id)
            .then((blob) => {
                if (blob === null) {
                    const message = `Le BlOB demandé n'existe pas. Réessayez avec un autre identifiant.`;
                    return res.status(404).json({ message });
                }
                blob.likes += 1;
                let usersLiked = blob.usersLiked;
                usersLiked.push(userId);
                blob.usersLiked = usersLiked;

                const message = `Le BlOB ${blob.id} avec les LIKES a bien été modifié.`;
                res.status(200).json({ message, data: blob });
                return blob.save();
            })
            .catch((err) => console.log(err));
    }

    // lIKE = 0
    else if (likeRate === 0) {
        Blob.findByPk(id)
            .then((blob) => {
                if (blob === null) {
                    const message = `Le BlOB demandé n'existe pas. Réessayez avec un autre identifiant.`;
                    return res.status(404).json({ message });
                }
                //
                userId = String(userId);

                if (blob.usersLiked.includes(userId)) {
                    blob.likes -= 1;

                    let usersLiked = blob.usersLiked;
                    let filteredUsers = usersLiked.filter(
                        (userLike) => userLike !== userId
                    );
                    blob.usersLiked = filteredUsers;

                    const message = `Le BlOB ${blob.id} avec les LIKES a bien été modifié.`;
                    res.status(200).json({ message, data: blob });
                    return blob.save();
                }
                if (blob.usersDisliked.includes(userId)) {
                    blob.dislikes -= 1;

                    let usersDisliked = blob.usersDisliked;
                    let filteredUsers = usersDisliked.filter(
                        (userDislike) => userDislike !== userId
                    );
                    blob.usersDisliked = filteredUsers;

                    const message = `Le BlOB ${blob.id} avec les DISLIKES a bien été modifié.`;
                    res.status(200).json({ message, data: blob });
                    return blob.save();
                } else {
                    console.log(`nowehre !!!!!!!`);
                }
            })
            .catch((err) => console.log(err));
    }

    // DSILIKE = -1
    else if (likeRate === -1) {
        Blob.findByPk(id)
            .then((blob) => {
                if (blob === null) {
                    const message = `Le BlOB demandé n'existe pas. Réessayez avec un autre identifiant.`;
                    return res.status(404).json({ message });
                }
                blob.dislikes += 1;
                let usersDisliked = blob.usersDisliked;
                usersDisliked.push(userId);
                blob.usersDisliked = usersDisliked;

                const message = `Le BlOB ${blob.id} avec les DISLIKES a bien été modifié.`;
                res.status(200).json({ message, data: blob });
                return blob.save();
            })
            .catch((err) => console.log(err));
    }
};
