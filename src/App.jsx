import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PasswordGenerator from './components/PasswordGenerator';
import Impressum from './components/Impressum';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PasswordGenerator />} />
      <Route path="/impressum" element={<Impressum />} />
    </Routes>
  </Router>
);

export default App;
