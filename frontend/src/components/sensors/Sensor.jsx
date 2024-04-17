import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GiPlainCircle } from "react-icons/gi";
import './sensors.css';
import axios from 'axios';


function Sensor({ id, status, name })
{
    const [paused, setPaused] = useState((status == 'paused'));
    const [initialRender, setInitialRender] = useState(true);

    let color = '#000000';

    if (status === 'faulty')
        color = '#eb4034';
    else if (status === 'paused')
        color = '#ebab34';
    else if (status === 'active')
        color = '#34eb56';

    const toggleSensor = () => {
        setPaused(!paused)

        console.log('new paused -> ', paused)
    }

    // Send paused update to sensor
    useEffect(() => {
        if (!initialRender)
        {
            const interval = setTimeout(() => {
                console.log('sending request enabled');
                axios.patch(`http://localhost:10000/api/sensors/${id}?enabled=${(!paused) ? 'true' : 'false'}`);
            }, 1000);

            return () => clearTimeout(interval);
        }
        else
        {
            setInitialRender(false);
        }
            
    }, [paused]);

    return (
        <div className="collapse collapse-arrow bg-base-200 w-full">
            <input type="radio" name="my-accordion-2" /> 
            <div className="collapse-title text-xl font-medium">
                <div className="flex flex-row justify-start gap-4 relative">
                    <p className='w-full'>{name}</p>
                    <GiPlainCircle color={color} className='border-neutral border-solid border-[2px] rounded-full h-full' size='30px'/>
                </div>
            </div>
            <div className="collapse-content"> 
                <div className="divider"></div>
                <div className='flex flex-col w-full justify-start gap-4'>
                    <div className="flex flex-row gap-4 h-[50px] items-center">
                        <p>Paused: </p>
                        <input type="checkbox" className="toggle toggle-primary" defaultChecked={(status != 'paused' ? false : true)} onClick={toggleSensor}/>
                    </div>
                    <div className='flex flex-row gap-4 justify-center'>
                        <div className=''>
                            <Link to={`/devices/${id}`}>
                                <button className="btn btn-primary w-[120px]" >Show Data</button>
                            </Link>
                        </div>
                        <div className=''>
                            <Link to={`/devices/${id}/config`}>
                                <button className="btn btn-primary w-[120px]">Edit</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

//<input type="checkbox" className="toggle toggle-primary" defaultChecked={enabled} onClick={toggleLamp}/>

export default Sensor

/*

<Card className='sensor-card'>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <MdDevicesOther size={20}/>
                        {name}
                        <GiPlainCircle color={color}/>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">See More</Button>
                </CardActions>
            </Card>

            <div className="collapse collapse-arrow bg-base-200 w-96 h-36">
                <input type="radio" name="my-accordion-2" defaultChecked /> 
                <div className="collapse-title text-xl font-medium">
                    {name}
                </div>
                <div className="collapse-content"> 
                    <input type="checkbox" className="toggle toggle-info" checked />
                </div>
            </div>
*/