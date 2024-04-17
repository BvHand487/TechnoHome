import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import useSWR from 'swr';
import Bulb from './Bulb';
import styles from './bulbs.css';
import BulbEdit from './BulbEdit';
import { Route, Routes } from 'react-router-dom';

function BulbList({ bulbs })
{
    const [selected, setSelected] = useState(0);

    return (
        <div className="flex flex-row h-full w-full">
            {bulbs.map(b => {
                return (
                    <div className='flex flex-col gap-[1em] w-[40em]'>
                        <Bulb key={b.lampId} id={b.lampId} name={b.name} enabled={b.enabled} dim={b.dim} />
                    </div>
                );
            })}
            <Routes>
                <Route path="/:id/config" element={ <BulbEdit bulb={bulbs.filter((b) => b.lampId == selected)}/>} /> 
            </Routes>
        </div>
    )
}

export default BulbList;    