const mongoose = require('mongoose');


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
