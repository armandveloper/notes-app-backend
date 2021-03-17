const { Router } = require('express');
const { body, param } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { checkErrors } = require('../middlewares/checkErrors');
const {
	createNote,
	updateNote,
	toggleCompleted,
	getNotes,
	deleteNote,
} = require('../controllers/notes.controller');

const router = Router();

router.get('/', validateJWT, getNotes);

router.post(
	'/',
	[
		validateJWT,
		body('title', "Note's title is required").not().isEmpty(),
		body('description', "Note's description is required").not().isEmpty(),
		body(
			'category',
			'Category values only must be: home, work or personal'
		).isIn(['home', 'work', 'personal']),
		body('user', 'User id must be valid').isMongoId(),
		checkErrors,
	],
	createNote
);
router.put(
	'/:id',
	[
		validateJWT,
		param('id', "Note's Id must be valid").isMongoId(),
		body('title', "Note's title is required").not().isEmpty(),
		body('description', "Note's description is required").not().isEmpty(),
		body(
			'category',
			'Category values only must be: home, work or personal'
		).isIn(['home', 'work', 'personal']),
		checkErrors,
	],
	updateNote
);

router.put(
	'/complete/:id',
	[
		validateJWT,
		param('id', "Note's Id must be valid").isMongoId(),
		body('completed', 'Completed is required').not().isEmpty(),
		checkErrors,
	],
	toggleCompleted
);

router.delete(
	'/:id',
	[
		validateJWT,
		param('id', "Note's Id must be valid").isMongoId(),
		checkErrors,
	],
	deleteNote
);

module.exports = router;
