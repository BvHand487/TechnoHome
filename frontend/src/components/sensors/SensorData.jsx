import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Charts from '../Charts';
import './sensors.css';


function SensorData() {
    const [type, setType] = useState("Overview");
    const params = useParams();

    console.log(params.id);

    return (
        <>
            <div className="divider divider-horizontal self-start h-full"></div>
            <div className='flex flex-col w-full h-full items-center'>
                <div className="charts flex flex-row flex-wrap w-full h-[77.5vh] justify-start items-center gap-6">

                    <Charts id={params.id} type={type} />

                </div>

                <div className="join self-center m-2">

                    <input className="join-item btn" type="radio" name="options" aria-label='Overview' defaultChecked
                        onClick={() => setType("Overview")} />
                    <input className="join-item btn" type="radio" name="options" aria-label='Temperature'
                        onClick={() => setType("temperature")} />
                    <input className="join-item btn" type="radio" name="options" aria-label='Air Quality'
                        onClick={() => setType("ppm")} />
                    <input className="join-item btn" type="radio" name="options" aria-label='Humidity'
                        onClick={() => setType("humidity")} />
                    <input className="join-item btn" type="radio" name="options" aria-label='Pressure'
                        onClick={() => setType("pressure")} />
                    <input className="join-item btn" type="radio" name="options" aria-label='More'
                        onClick={() => setType("More")} />
                </div>
            </div>
        </>
    )
}

export default SensorData