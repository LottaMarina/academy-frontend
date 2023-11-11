import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Journey, Station } from '../types/types';
import { calculateAverageDistance, calculateAverageDuration } from '../utils/journeyUtils';

const StationDetails: React.FC = () => {
  const location = useLocation();
  const station: Station = location.state?.station;
  const [journeys, setJourneys] = useState<Journey[]>([]);

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        if (station) {
          const response = await fetch(`http://localhost:8080/api/stations/${station.id}/journeys`);
          const data = await response.json();
          setJourneys(data);
        }
      } catch (error) {
        console.error(`Error fetching journeys of station ${station?.id}:`, error);
      }
    };

    fetchJourneys();
  }, [station]);

  if (!station) {
    return (
      <div>
        <p>No station details available.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Station Details</h2>
      <p>Station name: {station.stationName}</p>
      <p>Station address: {station.stationAddress}</p>
      <p>Total amount of journeys starting from {station.stationName}: {journeys.filter((journey) => journey.departureStation.id === station.id).length}</p>
      <p>Total amount of journeys ending in {station.stationName}: {journeys.filter((journey) => journey.returnStation.id === station.id).length}</p>
      <p>Average distance of journeys starting from {station.stationName}: {calculateAverageDistance(journeys, station)} </p>
      <p>Avarage duration of journeys starting from {station.stationName}: {calculateAverageDuration(journeys, station)}</p>
    </div>
  );
};

export default StationDetails;