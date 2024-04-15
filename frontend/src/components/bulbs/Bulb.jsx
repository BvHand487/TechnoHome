import { useState, React, useEffect } from 'react';    
import { Card, Typography, CardActions, Button, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { IoBulbOutline } from "react-icons/io5";
import styles from './bulbs.css';
import axios from 'axios';


function Bulb({ id, status, name })
{
    const [enabled, setEnabled] = useState((status == 'off') ? false : true);
    const [initialRender, setInitialRender] = useState(true);

    const toggleLamp = () => {
        setEnabled(!enabled);

        console.log('new state -> ' + enabled)
    }

    // Send updates to lamp
    useEffect(() => {
        if (!initialRender)
        {
            const interval = setTimeout(() => {
                console.log('sending request');
                axios.patch(`http://localhost:10000/api/lamps/${id}?enabled=${(enabled) ? 'true' : 'false'}`);
            }, 1000);

            return () => clearTimeout(interval);
        }
        else
        {
            setInitialRender(false);
        }
            
    }, [enabled]);

    console.log("in bulb component")

    return (
            <div className="collapse collapse-arrow bg-base-200 w-96 h-36">
                <input type="radio" name="my-accordion-2" defaultChecked /> 
                <div className="collapse-title text-xl font-medium">
                    {name}
                </div>
                <div className="collapse-content"> 
                    <input type="checkbox" className="toggle toggle-info" defaultChecked={(status === 'off' ? false : true)} onClick={toggleLamp}/>
                </div>
            </div>
    );
}

export default Bulb;

/*
<Card className='bulb-card'>
    <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            <IoBulbOutline size={20}/>
            {name}
        </Typography>
    </CardContent>
    <CardActions>
        <input type="checkbox" className="toggle" checked/>
    </CardActions>
</Card>

<div className="collapse collapse-arrow bg-base-200">
  <input type="radio" name="my-accordion-2" defaultChecked /> 
  <div className="collapse-title text-xl font-medium">
    Click to open this one and close others
  </div>
  <div className="collapse-content"> 
    <p>hello</p>
  </div>
</div>
*/