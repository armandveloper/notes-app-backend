const jwt = require('jsonwebtoken');

exports.validateJWT = (req, res, next) => {
	try {
		const token = req.headers['x-token'];
		if (!token) {
			return res
				.status(401)
				.json({ success: false, msg: 'Any token was provided' });
		}
		const { uid } = jwt.verify(token, process.env.JWT_KEY);
		req.uid = uid;
		next();
	} catch {
		res.status(401).json({ success: false, msg: 'Invalid token' });
	}
};
