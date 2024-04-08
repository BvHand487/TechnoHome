const express = require('express');
const router = express.Router();
const config = require('../config');
const Sensor = require('../models/sensor').Sensor;
const sensorConfig = require('./../mqtt').sensorConfig;


router.get('/', async (req, res) => {
    try {
        const sensors = await Sensor.find({});

        return res.status(200).json(sensors);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("API wrong format.");
    }
});

router.get('/:id', async (req, res) => {
    try {
        const sensors = await Sensor.find({ "sensorId": req.params.id });

        return res.status(200).json(sensors);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("API wrong format.");
    }
});


router.patch('/:id', async(req, res) => {
    try {
        if (req.query.enabled && (req.query.enabled == '0' || req.query.enabled == '1'))
        {
            sensorConfig(req.params.id, `${req.query.enabled}`);
        }
        else if (req.query.update && Number.parseInt(req.query.update) >= 30)
        {
            sensorConfig(req.params.id, `${req.query.update}`);
        }

        if (req.query.name)
            await Sensor.updateOne({ sensorId: Number.parseInt(req.params.id) }, { name: req.query.name });

        return res.status(200).json([]);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("API wrong format.");
    }
});


router.delete('/:id', async(req, res) => {
    try {
        let filter = { "sensorId" : req.params.id }

        await Sensor.deleteOne(filter);

        return res.status(200).json(sensors);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("API wrong format.");
    }
});


module.exports = router;
