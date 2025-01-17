// FormHomeDemo.js
import React, { useState } from 'react';
import { Flex, Tabs, List, Badge, Card, Collapse, theme, notification } from 'antd';
import { ScheduleOutlined, CaretRightOutlined, EditFilled } from '@ant-design/icons';
const Context = React.createContext({
    name: 'Default',
});

const onChange = (key) =>
{
    console.log(key);
};






//dueFormslist Data
//#region 
const dueFormslist = [
    {
        "formId": "001",
        "formName": "Valley View Industries - Quarterly Compliance Check - Disaster Recovery Plan (August)"
    },
    {
        "formId": "002",
        "formName": "Summit Park - Quarterly Health Check - Emergency Response Plan (March)"
    },
    {
        "formId": "003",
        "formName": "Clearwater Airport - Monthly Review Notice - Crisis Management Plan (April)"
    },
    {
        "formId": "004",
        "formName": "Riverdale Enterprises - Yearly Audit Reminder - Risk Mitigation Strategy (September)"
    },
    {
        "formId": "005",
        "formName": "Oak Ridge Logistics - Bi-Annual Performance Check - Operational Continuity Plan (November)"
    },
    {
        "formId": "006",
        "formName": "Horizon Heights - Monthly Operational Review - Emergency Preparedness Plan (February)"
    },
    {
        "formId": "007",
        "formName": "Redwood Heights - Annual Risk Assessment - Contingency Plan Review (October)"
    }
]

//#endregion

//overDueFormslist Data
//#region 
const overDueFormslist = [
    {
        "formId": "001",
        "formName": "Valley View Industries - Quarterly Compliance Check - Disaster Recovery Plan (August)"
    },
    {
        "formId": "002",
        "formName": "Summit Park - Quarterly Health Check - Emergency Response Plan (March)"
    },
    {
        "formId": "003",
        "formName": "Clearwater Airport - Monthly Review Notice - Crisis Management Plan (April)"
    },
    {
        "formId": "004",
        "formName": "Riverdale Enterprises - Yearly Audit Reminder - Risk Mitigation Strategy (September)"
    }
]

//#endregion


//completedFormslist Data
//#region 
const completedFormslist = [
    {
        "formId": "001",
        "formName": "Favourite Demo Form With Active and Scheduled ",
        "formAbout": "Click this go to  Demo 1",
        "status": "Due",
        "scheduled": true,
        "critical": false,
    },
    {
        "formId": "002",
        "formName": "Form with all fields, changeing the form name",
        "formAbout": "Click this go to  Demo 2",
        "status": "Due",
        "scheduled": true,
        "critical": true,
    },
    {
        "formId": "003",
        "formName": "Required & Constraints check !!!",
        "formAbout": "Click this go to  Demo 3",
        "status": "Due",
        "scheduled": false,
        "critical": false,
    },
    {
        "formId": "004",
        "formName": "Hood Aerodrome - Annual Review Reminder - Aerodrome Emergency Plan (July)",
        "formAbout": "This is the Hood Aerodrome - Annual Review Reminder - Aerodrome Emergency Plan (July) form. Just for display.",
        "status": "Due",
        "scheduled": true,
        "critical": true,
    },
    {
        "formId": "005",
        "formName": "Hood Aerodrome - Annual Review Reminder - Business Continuity Plan (June)",
        "formAbout": "Click this and go to home page",
        "status": "Due",
        "scheduled": true,
        "critical": false,
    }
]
//#endregion


// const favouriteFormslist Data
//#region 
const favouriteFormslist = [
    {
        "formId": "001",
        "formName": "001 - Favourite Demo Form With Active and Scheduled ",
        "formAbout": "This is 001 -Favourite Demo Form With Active and Scheduled ",
        "status": "Active",
        "scheduled": true,
        "critical": false,
    },
    {
        "formId": "002",
        "formName": "002 - Favourite Demo Form With Active and Critical Scheduled ",
        "formAbout": "Click me won't trigger anything!",
        "status": "Active",
        "scheduled": true,
        "critical": true,
    },
    {
        "formId": "003",
        "formName": "002 - Favourite Demo Form With Inactive status",
        "formAbout": "Do not try to click me haha",
        "status": "Inactive",
        "scheduled": false,
        "critical": false,
    },
    {
        "formId": "004",
        "formName": "Hood Aerodrome - Annual Review Reminder - Aerodrome Emergency Plan (July)",
        "formAbout": "This is the Hood Aerodrome - Annual Review Reminder - Aerodrome Emergency Plan (July) form. Just for display.",
        "status": "Active",
        "scheduled": true,
        "critical": true,
    },
    {
        "formId": "005",
        "formName": "Hood Aerodrome - Annual Review Reminder - Business Continuity Plan (June)",
        "formAbout": "Hood Aerodrome - Annual Review Reminder - Business Continuity Plan (June)",
        "status": "Active",
        "scheduled": true,
        "critical": false,
    },
    {
        "formId": "006",
        "formName": "Hood Aerodrome - Annual Review Reminder - Management Action Plan (May)",
        "formAbout": "This is the Hood Aerodrome - Annual Review Reminder - Management Action Plan (May) form. Just for display.",
        "status": "Active",
        "scheduled": true,
        "critical": false,
    },
    {
        "formId": "007",
        "formName": "Hood Aerodrome - AOC Recertification reminder - 5 yearly this could be long!! this could be long!! this could be long!! this could be long!!this could be long!! this could be long!!",
        "formAbout": "This is the Hood Aerodrome - AOC Recertification reminder - 5 yearly form. Just for display and this could be long!! this could be long!! this could be long!!.",
        "status": "Inactive",
        "scheduled": false,
        "critical": false,
    }, {
        "formId": "001",
        "formName": "Favourite Demo Form With Active and Scheduled ",
        "formAbout": "Click this go to  Demo 1",
        "status": "Active",
        "scheduled": true,
        "critical": false,
        "link": "/Forms/FormDemo1"
    },
    {
        "formId": "002",
        "formName": "Form with all fields, changeing the form name",
        "formAbout": "Click this go to  Demo 2",
        "status": "Active",
        "scheduled": true,
        "critical": true,
        "link": "/Forms/FormDemo2"
    },
    {
        "formId": "003",
        "formName": "Required & Constraints check !!!",
        "formAbout": "Click this go to  Demo 3",
        "status": "Inactive",
        "scheduled": false,
        "critical": false,
        "link": "/Forms/FormDemo3"
    },
    {
        "formId": "004",
        "formName": "Hood Aerodrome - Annual Review Reminder - Aerodrome Emergency Plan (July)",
        "formAbout": "This is the Hood Aerodrome - Annual Review Reminder - Aerodrome Emergency Plan (July) form. Just for display.",
        "status": "Active",
        "scheduled": true,
        "critical": true,
        "link": "/Forms"
    },
    {
        "formId": "005",
        "formName": "Hood Aerodrome - Annual Review Reminder - Business Continuity Plan (June)",
        "formAbout": "Click this and go to home page",
        "status": "Active",
        "scheduled": true,
        "critical": false,
        "link": "/Forms"
    },
    {
        "formId": "006",
        "formName": "Hood Aerodrome - Annual Review Reminder - Management Action Plan (May)",
        "formAbout": "This is the Hood Aerodrome - Annual Review Reminder - Management Action Plan (May) form. Just for display.",
        "status": "Active",
        "scheduled": true,
        "critical": false,
        "link": "/Forms"
    },
    {
        "formId": "007",
        "formName": "Hood Aerodrome - AOC Recertification reminder - 5 yearly",
        "formAbout": "This is the Hood Aerodrome - AOC Recertification reminder - 5 yearly form. Just for display.",
        "status": "Inactive",
        "scheduled": false,
        "critical": false,
        "link": "/Forms"
    }
]
//#endregion

//const favouriteForms
//#region 
const favouriteForms = [
    {
        key: '1',
        label: <h2>Favourite</h2>,
        children:
            <div
                style={{
                    width: 650,
                    overflow: 'auto',
                    border: 0,
                }}
            >
                <List
                    dataSource={favouriteFormslist}
                    renderItem={(item) => (
                        <List.Item key={item.formId}>
                            <Badge.Ribbon
                                text={<span style={{ color: item.status === 'Active' ? '#7A5449' : '#7D6161' }}><strong>{item.status}</strong> </span>}
                                color={item.status === 'Active' ? '#19FAB6' : '#D3D3D3'}
                            >
                                <Card
                                    hoverable
                                    title={
                                        <div style={{
                                            display: 'block',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'normal',
                                            lineHeight: '1.2em',
                                            maxHeight: '2.4em',
                                            paddingRight: '40px',
                                            marginTop: '5px',
                                        }}>

                                            {item.formName}
                                        </div>}
                                    style={{ width: 600 }}
                                >

                                    <div style={{
                                        display: 'block',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'normal',
                                        lineHeight: '1.2em',
                                        maxHeight: '3.6em',
                                        paddingRight: '40px',
                                    }}>

                                        {item.formAbout}
                                    </div>

                                    {
                                        (() =>
                                        {
                                            if (item.scheduled === true)
                                            {
                                                if (item.critical)
                                                {
                                                    return <ScheduleOutlined style={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        right: '0',
                                                        padding: '10px',
                                                        fontSize: '2.5em',
                                                        color: '#FA4A19'
                                                    }} />;
                                                } else
                                                {
                                                    return <ScheduleOutlined style={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        right: '0',
                                                        padding: '10px',
                                                        fontSize: '2.5em',
                                                    }} />;
                                                }
                                            }
                                        })()
                                    }

                                </Card>
                            </Badge.Ribbon>
                        </List.Item>
                    )}
                />
            </div>,
    }
];
//#endregion

function FormHomeDemo()
{

    const { token } = theme.useToken();
    const panelStyle = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement) =>
    {
        api.info({
            message: `Notification`,
            description: 'Filling Form Icon is Clicked, Ideally Should Jump To That Form Page',
            placement, // Place the notification at the specified location
        });
    };

    const getDue = (panelStyle) => [
        {
            key: '1',
            label:
                <div>

                    {contextHolder}
                    <strong>This form is Due on 13/1/2025</strong>
                    <EditFilled
                        onClick={() => openNotification('bottomLeft')}
                        style={{
                            position: 'absolute',
                            right: '0',
                            marginRight: '20px',
                            fontSize: '2em',
                        }} />

                </div>
            ,
            children:
                <div>
                    <p>Going to due on <strong>14/1/2025</strong></p>
                    <p>Going to due on <strong>15/1/2025</strong></p>
                    <p>Going to due on <strong>16/1/2025</strong></p>
                </div>,
            style: panelStyle,
        }
    ];



    const getCompleted = (panelStyle) => [
        {
            key: '1',
            label:
                <div>

                    {contextHolder}
                    <strong>This form is Completed on 13/1/2025</strong>
                    <EditFilled
                        onClick={() => openNotification('bottomLeft')}
                        style={{
                            position: 'absolute',
                            right: '0',
                            marginRight: '20px',
                            fontSize: '2em',
                        }} />

                </div>
            ,
            children:
                <div>
                    <p>Recently completed on <strong>14/1/2025</strong></p>
                    <p>Recently completed on <strong>15/1/2025</strong></p>
                    <p>Recently completed on <strong>16/1/2025</strong></p>
                </div>,
            style: panelStyle,
        }
    ];

    const scheduledForms = [
        {
            key: '1',
            label: <h2>Due</h2>,
            children: <div style={{
                width: 650,
                overflow: 'auto',
                border: 0,
            }}>
                <List
                    dataSource={dueFormslist} // Use filtered data
                    renderItem={(item) => (
                        <List.Item key={item.formId}>
                            <Badge.Ribbon
                                text={
                                    <span
                                        style={{ color: '#333333' }}
                                    >
                                        <strong>Due</strong></span>}
                                color={'#FF9800'}
                            >

                                <Card
                                    hoverable
                                    title={
                                        <div style={{
                                            display: 'block',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'normal',
                                            lineHeight: '1.2em',
                                            maxHeight: '2.4em',
                                            paddingRight: '40px',
                                            marginTop: '5px',
                                        }}>

                                            {item.formName}
                                        </div>}
                                    style={{ width: '600px' }}
                                >


                                    <Collapse
                                        bordered={false}
                                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                        style={{
                                            background: token.colorBgContainer,
                                        }}
                                        items={getDue(panelStyle)} />



                                </Card>

                            </Badge.Ribbon>
                        </List.Item>
                    )}
                />
            </div>,
        },
        {
            key: '2',
            label: <h2>Overdue</h2>,
            children: <div style={{
                width: 650,
                overflow: 'auto',
                border: 0,
            }}>
                <List
                    dataSource={overDueFormslist} // Use filtered data
                    renderItem={(item) => (
                        <List.Item key={item.formId}>
                            <Badge.Ribbon
                                text={
                                    <span
                                        style={{ color: '#FFFFFF' }}
                                    >
                                        <strong>Overdue</strong></span>}
                                color={'#F44336'}
                            >

                                <Card
                                    hoverable
                                    title={
                                        <div style={{
                                            display: 'block',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'normal',
                                            lineHeight: '1.2em',
                                            maxHeight: '2.4em',
                                            paddingRight: '40px',
                                            marginTop: '5px',
                                        }}>

                                            {item.formName}
                                        </div>}
                                    style={{ width: '600px' }}
                                >


                                    <div style={{ background: 'rgb(255, 255, 255)' }}>

                                        {contextHolder}
                                        <strong>This form is Overdue on 1/7/2024</strong>
                                        <EditFilled
                                            onClick={() => openNotification('bottomLeft')}
                                            style={{
                                                position: 'absolute',
                                                right: '0',
                                                marginRight: '20px',
                                                fontSize: '2em',
                                            }} />

                                    </div>


                                </Card>

                            </Badge.Ribbon>
                        </List.Item>
                    )}
                />
            </div>,
        },
        {
            key: '3',
            label: <h2>Completed</h2>,
            children: <div style={{
                width: 650,
                overflow: 'auto',
                border: 0,
            }}>
                <List
                    dataSource={completedFormslist} // Use filtered data
                    renderItem={(item) => (
                        <List.Item key={item.formId}>
                            <Badge.Ribbon
                                text={
                                    <span
                                        style={{ color: '#FFFFFF' }}
                                    >
                                        <strong>Completed</strong></span>}
                                color={'#4CAF50'}
                            >

                                <Card
                                    hoverable
                                    title={
                                        <div style={{
                                            display: 'block',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'normal',
                                            lineHeight: '1.2em',
                                            maxHeight: '2.4em',
                                            paddingRight: '40px',
                                            marginTop: '5px',
                                        }}>

                                            {item.formName}
                                        </div>}
                                    style={{ width: '600px' }}
                                >


                                    <Collapse
                                        bordered={false}
                                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                        style={{
                                            background: token.colorBgContainer,
                                        }}
                                        items={getCompleted(panelStyle)} />



                                </Card>

                            </Badge.Ribbon>
                        </List.Item>
                    )}
                />
            </div>,
        },
    ];


    return (
        <div
            style={{
                maxWidth: 1500,
                marginLeft: 'auto',
                marginRight: 'auto'
            }}

        >

            <Flex
                style={{
                    justifyContent: 'space-around'
                }}>

                <Flex wrap='wrap'
                    style={{
                        justifyContent: 'space-around',
                        width: '90%',

                    }}>

                    <Flex style={{
                        justifyContent: 'space-around',
                        width: '49%',
                        minWidth: '500px'
                    }}>

                        <Tabs defaultActiveKey="1" items={favouriteForms} centered />
                    </Flex>

                    <Flex
                        style={{
                            justifyContent: 'space-around',
                            width: '49%',
                            minWidth: '500px'
                        }}>

                        <Tabs defaultActiveKey="1" items={scheduledForms} onChange={onChange} centered />

                    </Flex>



                </Flex>


            </Flex >
        </div>




    )
};

export default FormHomeDemo;