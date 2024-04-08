require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const mqtt = require('./mqtt.js');

const app = express();
app.use(cors());

//app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', require('./routes'));

app.get('/api', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, 'public/home.html'));
});

app.get('*', (req, res) => {
    return res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
});

mongoose
    .connect(process.env.MONGO_CONN)
    .then(() => {
        console.log("Connected to database.");
        mqtt.init();

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port: ${process.env.PORT}`);
        })
    })
    .catch(err => {
        console.log(`Error occured: ${err}`);
    });
