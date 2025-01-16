// DashboardsDemo1.js
import React from 'react';
import rainData_json from '../../Data/rainData.json';
import { Flex, } from 'antd';
import BarChartComponent from '../../Components/Graphs/BarChartComponent'
import LineGraphComponent from '../../Components/Graphs/LineGraphComponent'
import ScatterComponent from '../../Components/Graphs/ScatterComponent';
import BoxplotComponent from '../../Components/Graphs/BoxplotComponent';

function DashboardsDemo1()
{




    return (
        <>
            <Flex wrap style={{ justifyContent: 'space-around' }}>
                <p>see comparison of https://fonterra.infrastructuredata.nz/WTD/Dashboards/707</p>
                <LineGraphComponent graphData={rainData_json} width={3} height={2} yDomainMax={250} tooltipDisplayRange={true} />
                <p>
                    see comparison of https://fonterra.infrastructuredata.nz/WTD/Dashboards/544   (Jan)
                    <br></br>
                    see comparison of https://fonterra.infrastructuredata.nz/WTD/Dashboards/536   (12 Month)
                </p>

                <BarChartComponent name={'CLASD - Rain Event Data'} graphData={rainData_json} width={3} height={2} yDomainMax={250} tooltipDisplayRange={true} />
                <ScatterComponent name='Scatter Demo' graphData={rainData_json} width={3} height={2} />
                <BoxplotComponent name='Boxplot Demo' graphData={rainData_json} yDomainMax={300} width={3} height={2} />
            </Flex>


        </>
    )
};

export default DashboardsDemo1;