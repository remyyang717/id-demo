// TempContentComponent.js
import React, { useEffect, useState } from 'react';
import { Col, Row, Card, List } from 'antd';
import { useSelector } from 'react-redux';
import rainData_json from '../Data/rainData.json';
import moment from 'moment';
import FormInfiniteScrollListComponent from './FormInfiniteScrollListComponent'




function TempContentComponent()
{
    const org = useSelector((state) => state.orgValue.value)
    const location = useSelector((state) => state.locationValue.value)
    const module = useSelector((state) => state.moduleValue.value)


    const config = {
        colorField: 'location',
        group: true,
        width: window.innerWidth * 0.9,
        height: window.innerHeight * 0.3,
        title: 'Rain data ',
        data: rainData_json,
        xField: 'date',
        yField: 'rain',
        axis: {
            x: {
                labelFormatter: (val) =>
                {
                    const day = parseInt(moment(val, 'DD-MM-YYYY').format('DD'), 10);
                    const month = moment(val, 'DD-MM-YYYY').format('MMM').toUpperCase();
                    return day % 5 === 0 ? `${month} \n${day}` : '';
                },
            },
            y: {
                title: 'Volume',

            }
        },
        scale: {
            y: {
                type: 'linear',
                domain: [0, 100],
            }
        }



    };


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
                    {/* <Row >   <Line {...config} /></Row>
                    <Row >   <Column {...config} /></Row> */}

                </Col>
                <Col flex={4}>

                </Col>
            </Row>
        </>
    )
};

export default TempContentComponent;
