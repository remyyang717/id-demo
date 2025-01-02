// DashboardsDemo1.js
import React from 'react';
import rainData_json from '../Data/rainData.json';
import { Flex, } from 'antd';
import BarChartComponent from '../Components/Graphs/BarChartComponent'
import LineGraphComponent from '../Components/Graphs/LineGraphComponent'

function DashboardsDemo1()
{




    return (
        <>
            <Flex wrap
                height='100%'
            >
                <p>see comparison of https://fonterra.infrastructuredata.nz/WTD/Dashboards/707</p>
                <LineGraphComponent graphData={rainData_json} width={3} height={1} yDomainMax={250} />
                <p>
                    see comparison of https://fonterra.infrastructuredata.nz/WTD/Dashboards/544   (Jan)
                    <br></br>
                    see comparison of https://fonterra.infrastructuredata.nz/WTD/Dashboards/536   (12 Month)
                </p>

                <BarChartComponent name={'CLASD - Rain Event Data'} graphData={rainData_json} width={3} height={2} yDomainMax={250} />

            </Flex>


        </>
    )
};

export default DashboardsDemo1;