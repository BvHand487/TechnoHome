import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SensorEdit({ sensor })
{
    sensor = sensor[0];

    const [name, setName] = useState(sensor.name);
    const [update, setUpdate] = useState(sensor.updateTime);
    const [initialRender, setInitialRender] = useState(true);
    
    useEffect(() => {
        if (!initialRender)
        {
            const interval = setTimeout(() => {
                console.log('sending request name');
                axios.patch(`http://localhost:10000/api/sensors/${sensor.sensorId}?name=${name}`);
            }, 1000);

            return () => clearTimeout(interval);
        }
        else
        {
            setInitialRender(false);
        }
    }, [name])

    useEffect(() => {
        if (!initialRender)
        {
            const interval = setTimeout(() => {
                console.log('sending request update');
                axios.patch(`http://localhost:10000/api/sensors/${sensor.sensorId}?update=${update}`);
            }, 1000);

            return () => clearTimeout(interval);
        }   
        else
        {
            setInitialRender(false);
        }
    }, [update])

    const changeName = (e) => {
        const val = document.getElementById('name-input').value;
        setName(val);
    }

    const changeUpdate = () => {
        const val = document.getElementById('update-input').value;

        if (Number.parseInt(val) >= 30)
        {
            setUpdate(Number.parseInt(val));
        }
    }

    return (
        <>
            <div className="divider divider-horizontal self-start h-full"></div>
            <div className='flex flex-col items-center w-full h-full gap-6'>
                <p className='text-5xl'>Configuration</p>
                <div className="divider self-start w-full"></div>
                <div className='grid grid-cols-4 grid-rows-1 gap-5 w-full self-start'>
                    <p className='self-center text-xl'>Change Name:</p>
                    <input id="name-input" type="text" placeholder={sensor.name} className="col-span-2 input input-bordered input-primary w-full max-w-xs" />
                    <button className="btn btn-primary col-start-4" onClick={changeName}>Submit</button>
                </div>
                <div className='grid grid-cols-4 grid-rows-1 gap-5 w-full'>
                    <p className='self-center text-xl'>Change Interval:</p>
                    <input id="update-input" type="text" placeholder={sensor.updateTime} className="col-span-2 input input-bordered input-primary w-full max-w-xs" />
                    <button className="btn btn-primary col-start-4" onClick={changeUpdate}>Submit</button>
                </div>
            </div>
        </>
    )
}

export default SensorEdit