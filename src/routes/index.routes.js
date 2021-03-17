const { Router } = require('express');

const router = Router();

router.use('/auth', require('./auth.routes'));
router.use('/notes', require('./notes.routes'));

module.exports = router;
