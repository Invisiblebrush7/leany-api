const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');

const User = require('../src/models/User');

module.exports = (passport) => {
	try {
		passport.use(
			'local',
			new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
				User.findOne({ email: email }, async function (err, user) {
					if (err) {
						return done(err);
					}
					if (!user) {
						return done(null, false, { message: 'User is not registered' });
					}
					const result = await bcrypt.compare(password, user.password);

					if (!result) {
						return done(null, false, { message: 'Invalid password' });
					} else {
						return done(null, user);
					}
				});
			})
		);
	} catch (error) {
		console.log(error);
	}
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	passport.deserializeUser((id, done) => {
		User.findById(id, (error, user) => {
			done(error, user);
		});
	});
};
