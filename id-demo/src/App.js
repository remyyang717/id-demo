import React from 'react';
import './App.css'
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import FormsPage from './pages/FormsPage';


function App()
{
  // const customTheme = {
  //   token: {
  //     colorPrimary: '#fafafc',
  //     colorSecondary: '#f7f7f7',
  //     colorBgContainer: '#f0f0f0',
  //   },
  // };



  return (

    <div className="app">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Forms' element={<FormsPage />} />
      </Routes>
    </div>

  );
}
export default App;