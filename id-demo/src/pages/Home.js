import React from 'react';
import { Layout } from 'antd';
import HeaderComponent from '../Components/HeaderComponent';
import TempContentComponent from '../Components/TempContentComponent';




const { Header, Content } = Layout;


function Home()
{



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
                        minHeight: '100vh',
                        padding: 12,
                        margin: 0,
                        marginLeft: 32,
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