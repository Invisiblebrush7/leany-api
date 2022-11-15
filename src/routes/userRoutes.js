'use strict';
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { ensureGuest, ensureAuth } = require('../../config/auth');

router.post('/sign_up', ensureGuest, usersController.signUpPost);
router.post('/login', ensureGuest, usersController.loginPost);
router.get('/logout', ensureAuth, usersController.logout);

module.exports = router;
