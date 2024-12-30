import React from 'react';
import { Layout } from 'antd';
import HeaderComponent from '../components/HeaderComponent';
import LeftSiderComponent from '../components/LeftSiderComponent';



const { Sider, Header, Content } = Layout;


function Home()
{
    return (
        <Layout>
            <Sider
                theme='light'
                trigger={null}
                className='left-sider'
                style={{
                    height: '100vh',
                    marginTop: '64px'
                }}
            >
                <LeftSiderComponent />
            </Sider>
            <Layout>
                <Header
                    className='header'
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        alignItems: 'center',
                        display: 'inline-block'
                    }}
                >
                    <HeaderComponent />
                </Header>
            </Layout>


        </Layout>

    );
};
export default Home;