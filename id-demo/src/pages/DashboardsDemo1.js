// DashboardsDemo1.js
import React from 'react';
import rainData_json from '../Data/rainData.json';
import { Flex, } from 'antd';
import BarChartComponent from '../components/Graphs/BarChartComponent'
import LineGraphComponent from '../components/Graphs/LineGraphComponent'

function DashboardsDemo1()
{




    return (
        <>
            <Flex wrap>
                <BarChartComponent graphData={rainData_json} width={6} height={3} />
                <BarChartComponent graphData={rainData_json} width={3} height={3} />
                <LineGraphComponent graphData={rainData_json} width={9} height={3} />
            </Flex>


        </>
    )
};

export default DashboardsDemo1;