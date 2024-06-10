# TechnoHome
## Overview
TechnoHome is a smart home IoT system that allows the monitoring of values like temperature, humidity, air quality, etc. throughout the home as well as the enabling of lamps. The system integrates various sensors and actuators, providing real-time data and remote control capabilities to enhance home automation and efficiency.

## Features
- **Monitoring**: Monitors temperature, humidity, air quality, etc and stores the data in a database.
- **Remote Control**: Allows enabling/disabling of "lamps" (LEDs as of now) remotely through the UI.

## System Architecture
- **Sensors**: temperature, humidity, pressure, smoke, benzene, air quality, etc.
- **Microcontroller**: ESP8266 that reads the data from the sensors and communicates with the server.
- **Server**: Receives data from multiple microcontrollers, stores the data in a MongoDB database and acts as a backend for the UI.
- **Network**: Every device is on the same LAN.

<img src="assets/84194378/2e0f483e-ea34-47e4-99a6-0ee6a7771344" width="200">
![microcontroller-and-sensors](https://github.com/BvHand487/TechnoHome/assets/84194378/2e0f483e-ea34-47e4-99a6-0ee6a7771344)
*A prototype of an end device (MCU and sensors)*

