'use strict';
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { ensureGuest, ensureAuth } = require('../../config/auth');

router.post('/login', ensureGuest, usersController.loginPost);

router.post('/sign_up', ensureGuest, usersController.signUpPost);

router.get('/logout', ensureAuth, usersController.logout);

router.get('/api/users', ensureAuth, usersController.index);

module.exports = router;
