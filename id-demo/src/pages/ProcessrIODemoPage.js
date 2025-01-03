import React, { useState, useEffect } from 'react';
import { Flex } from 'antd';
import LineGraphComponent from '../Components/Graphs/LineGraphComponent'
import axios from 'axios';
import { format } from 'date-fns';

function GetProcessrIOData(setGraphData)
{
    const requestData = {
        names: ["Device Battery Voltage"],
        "timestampFromUtc": "2024-12-23T00:00:00",
        "timestampToUtc": "2025-01-04T00:00:00",
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

    // Handler for button click
    const handleClick = () =>
    {
        GetProcessrIOData(setGraphData); // Fetch data and update state
        console.log(graphData)
    };


    useEffect(() =>
    {
        // Log the updated graph data whenever it changes
        if (graphData.length > 0)
        {
            console.log("Updated graph data:", graphData);
        }
    }, [graphData]);

    return (
        <>
            <button onClick={handleClick}>Get</button> {/* Correctly bind the onClick event */}
            <Flex wrap style={{ justifyContent: 'space-around' }}>

                {graphData.length > 0 && <LineGraphComponent graphData={graphData} height={1} width={3} />}
            </Flex>
        </>
    );
}

export default ProcessrIODemoPage;
