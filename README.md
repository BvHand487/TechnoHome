# TechnoHome
## Overview
TechnoHome is a smart home IoT system that allows the monitoring of values like temperature, humidity, air quality, etc. throughout the home as well as the enabling of lamps. The system integrates various sensors and actuators, providing real-time data and remote control capabilities to enhance home automation and efficiency.

## Features
- **Monitoring**: Monitors temperature, humidity, air quality, etc and stores the data in a database.
- **Remote Control**: Allows enabling/disabling of "lamps" (LEDs as of now) remotely through the UI.

## System Architecture
- **Sensors**: temperature, humidity, pressure, smoke, benzene, air quality, etc.
- **Microcontroller**: Microcontroller that reads the data from the sensors and communicates with the server.
- **Server**: Receives data from multiple microcontrollers, stores the data in a MongoDB database and acts as a backend for the UI.
- **Network**: Every device is on the same LAN.

## Technologies
- **Frontend**: React for the UI
- **Backend**: Express framework for the backend server
- **Database**: MongoDB for storing sensor data
- **Runtime**: Node.js
- **Microcontroller**: ESP8266 for sensor and lamp control
- **Sensors**: BME280 for temperature, humidity, and pressure; MQ-135 for air quality
- **Electronic Components**: LED, BJT transistor, Resistor

<br>
<br>
<br>

<p align="center">
  <img src="https://github.com/BvHand487/TechnoHome/assets/84194378/2e0f483e-ea34-47e4-99a6-0ee6a7771344" alt="drawing" width=500/>
  <p align="center"> *A prototype of an end device (MCU and sensors)*</p>
</p>

