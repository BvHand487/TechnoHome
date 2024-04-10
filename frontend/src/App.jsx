import { useEffect, useState } from "react";
import Sensor from "./components/Sensor";

function App()
{
    const [ count, setCount ] = useState(0);



    useEffect(() => {
    }, [count])
    
    return (
        <div className="wrapper">
            <Sidebar/>

        </div>
    );
}

export default App;