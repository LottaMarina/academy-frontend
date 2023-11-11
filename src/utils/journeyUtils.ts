import { Journey, Station } from "../types/types";

function calculateAverageDistance(journeys: Journey[], station: Station) {
  const journeysStartingFromStation = journeys.filter((journey) => journey.departureStation.id === station.id);

  const totalDistance = journeysStartingFromStation.reduce((sum, journey) => sum + journey.distance, 0);

  const averageDistance = journeysStartingFromStation.length > 0
    ? totalDistance / journeysStartingFromStation.length
    : 0;

  return averageDistance.toFixed(2);
}

function calculateAverageDuration(journeys: Journey[], station: Station) {
    const journeysStartingFromStation = journeys.filter((journey) => journey.departureStation.id === station.id);
  
    const totalDurationInSeconds = journeysStartingFromStation.reduce((sum, journey) => sum + journey.duration, 0);
  
    const averageDurationInSeconds = journeysStartingFromStation.length > 0
      ? totalDurationInSeconds / journeysStartingFromStation.length
      : 0;
    
    return (averageDurationInSeconds/60).toFixed(2);
  }
export { calculateAverageDistance, calculateAverageDuration };
