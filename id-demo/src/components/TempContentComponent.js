// TempContentComponent.js
import React from 'react';
import BarChartComponent from '../Components/Graphs/BarChartComponent'
import rainData_json from '../Data/rainData.json';






function TempContentComponent()
{



    return (
        <>

            <BarChartComponent graphData={rainData_json} width={3} height={1} name={"Rain Data"} />


        </>
    )
};

export default TempContentComponent;

