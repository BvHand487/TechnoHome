import {React } from 'react'
import SensorList from '../components/sensors/SensorList';
import { Route, Routes, useParams } from 'react-router-dom';
import SensorData from '../components/sensors/SensorData';
import './../components/sensors/sensors.css';
import SensorEdit from '../components/sensors/SensorEdit';
import useSWR from 'swr';
import { CircularProgress } from '@mui/material';


function Devices() {

    const { data, error, isLoading } = useSWR(`http://localhost:10000/api/sensors`, (uri) => fetch(uri)
        .then(res => res.json()));

    if (isLoading)
        return <CircularProgress />;

    if (error)
    {
        console.log(error)
        return <div>Error!</div>
    }

    return (
        <div className='m-[20px]'>
            <SensorList sensors={data}/>
        </div>
    )
}

export default Devices