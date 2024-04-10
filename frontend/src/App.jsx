import { useEffect, useState } from "react";
import SensorList from "./components/SensorList";
import Chart from "./components/Chart";
import ChartContext from "./components/ChartContext";

function App()
{
    return (
        <div>
            <ChartContext
                sensorId={0}
                type={"humidity"}
            />
        </div>
    );
}

export default App;