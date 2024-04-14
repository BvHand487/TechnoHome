const express = require('express');
const router = express.Router();
const config = require('../config')
const Lamp = require('../models/lamp').Lamp;


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
        const lamps = await Sensor.find({ "lampId": req.params.id });

        return res.status(200).json(lamps);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("API wrong format.");
    }
});

router.patch('/:id', async(req, res) => {
    try {
        console.log("In patch: " + req.params.id + " | " + req.query.enabled )

        let enabled = false;

        if (isNaN(req.params.id))
            return;

        if (req.query.enabled)
        {
            if (req.query.enabled === '0')
                enabled = false;
            else if (req.query.enabled === '1')
                enabled = true;
        }

        if (req.query.name)
            await Lamp.updateOne({ lampId: Number.parseInt(req.params.id) }, { enabled: enabled, name: req.query.name });

        return res.status(200).json([]);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("API wrong format.");
    }
});


module.exports = router;