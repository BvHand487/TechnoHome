import axios from 'axios';
import React, { useEffect, useState } from 'react'


function BulbEdit({ bulb })
{
    bulb = bulb[0]

    const [name, setName] = useState(bulb.name);
    const [initialRender, setInitialRender] = useState(true);

    useEffect(() => {
        if (!initialRender)
        {
            const interval = setTimeout(() => {
                console.log('sending request name');
                axios.patch(`http://localhost:10000/api/lamps/${bulb.lampId}?name=${name}`);
            }, 1000);

            return () => clearTimeout(interval);
        }
        else
        {
            setInitialRender(false);
        }
    }, [name])

    const changeName = () => {
        const val = document.getElementById('name-input-lamp').value;
        setName(val);
    }

    return (
        <>
            <div className="divider divider-horizontal self-start h-full"></div>
                <div className='flex flex-col items-center w-full h-full gap-6'>
                    <p className='text-5xl'>Configuration</p>
                    <div className="divider self-start w-full"></div>
                    <div className='grid grid-cols-4 grid-rows-1 gap-5 w-full self-start'>
                        <p className='self-center text-xl'>Change Name:</p>
                        <input id="name-input-lamp" type="text" placeholder={bulb.name} className="col-span-2 input input-bordered input-primary w-full max-w-xs" />
                        <button className="btn btn-primary col-start-4" onClick={changeName}>Submit</button>
                    </div>
                </div>
        </>
    )
}

export default BulbEdit