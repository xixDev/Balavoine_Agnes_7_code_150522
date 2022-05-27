const express = require('express');
const router = express.Router();

// check Token
// const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');

const adminCtrl = require('../controllers/admin');
//const userCtrl = require('../controllers/user');

// avec HASH & TOKEN ajouter uniq valid
router.post('/signup', adminCtrl.signup);
// // pas get ?
router.post('/login', adminCtrl.login);

// TEST
// router.get('/', userCtrl.getAllUser);
// router.post('/', userCtrl.createUser);
// router.get('/:id', userCtrl.getOneUser);
// router.put('/:id', userCtrl.modifyUser);
// router.delete('/:id', userCtrl.deleteUser);

module.exports = router;
