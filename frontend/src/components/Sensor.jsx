import React from 'react';
import useSWR from 'swr';

const fetcher = uurl => fetch(url).then(res => res.json());

const SensorList = () => {
  const { data, error, isLoading } = useSWR(`/api/sensors`, fetcher);

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      {data.map((e) => {
        let tempStatus;

        if (e.functioning === true && e.enabled === true)
            tempStatus = 'active';
        else if (e.functioning === true && e.enabled === false)
            tempStatus = 'paused';
        else if (!e.functioning)
            tempStatus = 'broken';

        return <Sensor key={e.name} name={e.name} status={tempStatus}/>;
      })}
    </div>
  );
};

function Sensor({ name, status }) {
  return (
    <div>
      {name} - {status}
    </div>
  );
}

export default SensorList;