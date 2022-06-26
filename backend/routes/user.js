const express = require('express');
const router = express.Router();

// check Token
const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');

const adminCtrl = require('../controllers/admin');
const userCtrl = require('../controllers/user');

// avec HASH & TOKEN
router.post('/signup', adminCtrl.signup);
router.post('/login', adminCtrl.login);
router.post('/dashboard', userCtrl.dashboard);
router.get('/:userId', auth, userCtrl.getOneUser);
router.get('/', auth, userCtrl.getAllUser);
router.put('/:userId', auth, userCtrl.modifyUser);
router.delete('/:userId', auth, userCtrl.deleteUser);

module.exports = router;
