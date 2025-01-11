import React from 'react';
import { Layout, Flex, Card } from 'antd';
import HeaderComponent from '../Components/HeaderComponent';
import HomoDemo from '../Asset/HomeDemo.jpg'
import TempContentComponent from '../Components/TempContentComponent'
import { HomeFilled } from '@ant-design/icons';


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

                    <Flex
                        wrap="wrap"
                        style={{
                            justifyContent: 'space-around',
                            width: '100%',
                            minHeight: '100%',
                        }}
                    >
                        <Card
                            style={{
                                marginTop: '20px',
                                marginBottom: '30px'
                            }}

                            title={
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <HomeFilled style={{ fontSize: '28px', marginRight: '10px' }} />
                                    <h2>Welcome to Infrastructure Data</h2>
                                </div>
                            } bordered={false}>
                            We are excited to have you on this journey with us. We hope you enjoy using ID and find it helpful in achieving your goals. Our team is committed to providing you with the best tools and support to make your experience seamless and successful. Feel free to reach out if you need any assistance along the way!
                        </Card>

                        <TempContentComponent />

                        <img style={{
                            clipPath: 'inset(145px 0 0 0)',
                            marginTop: '-145px'
                        }}
                            src={HomoDemo} alt='Form Demo' />

                    </Flex>


                </Content>


            </Layout>

        </Layout>

    );
};
export default Home;