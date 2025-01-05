// TempContentComponent.js
import React from 'react';
import { Col, Row, Card, } from 'antd';
import { useSelector } from 'react-redux';
import ScatterComponent from '../Components/Graphs/ScatterComponent'
import rainData_json from '../Data/rainData.json';






function TempContentComponent()
{
    const org = useSelector((state) => state.orgValue.value)
    const location = useSelector((state) => state.locationValue.value)


    return (
        <>
            <Row style={{
                height: '100vh'
            }}>
                <Col flex={4}>

                </Col>
                <Col flex={16} style={{
                    display: 'block',
                    height: 200,
                    padding: 10
                }}>
                    <Row ><Card title="Org :" bordered={false}>
                        {org}
                    </Card>
                        <Card title="Location :" bordered={false}>
                            {location}
                        </Card>
                    </Row>
                    <ScatterComponent graphData={rainData_json} />
                </Col>
                <Col flex={4}>

                </Col>
            </Row>
        </>
    )
};

export default TempContentComponent;
