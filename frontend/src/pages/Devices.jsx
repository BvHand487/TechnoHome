import {React, useState} from 'react'
import SensorList from '../components/sensors/SensorList';
import { Route, Routes, useParams, Outlet } from 'react-router-dom';
import SensorData from '../components/sensors/SensorData';
import './../components/sensors/sensors.css';

function Devices() {

    return (
        <div className='split'>
            <SensorList />
            <Routes>
               <Route path="/devices/:id" element={ <SensorData />} /> 
            </Routes>
        </div>
    )
}

export default Devices