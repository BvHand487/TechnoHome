import React from 'react'
import Sensor from './Sensor';

function SensorList() {
    // isloading
    // is error

    return (
    <div>
        {data.map((e) => {

            let tempStatus;

            if (e.functioning == true && e.enabled == true)
                tempStatus = 'active';

            else if (e.functioning == true && e.enabled == false)
                tempStatus = 'paused';

            else if (e.functioning == false)
                tempStatus = 'broken';

            <Sensor name={e.name} status={tempStatus}/>
        })}
    </div>
  )
}

export default SensorList