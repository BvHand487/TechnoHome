import {React } from 'react'
import SensorList from '../components/sensors/SensorList';
import { Route, Routes } from 'react-router-dom';
import SensorData from '../components/sensors/SensorData';
import './../components/sensors/sensors.css';

function Devices() {

    return (
        <div className='m-[20px] flex flex-row h-full justify-start items-start w-['>
            <SensorList />
            <Routes>
               <Route path="/:id" element={ <SensorData />} /> 
            </Routes>
        </div>
    )
}

export default Devices