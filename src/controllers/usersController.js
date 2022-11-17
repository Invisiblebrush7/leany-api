'use strict';
const { validateSignUp, validateLogin } = require('../validators/userValidator');
const User = require('../models/User');
const bcrpyt = require('bcrypt');

const jsonwebtoken = require('jsonwebtoken');
const jsonwebtokenSecret = 'my-cool-secret';

class UsersController {
	static generateToken(user) {
		return jsonwebtoken.sign({ data: user }, jsonwebtokenSecret, { expiresIn: '24h' });
	}

	// --------------------------------
	// TODO: Logout
	static async logout(req, res) {
		req.session.destroy();
		return res.status(200).send('Logout route');
	}

	// --------------------------------
	static async login(req, res) {
		try {
			const errorMsg = validateLogin(req.body);
			if (errorMsg) return res.status(401).send(errorMsg);
			const user = await User.findOne({ email: req.body.email });
			if (!user) return res.status(401).send('Invalid email or password');
			// Fin de validaciones

			bcrpyt.compare(req.body.password, user.password, (err, match) => {
				if (err) {
					return res.status(500).send('Something went wrong :(');
				} else if (match) {
					console.log('Login Succesful :)');
					const jwtToken = UsersController.generateToken(user);
					req.session.user = user;
					req.session.jwt = jwtToken;
					return res.status(200).json({ jwtToken });
				} else {
					return res.status(401).send('Invalid email or password');
				}
			});
		} catch (error) {
			return res.status(400).json({ message: error.message });
		}
	}
	// --------------------------------
	static async signUpPost(req, res) {
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
}

exports.UsersController = UsersController;
