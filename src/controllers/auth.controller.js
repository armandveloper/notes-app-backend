const { generateJWT } = require('../helpers/jwt');
const User = require('../models/User');

exports.signin = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({
				success: false,
				msg: 'Email or Password invalid',
			});
		}
		const isValidPassword = await user.comparePassword(password);
		if (!isValidPassword) {
			return res.status(400).json({
				success: false,
				msg: 'Email or Password invalid',
			});
		}
		const token = await generateJWT(user.id);
		return res.json({ success: true, msg: 'Logged', user, token });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			msg: 'Server error. Please try later',
		});
	}
};

exports.signup = async (req, res) => {
	try {
		const { email, password } = req.body;
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res
				.status(400)
				.json({ success: false, msg: 'User already exists' });
		}
		const user = new User(req.body);
		await user.hashPassword(password);
		await user.save();
		// Generar token
		const token = await generateJWT(user.id);
		return res
			.status(201)
			.json({ success: true, msg: 'Signup successfully', user, token });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ success: false, msg: 'Server error. Please try later' });
	}
};

exports.renewToken = async (req, res) => {
	try {
		const { uid } = req;
		const token = await generateJWT(uid);
		const user = await User.findById(uid);
		return res.json({
			success: true,
			msg: 'Token was renewed',
			user,
			token,
		});
	} catch (err) {
		console.log(err);
		res.json({ success: false, msg: 'Error renewing token' });
	}
};
