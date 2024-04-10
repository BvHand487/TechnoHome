module.exports.BROKER_OPTIONS = {
    hostname: 'localhost',
    port: 1883,
    username: 'SmartHomeConnection',
    password: 'SmartHomePassword'
};

module.exports.TOPICS = {
    scan: 'scan-res',
    config: 'config',
    measurement: 'measurement'
};

module.exports.TYPES = {
    temp: 'temp',
    humidity: 'humidity',
    pressure: 'pressure',
    altitude: 'altitude',
    benzeneConcentration: 'benzene',
    alcoholConcentration: 'alcohol',
    smokeConcentration: 'smoke',
    ppm: 'ppm',
};


module.exports.SENSOR_STATUS_UDPATE = 60;  // secs


module.exports.PPM_LO = 0;
module.exports.PPM_HI = 1000;

module.exports.TEMP_LO = -30;
module.exports.TEMP_HI = 50;

module.exports.PRESSURE_LO = -50;
module.exports.PRESSURE_HI = 50;

module.exports.HUMIDITY_LO = 0;
module.exports.HUMIDITY_HI = 100;

module.exports.ALTITUDE_LO = 0;
module.exports.ALTITUDE_HI = 10000;

module.exports.BENZENE_LO = 0;
module.exports.BENZENE_HI = 100;

module.exports.ALCOHOL_LO = 0;
module.exports.ALCOHOL_HI = 100;

module.exports.SMOKE_LO = 0;
module.exports.SMOKE_HI = 100;