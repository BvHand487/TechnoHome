const express = require('express');
const router = express.Router();

router.use('/records', require('./records'));
router.use('/sensors', require('./sensors'));

module.exports = router;
