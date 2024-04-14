const config = require('./config.js');
const utils = require('./utils.js');
const Record = require('./models/record.js').Record;
const Sensor = require('./models/sensor.js').Sensor;
const Lamp = require('./models/lamp.js').Lamp;


function unexpectedMqtt(topic, msg) {
    console.log(`Unexpected mqtt message from sensor - topic: ${topic}, msg: ${msg}`);
}

function unexpectedValue(topic, value) {
    console.log(`Unexpected value from sensor - topic: ${topic}, val - ${value}`);
}

async function handleLamp(lampId, enabled, dim)
{
    const res = await Lamp.findOne({ lampId: lampId });

    const newEnabled = (enabled == '1' ? true : false);
    const newDim = (utils.inRange(Number.parseInt(dim), config.DIM_LO, config.DIM_HI) ? Number.parseInt(dim) : 0)

    if (!res)
    {
        // If the received msg isnt in the db add it.
        await Lamp.create({
            lampId: lampId,
            name: "Unnamed",
            enabled: newEnabled,
            dim: newDim
        });
    }

    else
    {
        // Else update the already stored data about the sensor.
        await Lamp.updateOne({ lampId: lampId }, { enabled: newEnabled, dim: newDim });
    }
}

async function handleSensor(sensorId, enabled, updateTime)
{
    const res = await Sensor.findOne({ sensorId: sensorId });

    const newEnabled = (enabled == '1' ? true : false);
    const newUpdate = (Number.parseInt(updateTime) >= 30) ? Number.parseInt(updateTime) : 0;

    if (!res)
    {
        // If the received msg isnt in the db add it.
        await Sensor.create({
            sensorId: sensorId,
            name: "Unnamed",
            updateTime: newUpdate,
            lastUpdate: Date.now(),
            enabled: newEnabled,
            lastEnabled: Date.now(),
            functioning: 1,
        });
    }

    else
    {
        // Else update the already stored data about the sensor.
        await Sensor.updateOne({ sensorId: sensorId }, { lastUpdate: Date.now(), updateTime: newUpdate, enabled: newEnabled, lastEnabled: Date.now(), functioning: 1 });
    }
}

async function handleScan(msg)
{
    msg = msg.toString();
    const splitted = msg.split(' ');

    const sensorId = Number.parseInt(splitted[0]);
    handleSensor(sensorId, splitted[1], splitted[2]);

    const lampId = Number.parseInt(splitted[0]);
    handleLamp(lampId, splitted[3], splitted[4]);
}

async function handleSensorConfig(msg)
{
    console.log("sensor config");

    msg = msg.toString()
    console.log(msg);

    const splitted = msg.split(' ');

    const sensorId = Number.parseInt(splitted[0]);
    msg = splitted[1];

    if (msg == 'true' || msg == 'false')
    {
        await Sensor.updateOne({ sensorId: sensorId }, { enabled: msg });
        return;
    }

    else if (!isNaN(msg) && Number.parseInt(msg) >= 30)
    {
        await Sensor.updateOne({ sensorId: sensorId }, { updateTime: Number.parseInt(msg) });
        return;
    }
}

async function handleLampConfig(msg)
{
    msg = msg.toString()
    console.log(msg);

    const splitted = msg.split(' ');

    const lampId = Number.parseInt(splitted[0]);
    msg = splitted[1];

    if (msg == 'true' || msg == 'false')
    {
        await Lamp.updateOne({ lampId: lampId }, { enabled: msg });
        return;
    }

    else if (!isNaN(msg) && utils.inRange(Number.parseInt(msg), config.DIM_LO, config.DIM_HI))
    {
        await Lamp.updateOne({ lampId: lampId }, { dim: Number.parseInt(msg) });
        return;
    }
}

async function handleMessage(msg)
{
    msg = msg.toString()

    console.log('received message from sensor! -> ', msg);
    const splitted = msg.split(' ');

    if (splitted.length !== 9)
    {
        unexpectedMqtt(config.TOPICS.measurement, msg);
        return;
    }

    try {
        if (Number(splitted[0]) < 0)
        {
            unexpectedMqtt(config.TOPICS.measurement, msg)
            return;
        }
    } catch (err) {
        unexpectedMqtt(config.TOPICS.measurement, msg)
        return;
    }

    let val = null;

    try {
        val = Number(splitted[1]);
        val = Number(splitted[2]);
        val = Number(splitted[3]);
        val = Number(splitted[4]);
        val = Number(splitted[5]);
        val = Number(splitted[6]);
        val = Number(splitted[7]);
        val = Number(splitted[8]);
    }
    catch (err) {
        unexpectedValue(config.TOPICS.measurement, msg);
        return;
    }

    if (!utils.inRange(splitted[1], config.PPM_LO, config.PPM_HI))
        unexpectedValue(config.TOPICS.measurement, splitted[1]);

    if (!utils.inRange(splitted[2], config.TEMP_LO, config.TEMP_HI))
        unexpectedValue(config.TOPICS.measurement, splitted[2]);

    if (!utils.inRange(splitted[3], config.PRESSURE_LO, config.PRESSURE_HI))
        unexpectedValue(config.TOPICS.measurement, splitted[3]);

    if (!utils.inRange(splitted[4], config.HUMIDITY_LO, config.HUMIDITY_HI))
        unexpectedValue(config.TOPICS.measurement, splitted[4]);

    if (!utils.inRange(splitted[5], config.ALTITUDE_LO, config.ALTITUDE_HI))
        unexpectedValue(config.TOPICS.measurement, splitted[5]);

    if (!utils.inRange(splitted[6], config.BENZENE_LO, config.BENZENE_HI))
        unexpectedValue(config.TOPICS.measurement, splitted[6]);

    if (!utils.inRange(splitted[7], config.ALCOHOL_LO, config.ALCOHOL_HI))
        unexpectedValue(config.TOPICS.measurement, splitted[7]);

    if (!utils.inRange(splitted[8], config.SMOKE_LO, config.SMOKE_HI))
        unexpectedValue(config.TOPICS.measurement, splitted[8]);

    const newRecord = {
        sensorId: Number(splitted[0]),
        time: new Date(),
        ppm: Number(splitted[1]),
        temperature: Number(splitted[2]),
        pressure: Number(splitted[3]),
        humidity: Number(splitted[4]),
        altitude: Number(splitted[5]),
        benzene: Number(splitted[6]),
        alcohol: Number(splitted[7]),
        smoke: Number(splitted[8]),
    };

    await Record.create(newRecord);

    handleSensor(Number(splitted[0]));
}

const mqtt = require('mqtt');
let client;

module.exports.init = () => {
    client = mqtt.connect(config.BROKER_OPTIONS);

    console.log('Connected to MQTT broker.');

    client.subscribe(config.TOPICS.measurement);
    client.subscribe(config.TOPICS.scan);
    client.subscribe(config.TOPICS.sensorConfig);
    client.subscribe(config.TOPICS.lampConfig);

    client.on('connect', () => {
        client.publish('scan-req', '');
    });

    const sensorUpdate = setInterval(async () => {

        const sensors = await Sensor.find({});
    
        for (i = 0; i < sensors.length; ++i)
        {
            if (sensors[i].enabled)
            {
                if (sensors[i].enabled == true && (sensors[i].functioning && Date.now() - sensors[i].lastUpdate > 5 * 1000 * sensors[i].updateTime))  // If last 5 records are missing mark as unfunctioning
                {
                    await Sensor.updateOne({ sensorId: sensors[i].sensorId }, { functioning: 0 });
                }
            }
        }
    
    }, config.SENSOR_STATUS_UDPATE * 1000);

    
    // msg:
    // 'measurement' -> '<sensor ID> <ppm> <temp> <pres> <humi> <alt> <benzene> <alcohol> <smoke>'
    // 'scan' -> '<sensor ID'
    // 'config' -> '<sensor ID> <enabled | updateTime>'
    client.on('message', async (topic, msg) => {

        switch(topic)
        {
            case config.TOPICS.measurement:
                handleMessage(msg);
                return;

            case config.TOPICS.scan:
                handleScan(msg);
                return;

            case config.TOPICS.sensorConfig:
                handleSensorConfig(msg);
                return;

            case config.TOPICS.lampConfig:
                handleLampConfig(msg);
                return;
        }
    });
}


module.exports.sensorConfig = (sensorId, configMsg) => {    
    client.publish(`${config.TOPICS.sensorConfig}/${sensorId}`, configMsg);
}

module.exports.lampConfig = (lampId, configMsg) => {
    console.log("In lamp config: " + lampId + " | " + configMsg)
    client.publish(`${config.TOPICS.lampConfig}/${lampId}`, configMsg);
}
