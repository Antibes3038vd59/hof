import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;