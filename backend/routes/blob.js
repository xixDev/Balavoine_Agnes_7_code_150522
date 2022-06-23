// BLOB message
const express = require('express');
const router = express.Router();

// check Token
const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');

const blobCtrl = require('../controllers/blob');
const rateCtrl = require('../controllers/blobRate');

router.get('/', auth, blobCtrl.getAllBlob);

router.post('/', auth, blobCtrl.createBlob);
router.get('/:id', auth, blobCtrl.getOneBlob);
router.put('/:id', auth, blobCtrl.modifyBlob);
// like/dislike / PUT patch
router.put('/:id/like', rateCtrl.rateBlob);
// router.post('/:id/like', auth, blobCtrl.rateBlob);
router.delete('/:id', auth, blobCtrl.deleteBlob);

module.exports = router;
