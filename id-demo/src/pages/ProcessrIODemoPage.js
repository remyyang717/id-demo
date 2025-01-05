import React, { useState, useEffect } from 'react';
import { DatePicker, Space, Button, Flex } from 'antd';
import LineGraphComponent from '../Components/Graphs/LineGraphComponent'
import BarChartComponent from '../Components/Graphs/BarChartComponent'
import AreaGraphComponent from '../Components/Graphs/AreaGraphComponent'
import axios from 'axios';
import { format } from 'date-fns';
import dayjs from 'dayjs';


function GetProcessrIOData(setGraphData, startTime, endTime)
{
    const requestData = {
        names: ["Device Battery Voltage"],
        "timestampFromUtc": startTime,
        "timestampToUtc": endTime,
        format: 2
    };

    axios.post('/api/v1/DataPoints/byDeviceId/746', requestData, {
        headers: {
            'X-Api-Key': '0hcVBe9ED0iZYHhxrmNT_Q',
            'Content-Type': 'application/json'
        }
    })
        .then(response =>
        {
            const graphData = response.data.map(item => ({
                location: 'Device Battery Voltage',
                date: format(new Date(item.time), 'dd-MM-yyyy HH:mm:ss'),
                value: item['Device Battery Voltage']
            }));
            setGraphData(graphData); // Update the state with the fetched data
        })
        .catch(error =>
        {
            if (error.response && error.response.status === 429)
            {
                const retryAfter = error.response.headers['retry-after'];
                console.log(`Rate limit exceeded. Retry after ${retryAfter} seconds.`);
                // Handle the delay before retrying
                setTimeout(() =>
                {
                    // Retry logic here
                }, retryAfter * 1000); // Convert seconds to milliseconds
            } else
            {
                console.error('Error:', error);
            }
        });
}

function ProcessrIODemoPage()
{
    const [graphData, setGraphData] = useState([]);

    //Start time
    const [startTime, setStartTime] = useState('2025-01-01T00:00:00');
    const onChange_StartTime = (date, dateString) =>
    {
        setStartTime(dateString + "T00:00:00")
    };
    //End time
    const [endTime, setEndTime] = useState('2025-01-03T00:00:00');
    const onChange_EndTime = (date, dateString) =>
    {
        setEndTime(dateString + "T00:00:00")
    };

    // Handler for button click
    const handleClick = () =>
    {
        GetProcessrIOData(setGraphData, startTime, endTime); // Fetch data and update state
    };


    useEffect(() =>
    {
        console.log('StartTime Updated:', startTime);
        console.log('EndTime:', endTime);
    }, [startTime, endTime]);

    return (
        <>
            <Space direction='horizontal' size={12}>
                <DatePicker
                    defaultValue={dayjs('2025/01/01')}
                    placeholder='Start Date'
                    onChange={onChange_StartTime}
                />
                <DatePicker
                    defaultValue={dayjs('2025/01/03')}
                    placeholder='End Date'
                    onChange={onChange_EndTime}
                />
                <Button onClick={handleClick} color="default" variant="solid">
                    Retrieve !!!
                </Button>
            </Space>


            <Flex wrap style={{ justifyContent: 'space-around' }}>
                <LineGraphComponent graphData={graphData} height={1} width={3} />
                <BarChartComponent graphData={graphData} height={1} width={3} />
            </Flex>
        </>
    );
}

export default ProcessrIODemoPage;
