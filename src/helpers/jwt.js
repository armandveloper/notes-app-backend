const jwt = require('jsonwebtoken');

exports.generateJWT = (uid) => {
	return new Promise((resolve, reject) => {
		const payload = { uid };
		jwt.sign(
			payload,
			process.env.JWT_KEY,
			{
				expiresIn: '24h',
			},
			(err, token) => {
				if (err) {
					console.log(err);
					return reject("Token does't generated");
				}
				resolve(token);
			}
		);
	});
};
