const express = require('express');
const router = express.Router();

// check Token
const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');

const adminCtrl = require('../controllers/admin');
const userCtrl = require('../controllers/user');

// avec HASH & TOKEN ajouter uniq valid
router.post('/signup', adminCtrl.signup);
router.post('/login', adminCtrl.login);

// TEST
// dashboard remmettre auth
router.post('/dashboard', auth, userCtrl.postOneUser);
// router.post('/:userId/dashboard', userCtrl.postOneUser);

router.get('/:userId', auth, userCtrl.getOneUser);
router.get('/', userCtrl.getAllUser);
// router.post('/', userCtrl.createUser);
// router.get('/:userId', userCtrl.getOneUser);
router.put('/:userId', auth, userCtrl.modifyUser);
router.delete('/:userId', auth, userCtrl.deleteUser);

module.exports = router;
