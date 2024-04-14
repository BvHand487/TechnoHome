const mongoose = require('mongoose');

const sensorSchema = mongoose.Schema(
    {
        lampId: Number,
        name: String,
        enabled: Boolean,
        dim: Number,
    }
);


exports.Lamp = mongoose.model('Lamp', sensorSchema);
