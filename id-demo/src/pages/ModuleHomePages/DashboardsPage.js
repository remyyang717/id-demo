// DashboardsPage.js
import React, { useState } from 'react';
import { Layout, Flex } from 'antd';
import HeaderComponent from '../../Components/HeaderComponent';
import LeftSiderComponent from '../../Components/LeftSiderComponent';
import { setModuleValue } from '../../store/moduleSlice'
import { useDispatch } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import DashboardsDemo from '../TempDashboardDemos/DashboardsDemo'
import BatchReportDemo from '../TempBatchReportDemos/BatchReportDemo'
import EditableGraphDemo from '../TempDashboardDemos/EditableGraphDemo'
import ProcessrIODemoPage from '../TempDevicePages/ProcessrIODemoPage'
import TableGeneratorDemo from '../TempBatchReportDemos/TableGeneratorDemo'

const { Sider, Header, Content } = Layout;


function DashboardsPage()
{
    const [isOpen, setIsOpen] = useState(false);
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
                        <Route path='/' element={
                            <Flex>
                                <div style={{
                                    fontSize: '50px',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    paddingTop: '20vh',
                                }}>
                                    <strong >

                                        Go to check/click the left bar!

                                    </strong>
                                </div>



                            </Flex>
                        } />
                        <Route path='DashboardsDemo' element={<DashboardsDemo />} />
                        <Route path='BatchReportDemo' element={<BatchReportDemo />} />
                        <Route path='EditableGraphDemo' element={<EditableGraphDemo />} />
                        <Route path='ProcessrIODemoPage' element={<ProcessrIODemoPage />} />
                        <Route path='TableGeneratorDemo' element={<TableGeneratorDemo />} />

                    </Routes>
                </Content>


            </Layout>

        </Layout>

    );
};
export default DashboardsPage;