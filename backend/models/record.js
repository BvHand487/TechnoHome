const mongoose = require('mongoose');


/**
 * @swagger
 * components:
 *   schemas:
 *     Record:
 *       type: object
 *       properties:
 *         sensorId:
 *           type: integer
 *           description: The sensor ID of the sensor from which the record originates.
 *           example: 0
 *         time:
 *           type: date
 *           description: The time at which the record was created.
 *           example: 2023-06-21T04:22:56.560Z
 *         type:
 *           type: string
 *           description: The type of record, usually one of { "temp", "humidity", "pressure" }
 *           example: temp
 *         value:
 *           type: number
 *           description: The value of the measurement.
 *           example: 21.75
 */
const recordSchema = mongoose.Schema(
    {
        sensorId: Number,
        time: Date,
        ppm: Number,  // air quality
        temperature: Number,
        pressure: Number,
        humidity: Number,
        altitude: Number,
        benzene: Number,  // concentration
        alcohol: Number,  // concentration
        smoke: Number,  // concentration
    },
    {
        timeseries: {
            timeField: 'time',
            granularity: 'minutes',
        },
    }
);


exports.Record = mongoose.model('Record', recordSchema);
