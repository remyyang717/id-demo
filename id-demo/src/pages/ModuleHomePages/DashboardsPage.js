// DashboardsPage.js
import React, { useState } from 'react';
import { Layout, Flex } from 'antd';
import HeaderComponent from '../../Components/HeaderComponent';
import LeftSiderComponent from '../../Components/LeftSiderComponent';
import { setModuleValue } from '../../store/moduleSlice'
import { useDispatch } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import DashboardsDemo1 from '../TempDashboardDemos/DashboardsDemo1'
import BatchReportDemo1 from '../TempBatchReportDemos/BatchReportDemo1'
import EditableGraphDemo from '../TempDashboardDemos/EditableGraphDemo'
import ProcessrIODemoPage from '../TempDashboardDemos/ProcessrIODemoPage'


const { Sider, Header, Content } = Layout;


function DashboardsPage()
{
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();
    dispatch(setModuleValue('Dashboards'));

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
                        transition: 'transform 0.3s ease-in-out 0.2s',
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
                    style={{
                        minHeight: '100vh',
                        padding: 12,
                        margin: 0,
                        marginLeft: 32,
                        transform: isHovered ? 'translateX(800px)' : 'translateX(0px)',
                        transition: 'transform 0.3s ease-in-out 0.2s',
                    }}
                >
                    <Routes>
                        <Route path='/' element={
                            <Flex>
                                <div style={{
                                    fontSize: '50px',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    paddingTop: '20vh',
                                }}>
                                    <strong >

                                        Go to check the left bar!

                                    </strong>
                                </div>



                            </Flex>
                        } />
                        <Route path='DashboardsDemo1' element={<DashboardsDemo1 />} />
                        <Route path='BatchReportDemo1' element={<BatchReportDemo1 />} />
                        <Route path='EditableGraphDemo' element={<EditableGraphDemo />} />
                        <Route path='ProcessrIODemoPage' element={<ProcessrIODemoPage />} />
                    </Routes>
                </Content>


            </Layout>

        </Layout>

    );
};
export default DashboardsPage;