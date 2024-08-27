import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Create from './components/Create';
import Gallery from './components/Gallery';
import Details from './components/Details';
import './App.css'
import { ToastContainer } from 'react-toastify';


function App() {
  return (<>
  <ToastContainer
    position="bottom-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss={false}
    draggable
    pauseOnHover={false}
    theme="light"
    transition: Bounce
    />  
    
    <Router>
      <Routes>
      <Route path="/" element={<Gallery />} />
        <Route path="/create" element={<Create />} />
        <Route path="/photo/:id" element={<Details />} />
      </Routes>
    </Router>
    
    
    </>
  );
}

export default App;
