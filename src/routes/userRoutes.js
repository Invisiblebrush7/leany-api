'use strict';
const express = require('express');
const router = express.Router();
const { ensureGuest, ensureAuth } = require('../../config/auth');
const usersController = require('../controllers/usersController');

router.post('/sign_up', ensureGuest, usersController.signUpPost);
router.post('/login', ensureGuest, usersController.loginPost);
router.get('/logout', ensureAuth, usersController.logout);

module.exports = router;
