'use strict';
const express = require('express');
const router = express.Router();

const { UsersController } = require('../controllers/usersController');
const { verify } = require('../middlewares/auth');

const { ensureGuest, ensureAuth } = require('../../config/auth');
router.post('/sign_up', UsersController.signUpPost);
router.post('/login', UsersController.login);
router.get('/logout', verify, UsersController.logout);

module.exports = router;
