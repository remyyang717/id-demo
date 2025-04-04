// LeftSiderComponent.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FormInfiniteScrollListComponent from './FormInfiniteScrollListComponent'
import SoftSensorInfiniteScrollListComponent from './SoftSensorInfiniteScrollListComponent'
import { List } from 'antd';



function LeftSiderComponent()
{

    const moduleContent = {
        Forms: (
            <FormInfiniteScrollListComponent />
        ),
        Dashboards: (
            <div
                id='scrollableDiv'
                style={{
                    width: 800,
                    overflow: 'auto',
                    height: '100vh',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                    paddingTop: '64px',
                    Layout: 'vertical'
                }}
            >
                <List>
                    <List.Item>
                        <Link to="/Dashboards/DashboardsDemo">Graph Gallery</Link>
                    </List.Item>
                    <List.Item>
                        <Link to="/Dashboards/EditableGraphDemo">Editable Graph Demo</Link>
                    </List.Item>
                    <List.Item>
                        <Link to="/Dashboards/BatchReportDemo">Batch Report Table Demo</Link>
                    </List.Item>
                    <List.Item>
                        <Link to="/Dashboards/TableGeneratorDemo">Table Generator Demo</Link>
                    </List.Item>

                </List>

            </div>

        ),
        SoftSensors: (
            <SoftSensorInfiniteScrollListComponent />
        )
    };




    // Default to an unknown page if no match
    const moduleName = useSelector((state) => state.moduleValue.value);
    const content = moduleContent[moduleName] || <div><h2>Unknown Page</h2></div>;

    return (
        <>
            <div className="trigger-bar"
                style={{
                    background: ' #e1e5e5',
                    position: 'absolute',
                    top: 0,
                    left: '100%',
                    height: '100%',
                    width: '32px',
                    cursor: 'pointer'
                }}></div>

            {content}

        </>
    )
};

export default LeftSiderComponent;
