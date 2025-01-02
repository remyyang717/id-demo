//EditableGraphDemo.js
import React, { useEffect, useState } from 'react';
import rainData_json from '../Data/rainData.json';
import { Flex, Input, Col, Row } from 'antd';
import BarChartComponent from '../Components/Graphs/BarChartComponent'
import LineGraphComponent from '../Components/Graphs/LineGraphComponent'




function EditableGraphDemo()
{
    const [graphName, setGraphName] = useState('CLA - Rain Event Data');

    const handleGraphNameBlur = (e) =>
    {
        setGraphName(e.target.value);
        e.target.blur();
    };


    return (
        <>
            <Row>
                <Col flex={2}><Input addonBefore='Graph Name' showCount maxLength={30} onBlur={handleGraphNameBlur} onPressEnter={handleGraphNameBlur} /> </Col>
                <Col flex={6}> </Col>
                <Col flex={6}> </Col>
            </Row>


            <Flex wrap>
                <BarChartComponent name={graphName} graphData={rainData_json} width={3} height={2} yDomainMax={250} />
                <LineGraphComponent name={graphName} graphData={rainData_json} width={3} height={2} yDomainMax={250} />
            </Flex>
        </>
    )
};

export default EditableGraphDemo;