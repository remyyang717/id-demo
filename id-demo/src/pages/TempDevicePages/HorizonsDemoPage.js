// HorizonsDemoPage.js
import React, { useState, useEffect } from 'react';
import { DatePicker, Space, Button, Flex, Table } from 'antd';
import LineGraphComponent from '../../Components/Graphs/LineGraphComponent'

import axios from 'axios';
import { format } from 'date-fns';


const requestData = {
    params: {
        service: 'Hilltop',
        request: 'GetData',
        timeInterval: '26-01-2025/29-01-2025', // [P{x}D/now]past x day to now
        interval: 'raw',  // [raw]   [1hour]   [24 hours]
        alignment: '00:00',
        site: 'Manawatu at Teachers College',  // Ensure this is encoded
        measurement: 'Flow [Water Level]',  // Ensure this is encoded
        chartType: '0',
    }
};


const columns = [
    {
        title: 'Date & Time',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Flow l/s',
        dataIndex: 'value',
        key: 'value',
    },
];

function HorizonsDemoPage()
{
    const [Data, setData] = useState([]);



    useEffect(() =>
    {
        // Make the GET request with query parameters only once when the component mounts
        axios.get('api/hilltop/data', requestData)
            .then(response =>
            {
                // Parse the XML response
                const xml = response.data;
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xml, "application/xml");

                // Extract the data (assuming we're extracting time and flow values)
                const entries = xmlDoc.getElementsByTagName('E');
                const parsedData = Array.from(entries).map((entry, index) =>
                {
                    const formattedTime = format(new Date(entry.getElementsByTagName('T')[0].textContent), 'dd-MM-yyyy HH:mm');
                    const flow = entry.getElementsByTagName('I1')[0].textContent;
                    return {
                        key: index + 1,
                        location: 'Manawatu at Teachers College',  // Static location
                        date: formattedTime,                       // Reformatted time
                        value: flow                                // Flow value
                    };
                });

                // Update state with the parsed data
                setData(parsedData);
                console.log(parsedData)
            })
            .catch(error =>
            {
                console.error('Error fetching or parsing the XML data:', error);
            });
    }, []);


    return (
        <>

            <Flex wrap style={{ justifyContent: 'space-around' }}>
                <LineGraphComponent graphData={Data} height={1} width={3} />

                <Table bordered
                    pagination={false}
                    dataSource={Data}
                    columns={columns}
                    scroll={{
                        y: window.innerHeight * 0.5,
                    }}
                    style={{
                        width: window.innerWidth * 0.3,
                    }}
                />
            </Flex>
        </>
    );
}

export default HorizonsDemoPage;
