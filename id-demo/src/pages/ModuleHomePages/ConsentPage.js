// ConsentPage.js
import React, { useState } from 'react';
import { Layout, Flex, Descriptions, Divider, Card, Checkbox, Input, Button, List, Typography, message, Space } from 'antd';
import HeaderComponent from '../../Components/HeaderComponent';
import LeftSiderComponent from '../../Components/LeftSiderComponent';
import { setModuleValue } from '../../store/moduleSlice'
import { useDispatch } from 'react-redux';
import { AuditOutlined, IssuesCloseOutlined, RightOutlined, DeleteOutlined } from '@ant-design/icons';
import BarChartComponent from '../../Components/Graphs/BarChartComponent'
import LineGraphComponent from '../../Components/Graphs/LineGraphComponent'
import condition1Data from '../../Data/Condition1DemoData.json';
import condition5Data from '../../Data/rainData.json'


const { Sider, Header, Content } = Layout;




const items = [
    {
        key: '1',
        label: 'Location',
        children: 'Alpha',
    },
    {
        key: '2',
        label: 'Number',
        children: 'AUTH132861.03.02',
    },
    {
        key: '3',
        label: 'Revision',
        children: '1',
    },
    {
        key: '4',
        label: 'Owned by',
        children: <strong>Remy Yang</strong>,
    },
    {
        key: '5',
        label: 'Valid',
        children: <p><strong>1 Jan 2022</strong>   to   <strong>31 Dec 2024</strong></p>,
    },
    {
        key: '6',
        label: 'Reporting',
        children: 'Yearly',
    },
    {
        key: '7',
        label: 'Status',
        children: <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>Active</span>,
        span: 3
    },
    {
        key: '8',
        label: 'Recent Performance',
        children: <Space>
            <Button type="primary" style={{ backgroundColor: 'red', color: 'white' }}>
                01/08/22
            </Button>
            <Button type="primary" style={{ backgroundColor: 'orange', color: 'white' }}>
                01/08/23
            </Button>
            <Button type="primary" style={{ backgroundColor: 'green', color: 'white' }}>
                01/08/24
            </Button>
        </Space>,
        span: 3
    },
    {
        key: '9',
        label: <strong>Things to know</strong>,
        children: <>
            <IssuesCloseOutlined style={{ color: 'red', fontSize: '1.2em' }} /> This consent is going to expire soon !
            <Divider dashed />
            https://fonterra.infrastructuredata.nz/Consents/2/690
            <Divider dashed />
            Your consent needs at least 9999 condition added for it to be valid.
        </>,
    }
];


function ConsentDemo()
{
    const { Text } = Typography;


    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleSubmit = () =>
    {
        if (newComment.trim() === '')
        {
            message.warning('Please enter a comment');
            return;
        }

        setComments([...comments, { id: Date.now(), text: newComment }]);
        setNewComment(''); // 清空文本框
        message.success('Comment added');
    };

    const handleDelete = (id) =>
    {
        setComments(comments.filter(comment => comment.id !== id));
        message.success('Comment deleted');
    };




    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    dispatch(setModuleValue('Consents'));

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
                    <div
                        wrap='wrap'
                        style={{
                            width: '80%',
                            minHeight: '100vh',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            justifyContent: 'space-around'
                        }}
                    >

                        <Descriptions
                            style={{ width: '100%' }}
                            title={
                                <Flex>
                                    <AuditOutlined
                                        style={{
                                            fontSize: '32px',
                                            marginLeft: 16,
                                            marginRight: 16,
                                        }}
                                    />
                                    <h1>RTM0215 - WWTT - Discharge wastewater, biomass & dairy solids to land</h1>
                                </Flex>



                            }
                            bordered items={items}
                        />

                        <Card title={
                            <Flex>
                                Condition 1
                                <span style={{ marginLeft: 'auto' }}>Next Due: 1/3/2025</span>
                                <span style={{ marginLeft: 'auto' }}>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <div style={{ width: '24px', height: '30px', backgroundColor: 'green' }}></div>
                                        <div style={{ width: '24px', height: '30px', backgroundColor: 'green' }}></div>
                                        <div style={{ width: '24px', height: '30px', backgroundColor: 'red' }}></div>
                                    </div>
                                </span>

                                <span style={{ color: '#4CAF50', fontWeight: 'bold', marginLeft: 'auto' }}>Active</span>

                            </Flex>
                        }
                            style={{ width: '100%', marginTop: '16px' }}>
                            <paragraph>The daily volume of water used for irrigation purposes shall not exceed 654 liters per day. The consent holder must ensure that water usage is monitored and documented to comply with this limit. In the event that the volume of water used exceeds this limit, the consent holder must immediately report the incident to the relevant authority and take appropriate corrective actions to reduce consumption to within the allowed limit.</paragraph>
                            <Divider dashed />
                            <h4>This condition need to compliance with the following:</h4>
                            <BarChartComponent name={'Irrigation - Volume  (NMT 654 l/day)'} graphData={condition1Data} width={2} height={1} yDomainMax={800} yLabel={'Liters per Day'} yCriticalLineValue={654} />
                        </Card>

                        <Card title={
                            <Flex>
                                Condition 2
                                <span style={{ marginLeft: 'auto' }}>Next Due: 7/3/2025</span>
                                <span style={{ marginLeft: 'auto' }}>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <div style={{ width: '24px', height: '30px', backgroundColor: 'red' }}></div>
                                        <div style={{ width: '24px', height: '30px', backgroundColor: 'red' }}></div>
                                        <div style={{ width: '24px', height: '30px', backgroundColor: 'red' }}></div>
                                    </div>
                                </span>

                                <span style={{ color: '#4CAF50', fontWeight: 'bold', marginLeft: 'auto' }}>Active</span>

                            </Flex>
                        }
                            style={{ width: '100%', marginTop: '16px' }}>
                            <paragraph>The consent holder shall ensure that no unpleasant odors or other offensive emissions emanate from the downstream areas of the riverbank. The consent holder must take all reasonable measures to prevent any discharge, runoff, or activity that could lead to the creation of such odors. In the event that odors or offensive emissions are detected downstream, the consent holder shall investigate the cause and take immediate corrective actions to mitigate or eliminate the issue, reporting any findings and actions taken to the relevant authority.</paragraph>
                            <Divider dashed />
                            <h4>This condition need to compliance with the following:</h4>
                            <h4>Alpha <RightOutlined />  Clutha River Yearly Check Form  </h4>
                            No unpleasant odors or other offensive emissions emanate from the downstream areas of the riverbank
                            <p style={{ marginBottom: '20px' }}>
                                <Checkbox checked={false} disabled={true} >
                                    "Yes / No"
                                </Checkbox>
                            </p>
                        </Card>

                        <Card title={
                            <Flex>
                                Condition 3
                                <span style={{ marginLeft: 'auto' }}>Next Due: 7/3/2025</span>
                                <span style={{ marginLeft: 'auto' }}>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <div style={{ width: '24px', height: '30px', backgroundColor: 'red' }}></div>
                                        <div style={{ width: '24px', height: '30px', backgroundColor: 'green' }}></div>
                                        <div style={{ width: '24px', height: '30px', backgroundColor: 'green' }}></div>
                                    </div>
                                </span>

                                <span style={{ color: '#4CAF50', fontWeight: 'bold', marginLeft: 'auto' }}>Active</span>

                            </Flex>
                        }
                            style={{ width: '100%', marginTop: '16px' }}>
                            <paragraph>The consent holder shall ensure that no unpleasant odors or other offensive emissions emanate from the downstream areas of the riverbank. The consent holder must take all reasonable measures to prevent any discharge, runoff, or activity that could lead to the creation of such odors. In the event that odors or offensive emissions are detected downstream, the consent holder shall investigate the cause and take immediate corrective actions to mitigate or eliminate the issue, reporting any findings and actions taken to the relevant authority.</paragraph>
                            <Divider dashed />
                            <h4>This condition need to compliance with the following:</h4>
                            <h4>Alpha <RightOutlined />  Waikato River Yearly Check Form  </h4>
                            No unpleasant odors or other offensive emissions emanate from the downstream areas of the riverbank
                            <p style={{ marginBottom: '20px' }}>
                                <Checkbox checked={true} disabled={true} >
                                    "Yes / No"
                                </Checkbox>
                            </p>
                        </Card>

                        <Card title={
                            <Flex>
                                Condition 4
                                <span style={{ marginLeft: 'auto' }}>Next Due: N/A</span>
                                <span style={{ marginLeft: 'auto' }}>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <div style={{ width: '24px', height: '30px', backgroundColor: 'transparent' }}></div>
                                        <div style={{ width: '24px', height: '30px', backgroundColor: 'transparent' }}></div>
                                        <div style={{ width: '24px', height: '30px', backgroundColor: 'transparent' }}></div>
                                    </div>
                                </span>

                                <span style={{ color: 'Grey', fontWeight: 'bold', marginLeft: 'auto' }}>Offline</span>

                            </Flex>
                        }
                            style={{ width: '100%', marginTop: '16px' }}>
                            <paragraph>Dairy liquids must only be applied on the properties listed in Appendix 1 of the
                                Dairy Liquids Discharge Operations and Management Manual. When the
                                Consent Holder intends to add additional properties to the application of dairy
                                liquids to land, the Consent Holder must provide the following information to the
                                Consent Authority prior to the application of any dairy liquids:
                                <br />
                                (a) The name and address of the current land holder(s);
                                <br />
                                (b) Written approval from the land owner(s);
                                <br />
                                (c) Legal description(s) from the paddocks owned by that land owner that are
                                to receive dairy liquids;
                                <br />
                                (d) The dairy liquids discharge areas on the paddock;
                                <br />
                                (e) Accurate site plans/maps for each paddock and property boundary
                                showing surface watercourse, title drains, drains, bores, other effluent
                                discharges, and areas prone to ponding;
                                <br />
                                (f) Descriptions of soil types, permeability and ability to assimilate dairy
                                liquids at the site and;
                                <br />
                                (g) Confirmation that the discharge areas are:
                                <br />
                                (i) not located within a nitrogen sensitive zone as identified in Map Series
                                H of the Regional Plan: Water for Otago as at November 2019; or
                                <br />
                                (ii) located within the 30 kilograms of nitrogen per hectare per year
                                nitrogen sensitivity zone, as identified in Map Series H of the Regional
                                Plan: Water for Otago as at November 2019.
                                <br />
                                (h) Results of monitoring done for the property prior to any spreading of dairy
                                liquids.</paragraph>
                        </Card>

                        <Card title={
                            <Flex>
                                Condition 5
                                <span style={{ marginLeft: 'auto' }}>Next Due: 1/3/2025</span>
                                <span style={{ marginLeft: 'auto' }}>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <div style={{ width: '24px', height: '30px', backgroundColor: 'green' }}></div>
                                        <div style={{ width: '24px', height: '30px', backgroundColor: 'green' }}></div>
                                        <div style={{ width: '24px', height: '30px', backgroundColor: 'red' }}></div>
                                    </div>
                                </span>

                                <span style={{ color: '#4CAF50', fontWeight: 'bold', marginLeft: 'auto' }}>Active</span>

                            </Flex>
                        }
                            style={{ width: '100%', marginTop: '16px' }}>
                            <paragraph>Demo - The daily volume of water used for irrigation purposes shall not exceed 654 liters per day. The consent holder must ensure that water usage is monitored and documented to comply with this limit. In the event that the volume of water used exceeds this limit, the consent holder must immediately report the incident to the relevant authority and take appropriate corrective actions to reduce consumption to within the allowed limit.</paragraph>
                            <Divider dashed />
                            <h4>This condition need to compliance with the following:</h4>
                            <LineGraphComponent name={'Irrigation'} graphData={condition5Data} width={2} height={1} yDomainMax={250} yLabel={'Liters per Day'} />
                        </Card>

                        <Card title={
                            <Flex>
                                Condition 6
                                <span style={{ marginLeft: 'auto' }}>Next Due: N/A</span>
                                <span style={{ marginLeft: 'auto' }}>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <div style={{ width: '24px', height: '30px', backgroundColor: 'transparent' }}></div>
                                        <div style={{ width: '24px', height: '30px', backgroundColor: 'transparent' }}></div>
                                        <div style={{ width: '24px', height: '30px', backgroundColor: 'transparent' }}></div>
                                    </div>
                                </span>

                                <span style={{ color: 'Grey', fontWeight: 'bold', marginLeft: 'auto' }}>Offline</span>

                            </Flex>
                        }
                            style={{ width: '100%', marginTop: '16px' }}>
                            <paragraph>The Consent Holder must maintain a Dairy Liquids Discharge Operations and
                                Management Manual for the discharge of dairy liquids to land. Land application
                                must be undertaken in accordance with this manual. The manual must include
                                but not be limited to:
                                <br />(a) an overview of dairy liquids amount and type of discharge application; and
                                <br />(b) detailed site plans for each property identifying the discharge areas and
                                location of surface watercourse (including surface and subsurface drains),
                                groundwater wells and major soil types; and
                                <br />(c) key operational matters, including daily, weekly and monthly maintenance
                                checks; and
                                <br />(d) monitoring and recording requirements/procedures necessary to ensure
                                compliance plans with the conditions of the consent; and
                                <br />(e) contingency plans in the event of prolonged wet weather (including sludge
                                storage facilities), system malfunctions or breakdowns; and
                                <br />(f) the means of receiving and dealing with complaints; and
                                <br />(g) an appendix detailing properties authorised to receive dairy liquids.
                                At all times the Consent Holder must ensure that the Consent Authority has a
                                copy of the up to date Dairy Liquids Discharge Operations Management
                                Manual.</paragraph>
                        </Card>
                        <Divider style={{ marginTop: '32px' }} />
                        <h2>Comment History</h2>
                        <div style={{ marginTop: '32px' }}>
                            <Input.TextArea
                                rows={4}
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write your comment here..."
                            />
                            <Button type="primary" onClick={handleSubmit} style={{ marginTop: '10px' }}>
                                Submit Comment
                            </Button>

                            <List
                                header={<Text strong>Comments</Text>}
                                bordered
                                dataSource={comments}
                                renderItem={(item) => (
                                    <List.Item
                                        actions={[
                                            <Button
                                                type="link"
                                                icon={<DeleteOutlined />}
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                Delete
                                            </Button>,
                                        ]}
                                    >
                                        {item.text}
                                    </List.Item>
                                )}
                                style={{ marginTop: '20px' }}
                            />
                        </div>
                    </div>


                    {/* <Routes>
                        <Route path='' element={<FormHomeDemo />} />
                    </Routes> */}

                </Content>


            </Layout>

        </Layout >

    );
};

export default ConsentDemo;