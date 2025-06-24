import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Home from './pages/Home';
import DealRoom from './pages/DealRoom';
import Deals from './pages/Deal';
import CreateDeal from './pages/CreateDeal';
import DealDetail from './pages/DealDetail';


const App = () => {
  return (
    
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        {/*  */}
          <Route path="/deal-room" element={<DealRoom />} />
          <Route path="/deals" element={<Deals />} />
        <Route path="/deals/new" element={<CreateDeal />} />
        <Route path="/deals/:id" element={<DealDetail />} />

      
      
      
         
          <Route path="*" element={<div className="p-6 text-red-600">Page not found</div>} />

        </Routes>
        </>

  );
};

export default App;
