const jwt = require('jsonwebtoken');

exports.verifyJWT = (req, res, next) => {
	const authHeader = req.headers['authorization'];

	if (authHeader == null) return res.sendStatus(401);

	if (!authHeader) return res.status(401).json({ error: 'No valid token' });
	jwt.verify(authHeader, process.env.JWT_TOKEN, (err, value) => {
		if (err) return res.status(401).json({ error: 'No valid token' });
		req.user = value.data;
		console.log(req);
		next();
	});
};

exports.ensureAuth = (req, res, next) => {
	if (req.session.user) {
		console.log(`Found User Session`);
		next();
	} else {
		console.log(`No User Session Found`);
		return res.status(401).send('Unauthorized');
	}
};
exports.ensureGuest = (req, res, next) => {
	if (req.session.user) {
		console.log(`Found User Session`);
		return res.status(401).send('Unauthorized');
	} else {
		console.log(`No User Session Found`);
		next();
	}
};
