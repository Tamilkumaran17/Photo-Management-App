import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Create from './components/Create';
import Gallery from './components/Gallery';
import Details from './components/Details';
import './App.css'


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Gallery />} />
        <Route path="/create" element={<Create />} />
        <Route path="/photo/:id" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
