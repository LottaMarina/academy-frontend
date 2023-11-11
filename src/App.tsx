import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StationList from './components/StationList';
import StationDetails from './components/StationDetails';
import Banner from './components/Banner';

const App: React.FC = () => {
  return (
    <div>
      <Banner />
      <Routes>
        <Route path="/" element={<StationList />} />
        <Route path="/stations/:stationId" element={<StationDetails />} />
      </Routes>
    </div>
  );
};

export default App;