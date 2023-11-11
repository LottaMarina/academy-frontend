import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StationList from './components/StationList';
import StationDetails from './components/StationDetails';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StationList />} />
      <Route path="/stations/:stationId" element={<StationDetails />} />
    </Routes>
  );
};

export default App;