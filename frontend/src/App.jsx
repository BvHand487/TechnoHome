import React from 'react'
import ChartContext from './components/ChartContext';

function App()
{
  return (
    <div>
        <ChartContext
            sensorId={0}
            type={"humidity"}
        />
    </div>
  )
}

export default App