import React from 'react';
import { Link } from 'react-router-dom';
import { GiPlainCircle } from "react-icons/gi";
import './sensors.css';

function Sensor({ id, status, name })
{
    let color = '#000000';

    if (status === 'faulty')
        color = '#eb4034';
    else if (status === 'paused')
        color = '#ebab34';
    else if (status === 'active')
        color = '#34eb56';

    return (
        <div className="collapse collapse-arrow bg-base-200 w-96 h-36">
            <input type="radio" name="my-accordion-2" defaultChecked /> 
            <div className="collapse-title text-xl font-medium">
                {name}
                <GiPlainCircle color={color}/>
            </div>
            <div className="collapse-content"> 
                <Link to={`/devices/${id}`}>
                    <button className="btn btn-primary">Show Data</button>
                </Link>
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