var express = require('express');
var router = express.Router();
const { login_post } = require('../controllers/authController');
const { logout_get } = require('../controllers/authController');
const { forget_password } = require('../controllers/authController');
const { reset_password } = require('../controllers/authController');
const {  addImageProfile } = require('../controllers/UpdateProfileController');

router.post('/login', login_post);

router.get('/logout', logout_get);
router.post('/forget-password', forget_password);
router.post('/reset-password/:token', reset_password);

router.post('/addImageProfile/:userId', addImageProfile);

module.exports = router;