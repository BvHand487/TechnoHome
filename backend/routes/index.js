const express = require('express');
const router = express.Router();

router.use('/records', require('./records'));
router.use('/sensors', require('./sensors'));
router.use('/lamps', require('./lamps'));

module.exports = router;
