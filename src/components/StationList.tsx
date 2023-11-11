import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Station } from '../types/types';
const StationsList: React.FC = () => {
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/stations/');
        const data = await response.json();
        setStations(data);
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };

    fetchStations();
  }, []);

  return (
    <div>
      <h2>Station List</h2>
      <ul>
        {stations.map((station) => (
          <li key={station.id}>
            {/* Pass station details as state to the StationDetails component */}
            <Link to={`/stations/${station.id}`} state={{ station }}>
              {station.stationName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StationsList;