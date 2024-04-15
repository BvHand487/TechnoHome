import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Charts from '../Charts';
import './sensors.css';


function SensorData()
{
    const [type, setType] = useState("Overview");
    const params = useParams();

    console.log(params.id);

    return (
        <>
            <div className='flex flex-col w-full h-full items-center justify-between'>
                <div className="charts flex flex-col w-full h-full items-center justify-start gap-10">

                    <Charts id={params.id} type={type}/>

                </div>

                <div className="join self-center gap">
                    
                    <input className="join-item btn" type="radio" name="options" aria-label='Overview' defaultChecked
                    onClick={() => setType("Overview")}/>
                    <input className="join-item btn" type="radio" name="options" aria-label='Temperature'
                    onClick={() => setType("temperature")}/>
                    <input className="join-item btn" type="radio" name="options" aria-label='Air Quality'
                    onClick={() => setType("ppm")}/>
                    <input className="join-item btn" type="radio" name="options" aria-label='Humidity'
                    onClick={() => setType("humidity")}/>
                    <input className="join-item btn" type="radio" name="options" aria-label='Pressure'
                    onClick={() => setType("pressure")}/>
                    <input className="join-item btn" type="radio" name="options" aria-label='Altitude'
                    onClick={() => setType("altitude")}/>
                    <input className="join-item btn" type="radio" name="options" aria-label='More'
                    onClick={() => setType("More")}/>
                </div>
            </div>
        </>
    )
}

export default SensorData