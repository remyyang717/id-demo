import React, { useState } from 'react';
import { Layout } from 'antd';
import HeaderComponent from '../components/HeaderComponent';
import LeftSiderComponent from '../components/LeftSiderComponent';
import TempContentComponent from '../components/TempContentComponent';




const { Sider, Header, Content } = Layout;


function Home()
{
    const [isHovered, setIsHovered] = useState(false);


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



                <Content
                    display='block'
                    style={{
                        height: '100vh',
                        padding: 12,
                        margin: 0,
                        marginLeft: 32,
                        transform: isHovered ? 'translateX(560px)' : 'translateX(0px)',
                        transition: 'transform 0.3s ease-in-out',

                    }}
                >
                    <TempContentComponent />
                </Content>


            </Layout>

        </Layout>

    );
};
export default Home;