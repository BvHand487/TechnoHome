const express = require('express');
const router = express.Router();
const config = require('../config');
const utils = require('./../utils.js');
const Lamp = require('../models/lamp').Lamp;
const lampConfig = require('./../mqtt').lampConfig;


router.get('/', async (req, res) => {
    try {
        const lamps = await Lamp.find({});

        res.setHeader('Content-Type', 'application/json');

        return res.status(200).json(lamps);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("API wrong format.");
    }
});

router.get('/:id', async (req, res) => {
    try {
        const lamps = await Lamp.find({ "lampId": req.params.id });

        return res.status(200).json(lamps);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("API wrong format.");
    }
});

router.patch('/:id', async(req, res) => {

    console.log('received request ' + req.params.id + ' | ' + req.query.enabled + ' ' + req.query.dim)

    try {
        if (req.query.enabled && (req.query.enabled == 'true' || req.query.enabled == 'false'))
        {
            lampConfig(req.params.id, `${req.query.enabled}`);
        }
        else if (req.query.dim && utils.inRange(Number.parseInt(req.query.dim), config.DIM_LO, config.DIM_HI))
        {
            lampConfig(req.params.id, `${req.query.dim}`);
        }

        if (req.query.name)
            await Lamp.updateOne({ lampId: Number.parseInt(req.params.id) }, { name: req.query.name });

        return res.status(200).json([]);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("API wrong format.");
    }
});


module.exports = router;