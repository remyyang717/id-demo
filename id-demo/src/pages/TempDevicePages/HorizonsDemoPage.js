// HorizonsDemoPage.js
import React, { useState, useEffect } from 'react';
import { DatePicker, Space, Button, Flex } from 'antd';
import LineGraphComponent from '../../Components/Graphs/LineGraphComponent'
import BarChartComponent from '../../Components/Graphs/BarChartComponent'
import axios from 'axios';
import { format } from 'date-fns';
import dayjs from 'dayjs';

const requestData = {
    headers: {
        'service': 'Hilltop',
        'request': 'GetData',
        'timeInterval': 'P7D%2Fnow',
        'interval': 'raw',
        'alignment': '14%3A00',
        'site': 'Manawatu%20at%20Teachers%20College',
        'measurement': 'Flow%20%5BWater%20Level%5D',
        'chartType': 'GetData',
        'request': '0',
    }
};



// Make the POST request
axios.post('/api/hilltop/data', requestData)
    .then(response =>
    {
        console.log('Response:', response);
    })
    .catch(error =>
    {
        console.error('Error:', error);
    });

function HorizonsDemoPage()
{


    return (
        <>
            <p></p>
            {/* <Flex wrap style={{ justifyContent: 'space-around' }}>
                <LineGraphComponent graphData={graphData} height={1} width={3} />
            </Flex> */}
        </>
    );
}

export default HorizonsDemoPage;
