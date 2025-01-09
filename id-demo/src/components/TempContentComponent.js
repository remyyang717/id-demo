// TempContentComponent.js
import React from 'react';
import { Col, Row, Card, } from 'antd';
import { useSelector } from 'react-redux';
import BarChartComponent from '../Components/Graphs/BarChartComponent'
import rainData_json from '../Data/rainData.json';






function TempContentComponent()
{
    const org = useSelector((state) => state.orgValue.value)
    const location = useSelector((state) => state.locationValue.value)


    return (
        <>

            <BarChartComponent graphData={rainData_json} width={3} height={1} name={"Rain Data"} />

        </>
    )
};

export default TempContentComponent;
