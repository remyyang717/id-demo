import React, { useState } from 'react';
import { Layout } from 'antd';
import HeaderComponent from '../Components/HeaderComponent';
import LeftSiderComponent from '../Components/LeftSiderComponent';
import { setModuleValue } from '../store/moduleSlice'
import { useDispatch } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import FormDemo1 from './TempFormPageDemos.js/FormDemo1'
import FormDemo2 from './TempFormPageDemos.js/FormDemo2'
import FormDemo3 from './TempFormPageDemos.js/FormDemo3'


const { Sider, Header, Content } = Layout;


function FormsPage()
{
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();
    dispatch(setModuleValue('Forms'));

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
                    width={800}
                    theme='light'
                    collapsible
                    trigger={null}
                    style={{

                        backgroundColor: '#eef0f0',
                        transform: isHovered ? 'translateX(0)' : 'translateX(-100%)',
                        transition: 'transform 0.3s ease-in-out',
                        position: 'fixed', // Make it fixed on the left side
                        left: 0, // Align to the left
                        top: 0,
                        bottom: 0,
                        height: '100vh',
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div>

                    </div>
                    <LeftSiderComponent />
                </Sider>

                <Content
                    display='block'
                    style={{
                        minHeight: '100vh',
                        padding: 12,
                        margin: 0,
                        marginLeft: 32,
                        transform: isHovered ? 'translateX(800px)' : 'translateX(0px)',
                        transition: 'transform 0.3s ease-in-out',

                    }}
                >
                    <Routes>
                        <Route path='FormDemo1' element={<FormDemo1 />} />
                        <Route path='FormDemo2' element={<FormDemo2 />} />
                        <Route path='FormDemo3' element={<FormDemo3 />} />
                    </Routes>

                </Content>


            </Layout>

        </Layout>

    );
};
export default FormsPage;