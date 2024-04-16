import React from 'react'

function BulbEdit() {
  return (
    <>
            <div className="divider divider-horizontal self-start h-full"></div>
            <div className='flex flex-col items-center w-full h-full gap-6'>
                <p className='text-5xl'>Configuration</p>
                <div className="divider self-start w-full"></div>
                <div className='grid grid-cols-4 grid-rows-1 gap-5 w-full self-start'>
                    <p className='self-center text-xl'>Change Name: {sensor.name}</p>
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

export default BulbEdit