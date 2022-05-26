// BLOB message
const express = require('express');
const router = express.Router();

// check Token
// const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');

const blobCtrl = require('../controllers/blob');

router.get('/', blobCtrl.getAllBlob);
router.post('/', blobCtrl.createBlob);
router.get('/:id', blobCtrl.getOneBlob);
router.put('/:id', blobCtrl.modifyBlob);
// like/dislike
// router.post('/:id/like', auth, blobCtrl.rateSauce);
//router.delete('/:id', blobCtrl.deleteBlob);

module.exports = router;
