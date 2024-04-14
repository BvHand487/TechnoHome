import React from 'react';
import { useParams } from 'react-router-dom';


function SensorData()
{
    const params = useParams();

    console.log("IN SENSOR DATA");

    return (
        <>
            <div>SensorData</div>
        </>
    )
}

export default SensorData