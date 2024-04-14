import React from 'react';
import { Card, Typography, CardActions, Button, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { MdDevicesOther, MdOutlineBorderAll } from "react-icons/md";
import { GiPlainCircle } from "react-icons/gi";
import styles from './sensors.css';

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
        <Link to={`/devices/${id}`}>
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
        </Link>
    );
}

export default Sensor