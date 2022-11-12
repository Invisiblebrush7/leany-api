'use strict';
const { validateSignUp, validateLogin } = require('../validators/userValidator');
const User = require('../models/User');
const bcrpyt = require('bcrypt');
const passport = require('passport'); // authentication

/**
 * GET /users/login
 * Login page
 */

function login(req, res) {
	try {
		res.status(200).render('users/login', { title: 'Login - EasyLogging' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

/**
 * GET /sign_up
 * Sign Up page
 */
function signUp(req, res) {
	try {
		res.status(200).render('users/signUp', { title: 'Sign Up - EasyLogging' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

/**
 * POST /sign_up
 */
async function signUpPost(req, res) {
	const errors = [];
	try {
		const { email, password, username } = req.body;

		const errorMsg = validateSignUp(req.body);
		const userExists = await User.findOne({ email: email });

		if (errorMsg) {
			errors.push({ msg: errorMsg });
		}
		if (userExists) {
			errors.push({ msg: 'User already registered' });
		}

		if (errors.length > 0) {
			// user has errors
			res.status(401).send(errors);
		} else {
			const hashedPass = await bcrpyt.hash(password, 10);

			User.create({
				email,
				username,
				password: hashedPass,
			});
			res.status(201).send('User created');
		}
	} catch (error) {
		res.status(400).json({ error });
	}
}
/**
 * POST /login
 */
async function loginPost(req, res, next) {
	try {
		const errorMsg = validateLogin(req.body);
		if (errorMsg) return res.status(401).send(errorMsg);
		// Fin de validaciones
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
	passport.authenticate('local', {
		failureRedirect: '/login',
		successRedirect: '/api/users',
		failureFlash: true,
	})(req, res, next);
}

async function logout(req, res) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect('/login');
	});
}

async function index(req, res) {
	const users = await User.find({});
	res.send(users);
}

exports.login = login;
exports.signUp = signUp;
exports.signUpPost = signUpPost;
exports.loginPost = loginPost;
exports.logout = logout;
exports.index = index;
