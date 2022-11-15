module.exports = {
	ensureAuth: function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('//login');
	},
	ensureGuest: function (req, res, next) {
		if (req.isAuthenticated()) {
			return res.status(302).redirect('/signout');
		}
		return next();
	},
};
// TODO: Change this from redirects to a more API way.
