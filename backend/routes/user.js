const express = require('express');
const router = express.Router();

// // const userCtrl = require('../controllers/user01');
const userCtrl = require('../controllers/user');

// // router.post('/signup', userCtrl.signup);
// // router.post('/login', userCtrl.login);

router.get('/', userCtrl.getAllUser);
router.post('/', userCtrl.createUser);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', userCtrl.modifyUser);
// like/dislike
// router.post('/:id/like', auth, sauceCtrl.rateSauce);
//router.delete('/:id', userCtrl.deleteUser);

module.exports = router;
