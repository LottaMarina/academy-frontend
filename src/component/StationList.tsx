import React, { useEffect, useState } from 'react';

const StationsList: React.FC = () => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/stations/');
        const data = await response.json();
        console.log(data)
        setStations(data);
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };

    fetchStations();
  }, []);

  return (
    <div>
      <h2>Stations List</h2>
      <ul>
        {stations.map((station: any) => (
          <li key={station.id}>
            {station.stationName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StationsList;