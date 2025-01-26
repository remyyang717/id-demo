import React from 'react';
import './App.css'
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import Home from './pages/Home';
import FormsPage from './pages/ModuleHomePages/FormsPage';
import DashboardsPage from './pages/ModuleHomePages/DashboardsPage';
import Consents from './pages/ModuleHomePages/ConsentPage';
import Alarms from './pages/ModuleHomePages/AlarmPage';
import Devices from './pages/ModuleHomePages/DevicesPage';
import SoftSensors from './pages/ModuleHomePages/SoftSensorPage';
import Geospatial from './pages/ModuleHomePages/GeospatialPage';
import Messaging from './pages/ModuleHomePages/MessagingPage';
import SampleManager from './pages/ModuleHomePages/SampleManagerPage';
import Tasks from './pages/ModuleHomePages/TasksPage';


function App()
{
  return (

    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />

        <Route path='/Login' element={<LoginPage />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Forms/*' element={<FormsPage />} />
        <Route path='/Dashboards/*' element={<DashboardsPage />} />
        <Route path='/Consents/*' element={<Consents />} />
        <Route path='/Alarms/*' element={<Alarms />} />
        <Route path='/Devices/*' element={<Devices />} />
        <Route path='/Soft Sensors/*' element={<SoftSensors />} />
        <Route path='/Geospatial/*' element={<Geospatial />} />
        <Route path='/Messaging/*' element={<Messaging />} />
        <Route path='/Sample Manager/*' element={<SampleManager />} />
        <Route path='/Tasks/*' element={<Tasks />} />
      </Routes>
    </div>

  );
}
export default App;