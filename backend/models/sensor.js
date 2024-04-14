const mongoose = require('mongoose');


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
