import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateHousePage from './pages/CreateHousePage';
import HouseDetailsPage from './pages/HouseDetailsPage';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-house" element={<CreateHousePage />} />
          <Route path="/houses/:id" element={<HouseDetailsPage />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
