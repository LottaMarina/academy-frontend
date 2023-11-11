import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Typography } from '@mui/material';
import { Station } from '../types/types';

const StationsList: React.FC = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/stations/?page=${page}&size=30&direction=ASC&sortBy=stationName`);
        const data = await response.json();
        setStations(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };

    fetchStations();
  }, [page]);

  const renderStationList = (start: number, end: number) => (
    <div style={{ paddingLeft: '16px' }}>
      {stations.slice(start, end).map((station) => (
        <div key={station.id} style={{ paddingTop: '8px' }}>
          <Link to={`/stations/${station.id}`} state={{ station }}>
              {station.stationName}
            </Link>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ padding: '16px 16px' }}>
      <Typography variant="h2" style={{ paddingLeft: '16px', fontSize: '24px', color: 'black', margin: '16px', textDecoration: 'underline', textDecorationColor:'rgba(66, 245, 179, 0.5)'}} component="div">
        All Stations
      </Typography>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', maxHeight: 'calc(100vh - 106px)', overflowX: 'auto' }}>
        {renderStationList(0, 10)}
        {renderStationList(10, 20)}
        {renderStationList(20, 30)}
      </div>
      <div style={{ position: 'fixed', bottom: '0px', left: 0, width: '100%', backgroundColor: 'rgba(66, 245, 179, 0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Pagination
          count={totalPages}
          page={page + 1}
          onChange={(event, value) => setPage(value - 1)}
          style={{ alignItems: 'center', padding: '12px' }}
          variant="outlined"
          color='primary'
        />
      </div>
    </div>
  );
};

export default StationsList;
