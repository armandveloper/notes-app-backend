const { Router } = require('express');
const { body } = require('express-validator');
const { checkErrors } = require('../middlewares/checkErrors');
const { validateJWT } = require('../middlewares/validate-jwt');
const {
	signup,
	signin,
	renewToken,
} = require('../controllers/auth.controller');

const router = Router();

router.post(
	'/signin',
	[
		body('email').isEmail().withMessage('Email must be valid'),
		body('password').not().isEmpty().withMessage('Password is required'),
		checkErrors,
	],
	signin
);

router.post(
	'/signup',
	[
		body('email').isEmail().withMessage('Email must be valid'),
		body('password').not().isEmpty().withMessage('Password is required'),
		checkErrors,
	],
	signup
);

router.get('/renewToken', validateJWT, renewToken);

module.exports = router;
