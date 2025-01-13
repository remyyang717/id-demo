import React from 'react';
import './App.css'
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import FormsPage from './pages/FormsPage';
import DashboardsPage from './pages/DashboardsPage';
import Consents from './pages/ConsentsDemo';


function App()
{
  return (

    <div className="app">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Forms/*' element={<FormsPage />} />
        <Route path='/Dashboards/*' element={<DashboardsPage />} />
        <Route path='/Consents/*' element={<Consents />} />
      </Routes>
    </div>

  );
}
export default App;