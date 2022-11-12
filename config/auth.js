module.exports = {
	ensureAuth: function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/api/users/login');
	},
	ensureGuest: function (req, res, next) {
		if (req.isAuthenticated()) {
			return res.status(302).redirect('/api/users');
		}
		return next();
	},
};
