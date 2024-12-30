import React, { useState } from 'react';
import { Row, Col, Layout, theme } from 'antd';
import HeaderComponent from '../components/HeaderComponent';
import LeftSiderComponent from '../components/LeftSiderComponent';
import { BlockOutlined } from '@ant-design/icons';



const { Sider, Header, Content } = Layout;


function Home()
{
    const [isHovered, setIsHovered] = useState(false);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
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

            <Layout>

                <Sider
                    width={280}
                    display='block'
                    theme='light'
                    collapsible
                    trigger={null}
                    className='left-sider'
                    style={{
                        height: '100vh',
                        backgroundColor: '#eef0f0',
                        transform: isHovered ? 'translateX(0)' : 'translateX(-100%)',
                        transition: 'transform 0.3s ease-in-out',
                        position: 'fixed', // Make it fixed on the left side
                        left: 0, // Align to the left
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <LeftSiderComponent />
                </Sider>

                <Content
                    style={{
                        height: '100vh',
                        padding: 24,
                        margin: 0,
                        marginLeft: isHovered ? 312 : 32,
                        transition: 'margin-left 0.3s ease-in-out',
                    }}
                >
                    Content
                </Content>



            </Layout>

        </Layout>

    );
};
export default Home;