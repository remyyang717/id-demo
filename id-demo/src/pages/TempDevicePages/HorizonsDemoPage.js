// HorizonsDemoPage.js
import React, { useState, useEffect } from 'react';
import { Select, DatePicker, Space, Button, Flex, Table, Tooltip } from 'antd';
import LineGraphComponent from '../../Components/Graphs/LineGraphComponent'
import dayjs from 'dayjs';
import axios from 'axios';
import { format } from 'date-fns';


const sites =
    [
        {
            site: "Manawatu at Teachers College",
            Collection: [
                {
                    "label": "Atmospheric Pressure",
                    "tag": "Atmospheric Pressure"
                },
                {
                    "label": "Dissolved Oxygen",
                    "tag": "Corrected DO (%) [Dissolved Oxygen (%)]"
                },
                {
                    "label": "Flow",
                    "tag": "Flow [Water Level]"
                },
                {
                    "label": "River Level",
                    "tag": "Stage [Water Level]"
                },
                {
                    "label": "Turbidity",
                    "tag": "Turbidity: Point Sample"
                },
                {
                    "label": "Water Temperature",
                    "tag": "Water Temperature [Dissolved Oxygen sensor]"
                }
            ]
        }
    ]

const siteCollection = sites[0]?.Collection.map(item => ({
    value: item.tag, // 'tag' becomes the value of the option
    label: item.label // 'label' becomes the label visible to the user
}));



function GetHorizonsData(setData, tag, timeInterval, interval)
{

    const requestData = {
        params: {
            service: 'Hilltop',
            request: 'GetData',
            timeInterval: timeInterval, // [P{x}D/now]past x day to now
            interval: interval,
            alignment: '7:00',
            site: 'Manawatu at Teachers College',  // Ensure this is encoded
            measurement: tag,  // Ensure this is encoded
            chartType: '0',
        }
    };

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
        })
        .catch(error =>
        {
            console.error('Error fetching or parsing the XML data:', error);
        });

}





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
    const [data, setData] = useState([]);
    const [tag, setTag] = useState('Atmospheric Pressure');

    const [startDate, setStartDate] = useState('01-01-2025');
    const [endDate, setEndDate] = useState('03-01-2025');
    const [timeInterval, setTimeInterval] = useState('01-01-2025/03-01-2025');
    const [interval, setInterval] = useState('1hour');


    const handleClick = () =>
    {
        console.log(timeInterval)
        GetHorizonsData(setData, tag, timeInterval, interval)
    };


    const handleSelectChange = (value) =>
    {
        setTag(value);
    };


    //Start time
    const onChange_StartTime = (date, dateString) =>
    {
        setStartDate(dateString)
        setTimeInterval(`${dateString}/${endDate}`);
    };
    //End time
    const onChange_EndTime = (date, dateString) =>
    {
        setEndDate(dateString)
        setTimeInterval(`${startDate}/${dateString}`);
    };

    // Time interval 
    const handleTimeIntervalChange = (value) =>
    {
        setTimeInterval(value); // Update the selected value
    };

    // interval 
    const handleIntervalChange = (value) =>
    {
        setInterval(value); // Update the selected value
        console.log(value)
    };

    useEffect(() =>
    {
        console.log('Interval Updated:', timeInterval);

    }, [timeInterval]);

    return (
        <>


            <Space direction='horizontal' size={12}>
                <Select
                    defaultValue={siteCollection[0]?.value} // Default value based on first item in Collection
                    style={{ width: 200 }}
                    options={siteCollection} // Dynamically generated options
                    onChange={handleSelectChange}
                />

                <DatePicker
                    format={'DD-MM-YYYY'}
                    value={startDate ? dayjs(startDate, 'DD-MM-YYYY') : null} // Bind value to startTime
                    placeholder="Start Date"
                    onChange={onChange_StartTime}
                    allowClear={true}
                />

                {/* End Time DatePicker */}
                <DatePicker
                    format={'DD-MM-YYYY'}
                    value={endDate ? dayjs(endDate, 'DD-MM-YYYY') : null} // Bind value to endTime
                    placeholder="End Date"
                    onChange={onChange_EndTime}
                    allowClear={true}
                />



                <Select
                    prefix="Interval : "
                    style={{ width: 'auto' }}
                    value={interval} // Bind value to state
                    onChange={handleIntervalChange} >// Handle selection change
                    <Select.Option value="1hour">Hour</Select.Option>
                    <Select.Option value="24 hours">Day</Select.Option>
                    <Select.Option value="raw" style={{ color: 'red', fontWeight: 'bold' }}>
                        <Tooltip
                            placement="right"
                            title="Do not use for long period !!!"
                        > Raw&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Tooltip>

                    </Select.Option>
                </Select>



                <Button onClick={handleClick} color="default" variant="solid">
                    Retrieve !!!
                </Button>
            </Space>


            <Flex wrap style={{ justifyContent: 'space-around' }}>
                <LineGraphComponent graphData={data} height={1} width={3} />

                <Table bordered
                    pagination={false}
                    dataSource={data}
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
