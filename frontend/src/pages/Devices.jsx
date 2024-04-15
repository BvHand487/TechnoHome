import {React } from 'react'
import SensorList from '../components/sensors/SensorList';
import { Route, Routes } from 'react-router-dom';
import SensorData from '../components/sensors/SensorData';
import styles from './../components/sensors/sensors.css';

function Devices() {

    return (
        <div className='split'>
            <SensorList />
            <div className="divider divider-horizontal self-start h-20"></div>
            <Routes>
               <Route path="/devices/:id" element={ <SensorData />} /> 
            </Routes>
        </div>
    )
}

export default Devices