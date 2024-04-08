const mongoose = require('mongoose');


/**
 * @swagger
 * components:
 *   schemas:
 *     Sensor:
 *       type: object
 *       properties:
 *         sensorId:
 *           type: integer
 *           description: The sensors ID.
 *           example: 4
 *         name:
 *           type: string
 *           description: A user modifiable value.
 *           example: Bedroom
 *         updateTime:
 *           type: integer
 *           description: How periodically the sensors sends data to the server, in seconds.
 *           example: 300
 *         enabled:
 *           type: boolean
 *           description: Marks whether the sensor is enabled or not. Modifiable by users.
 *           example: True
 *         functioning:
 *           type: boolean
 *           description: Marks whether the sensor is functioning.
 *           example: False
 */
const sensorSchema = mongoose.Schema(
    {
        sensorId: Number,
        name: String,
        updateTime: Number,
        lastUpdate: Number,
        enabled: Boolean,
        lastEnabled: Number,
        functioning: Boolean,
    }
);


exports.Sensor = mongoose.model('Sensor', sensorSchema);
