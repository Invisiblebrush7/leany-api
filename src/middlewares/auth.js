const jwt = require('jsonwebtoken');
const secret = 'my-cool-secret';

exports.verify = (req, res, next) => {
	const authHeader = req.headers['authorization'];

	if (authHeader == null) return res.sendStatus(401);

	if (!authHeader) return res.status(401).json({ error: 'No valid token' });
	jwt.verify(authHeader, secret, (err, value) => {
		if (err) return res.status(401).json({ error: 'No valid token' });
		req.user = value.data;
		next();
	});
};
