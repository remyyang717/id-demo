// SoftSensorPage.js
import React, { useState } from 'react';
import { Layout } from 'antd';
import HeaderComponent from '../../Components/HeaderComponent';
import LeftSiderComponent from '../../Components/LeftSiderComponent';
import { setModuleValue } from '../../store/moduleSlice'
import { useDispatch } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import SoftSensorDemo from '../TempSoftSensorDemos/SoftSensorDemo';


const { Sider, Header, Content } = Layout;



function SoftSensorPage()
{
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    dispatch(setModuleValue('SoftSensors'));

    return (
        <Layout>
            <Header
                className='header'
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <HeaderComponent />
            </Header>

            <Layout >

                <Sider
                    trigger={null}
                    width={800}
                    theme='light'
                    collapsible
                    onClick={() => setIsOpen(true)}
                    style={{
                        backgroundColor: '#eef0f0',
                        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                        transition: 'transform 0.3s ease-in-out',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        height: '100vh',
                    }}
                    onMouseLeave={() =>
                    {
                        setIsOpen(false); // Close Sider when the mouse leaves
                    }}
                >
                    <LeftSiderComponent />
                </Sider>

                <Content
                    display='block'
                    style={{
                        minHeight: '100vh',
                        padding: 12,
                        margin: 0,
                        marginLeft: 32,
                        transform: isOpen ? 'translateX(800px)' : 'translateX(0px)',
                        transition: 'transform 0.3s ease-in-out',

                    }}
                >
                    <Routes>
                        <Route path='' element={<SoftSensorDemo />} />
                        {/* <Route path='FormDemo1' element={<FormDemo1 />} /> */}

                    </Routes>

                </Content>


            </Layout>

        </Layout >

    );
};

export default SoftSensorPage;