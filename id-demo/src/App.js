import React from 'react';
import './App.css'
import { Route, Routes } from "react-router-dom";
import { ConfigProvider, theme } from 'antd';
import Home from './pages/Home'


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
      </Routes>
    </div>

  );
}
export default App;