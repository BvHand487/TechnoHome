import { useState, React, useEffect } from 'react';    
import { Card, Typography, CardActions, Button, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { IoBulbOutline } from "react-icons/io5";
import styles from './bulbs.css';
import axios from 'axios';


function Bulb({ id, name, enabled, dim })
{
    const [toggled, setToggled] = useState(enabled);
    const [pwm, setPwm] = useState(dim)
    const [initialRender, setInitialRender] = useState(true);

    const toggleLamp = () => {
        setToggled(!toggled);

        console.log('new state -> ', toggled)
    }

    const changePwm = (e) => {
        setPwm(e.target.value);

        console.log('new pwm -> ', e.target.value)
    }

    // Send enabled update to lamp
    useEffect(() => {
        if (!initialRender)
        {
            const interval = setTimeout(() => {
                console.log('sending request enabled');
                axios.patch(`http://localhost:10000/api/lamps/${id}?enabled=${(toggled) ? 'true' : 'false'}`);
            }, 1000);

            return () => clearTimeout(interval);
        }
        else
        {
            setInitialRender(false);
        }
            
    }, [toggled]);

    // Send dim update to lamp
    useEffect(() => {
        if (!initialRender)
        {
            const interval = setTimeout(() => {
                console.log('sending request dim');
                axios.patch(`http://localhost:10000/api/lamps/${id}?dim=${pwm}`);
            }, 1000);

            return () => clearTimeout(interval);
        }
        else
        {
            setInitialRender(false);
        }
            
    }, [pwm]);

    console.log("in bulb component")

    return (
        <div className="collapse collapse-arrow bg-base-200 w-full">
            <input type="radio" name="my-accordion-2" /> 
            <div className="collapse-title text-xl font-medium">
                <p>{name}</p>
            </div>
            <div className="collapse-content"> 
                <div className="divider"></div>
                <div className="flex flex-col gap-4 items-start justify-start">
                    <div className="flex flex-row gap-4">
                        <p>Enabled: </p>
                        <input type="checkbox" className="toggle toggle-primary" defaultChecked={enabled} onClick={toggleLamp}/>
                    </div>
                    <div className="flex flex-row gap-4 w-full">
                        <p>Strength: </p>
                        <input type="range" min={0} max={100} defaultValue={dim} className="range range-primary" onChange={changePwm}/>
                    </div>
                    <div className='self-center'>
                        <Link to={`/bulbs/${id}/config`}>
                            <button className="btn btn-primary w-[120px]">Edit</button>
                        </Link>
                    </div>
                </div>
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