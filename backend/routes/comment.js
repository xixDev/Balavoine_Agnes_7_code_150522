// BLOB message
const express = require('express');
const router = express.Router();

// check Token
// const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');

const commentCtrl = require('../controllers/comment');

router.get('/', commentCtrl.getAllComment);
router.post('/', commentCtrl.createComment);
router.get('/:id', commentCtrl.getOneComment);
router.put('/:id', commentCtrl.modifyComment);
router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;
