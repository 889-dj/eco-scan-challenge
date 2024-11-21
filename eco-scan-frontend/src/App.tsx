import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import ScanPage from './pages/ScanPage';
import HistoryPage from './pages/HistoryPage';
import RewardsPage from './pages/RewardsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/scan" replace />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/rewards" element={<RewardsPage />} />
          </Routes>
        </main>

        <footer className="bg-white mt-12 py-8 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500">
              © 2024 EcoScan. Making fashion sustainable, one scan at a time.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;