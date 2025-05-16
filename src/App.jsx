import React from 'react';
import { useDarkMode } from './hooks/useDarkMode';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PasswordGenerator from './components/PasswordGenerator';
import Impressum from './components/Impressum';
import Datenschutz from './components/Datenschutz';
import SecretSharePage from './components/SecretSharePage';
import NotFound from './components/NotFound';

const App = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <Router>
      <div className={darkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
        <Routes>
          <Route path="/" element={<PasswordGenerator darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/impressum" element={<Impressum darkMode={darkMode} />} />
          <Route path="/datenschutz" element={<Datenschutz darkMode={darkMode} />} />
          <Route path="/share/:id" element={<SecretSharePage darkMode={darkMode} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
