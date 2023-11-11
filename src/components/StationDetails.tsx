import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Journey, Station } from '../types/types';
import { calculateAverageDistance, calculateAverageDuration } from '../utils/journeyUtils';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

const StationDetails: React.FC = () => {
  const location = useLocation();
  const station: Station = location.state?.station;
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchJourneys();
  }, [station]);

  if (!station) {
    return (
      <div>
        <div>
          <p>No station details available.</p>
        </div>
        <div style={{ position: 'fixed', bottom: '0px', left: 0, width: '100%', backgroundColor: 'rgba(66, 245, 179, 0.2)', textAlign: 'center', padding: '16px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            <span style={{ marginRight: '8px' }}>&#8592;</span> Back to All Stations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', padding: '16px 16px', paddingRight: '16px'}}>
      <Typography variant="h2" style={{ paddingLeft: '16px', fontSize: '24px', color: 'black', margin: '16px', textDecoration: 'underline', textDecorationColor:'rgba(66, 245, 179, 0.5)'}} component="div">
        Station Details
      </Typography>
      
      {loading ? (
        <CircularProgress style={{ marginLeft: '50%', marginTop: '50px', color: 'rgba(66, 245, 179, 0.4)' }} />
      ) : (
        <TableContainer component={Paper} style={{ paddingLeft: '16px', boxShadow: 'none' }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Station name</TableCell>
                <TableCell>{station.stationName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Station address</TableCell>
                <TableCell>{station.stationAddress}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total journeys starting from {station.stationName}</TableCell>
                <TableCell>{journeys.filter((journey) => journey.departureStation.id === station.id).length}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total journeys ending in {station.stationName}</TableCell>
                <TableCell>{journeys.filter((journey) => journey.returnStation.id === station.id).length}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Average distance of journeys starting from {station.stationName}</TableCell>
                <TableCell>{calculateAverageDistance(journeys, station)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Average duration of journeys starting from {station.stationName}</TableCell>
                <TableCell>{calculateAverageDuration(journeys, station)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <div style={{ position: 'fixed', bottom: '0px', left: 0, width: '100%', backgroundColor: 'rgba(66, 245, 179, 0.2)', textAlign: 'center', padding: '16px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
          <span style={{ marginRight: '8px' }}>&#8592;</span> Back to All Stations
        </Link>
      </div>
    </div>
  );
};

export default StationDetails;
