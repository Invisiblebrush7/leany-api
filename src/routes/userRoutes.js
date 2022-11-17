'use strict';
const express = require('express');
const router = express.Router();

const { UsersController } = require('../controllers/usersController');
const { ensureAuth, ensureGuest, verifyJWT } = require('../middlewares/auth');

router.post('/sign_up', ensureGuest, UsersController.signUpPost);
router.post('/login', ensureGuest, UsersController.login);
router.get('/logout', ensureAuth, verifyJWT, UsersController.logout);

module.exports = router;
