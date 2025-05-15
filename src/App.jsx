import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PasswordGenerator from './components/PasswordGenerator';
import Impressum from './components/Impressum';
import Datenschutz from './components/datenschutz';

const App = () => {
  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route path="/" element={<PasswordGenerator />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;