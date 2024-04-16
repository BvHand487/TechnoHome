import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import useSWR from 'swr';
import Sensor from './Sensor';
import './sensors.css';
import { Routes, Route } from 'react-router-dom';
import SensorData from './SensorData';
import SensorEdit from './SensorEdit';

function SensorList({ sensors })
{
    const [selected, setSelected] = useState(0);

    return (
        <div className="flex flex-row h-full w-full">
            {sensors.map(s => {
                
                let status = 'faulty';

                if (s.enabled && s.functioning)
                    status = 'active';

                else if (!s.enabled && s.functioning)
                    status = 'paused';

                else if (!s.functioning)
                    status = 'faulty';


                return (
                    <div className='flex flex-col gap-[1em] w-[40em]' onClick={() => {setSelected(s.sensorId)}}>
                        <Sensor key={s.sensorId} id={s.sensorId} name={s.name} status={status} />
                    </div>
                );
            })}
            <Routes>
                <Route path="/:id" element={ <SensorData />} /> 
                <Route path="/:id/config" element={ <SensorEdit sensor={sensors.filter((d) => d.sensorId == selected)}/>} /> 
            </Routes>
        </div>
    )
}

export default SensorList