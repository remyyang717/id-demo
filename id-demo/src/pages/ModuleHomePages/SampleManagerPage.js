// SampleManagerPage.js
import React, { useState } from 'react';
import { Layout, Flex } from 'antd';
import HeaderComponent from '../../Components/HeaderComponent';
import LeftSiderComponent from '../../Components/LeftSiderComponent';
import { setModuleValue } from '../../store/moduleSlice'
import { useDispatch } from 'react-redux';


const { Sider, Header, Content } = Layout;



function SampleManagerPage()
{
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();
    dispatch(setModuleValue('Sample Manager'));

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
                        position: 'fixed',
                        left: 0,
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
                        transition: 'transform 0.3s ease-in-out 0.2s',

                    }}
                >
                    <Flex>
                        <div style={{
                            fontSize: '50px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: '10vh',
                        }}>
                            <strong >
                                Dear Viewer,
                                <br />
                                <br />
                                This is Sample Manager page
                                <br />
                                But nothing here yet!
                                <br />
                                <br />
                                Cheer!
                                <br />
                                Remy
                            </strong>
                        </div>



                    </Flex>

                </Content>


            </Layout>

        </Layout >

    );
};

export default SampleManagerPage;