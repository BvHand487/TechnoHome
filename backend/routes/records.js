const express = require('express');
const router = express.Router();
const config = require('../config')
const Record = require('../models/record').Record;
const TYPES = require('./../config').TYPES;


router.get('/', async (req, res) => {
    try {
        let filter = {}

        if (req.query.after)
            if (!isNaN(req.query.after))
                Object.assign(filter, { time: { $gte: Number(req.query.after)}});  
            else
                Object.assign(filter, { time: { $gte: Date.parse(req.query.after)}});  
            
        if (req.query.id && !Number.isNaN(req.query.id))
            Object.assign(filter, { "sensorId": req.query.id });

        if (req.query.type && !Object.values(config.TYPES).includes(req.query.type))
            throw Error("undefined type");

        let records = await Record.find(filter);

        if (req.query.type)
            switch (req.query.type)
            {
                case TYPES.ppm:
                    records = records.map(({sensorId, time, ppm }) => ({ sensorId, time, ppm })); break;
                case TYPES.temp:
                    records = records.map(({sensorId, time, temperature }) => ({ sensorId, time, temperature })); break;
                case TYPES.pressure:
                    records = records.map(({sensorId, time, pressure }) => ({ sensorId, time, pressure })); break;
                case TYPES.humidity:
                    records = records.map(({sensorId, time, humidity }) => ({ sensorId, time, humidity })); break;
                case TYPES.altitude:
                    records = records.map(({sensorId, time, altitude }) => ({ sensorId, time, altitude })); break;
                case TYPES.benzeneConcentration:
                    records = records.map(({sensorId, time, benzene }) => ({ sensorId, time, benzene })); break;
                case TYPES.alcoholConcentration:
                    records = records.map(({sensorId, time, alcohol }) => ({ sensorId, time, alcohol })); break;
                case TYPES.smokeConcentration:
                    records = records.map(({sensorId, time, smoke }) => ({ sensorId, time, smoke })); break;
            }

        res.setHeader('Content-Type', 'application/json');

        return res.status(200).json(records);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ msg: err });
    }  
});

router.delete('/', async (req, res) => {
    // TODO!
})


module.exports = router;