import React, { useState } from 'react';
import { Flex } from 'antd';
import { Table } from 'antd';

// Utility function to generate date range from 1/12/2024 to 31/12/2024
const generateDatesInRange = (startDate, endDate) =>
{
    const dates = [];
    const currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end)
    {
        dates.push(new Date(currentDate));  // Create a copy of the current date
        currentDate.setDate(currentDate.getDate() + 1);  // Move to the next day
    }

    return dates;
};

// Generate random pH values (between 6 and 8) and suspended solids (between 0 and 500)
const getRandomData = () => ({
    pH: (Math.random() * (8 - 6) + 6).toFixed(2),
    suspendedSolids: (Math.random() * 999999).toFixed(0) / 100000000000,
    volume: (Math.random() * 10000099999999999999999).toFixed(0),
});

// Generate the dates and map them to the dataSource with random values
const dates = generateDatesInRange('2024-12-01', '2024-12-31');



function BatchReportDemo()
{
    const [selectedCell, setSelectedCell] = useState(null);  // State to track the clicked cell

    // Handle the click event for each cell
    const handleCellClick = (record, column) =>
    {
        setSelectedCell({ key: record.key, column });  // Store the key of the clicked cell and the column name
    };

    // Define columns for the table
    const defaultColumns = [
        {
            title: 'Date',
            dataIndex: 'Date',
            width: 150,
            onCell: (record) => ({
                onClick: () => handleCellClick(record, 'Date'),  // Handle click to store clicked cell key and column
                style: {
                    backgroundColor: selectedCell?.key === record.key && selectedCell.column === 'Date' ? 'lightgreen' : '',  // Apply background color if cell is clicked
                },
            }),
        },
        {
            title: 'pH',
            dataIndex: 'pH',
            width: 150,
            onCell: (record) => ({
                onClick: () => handleCellClick(record, 'pH'),  // Handle click to store clicked cell key and column
                style: {
                    backgroundColor: selectedCell?.key === record.key && selectedCell.column === 'pH' ? 'lightgreen' : '',  // Apply background color if cell is clicked
                },
            }),
        },
        {
            title: 'Suspended Solids',
            dataIndex: 'SuspendedSolids',
            width: 150,
            onCell: (record) => ({
                onClick: () => handleCellClick(record, 'SuspendedSolids'),  // Handle click to store clicked cell key and column
                style: {
                    backgroundColor: selectedCell?.key === record.key && selectedCell.column === 'SuspendedSolids' ? 'lightgreen' : '',  // Apply background color if cell is clicked
                },
            }),
        },
        {
            title: 'Volume',
            dataIndex: 'Volume',
            width: 300,
            onCell: (record) => ({
                onClick: () => handleCellClick(record, 'Volume'),  // Handle click to store clicked cell key and column
                style: {
                    backgroundColor: selectedCell?.key === record.key && selectedCell.column === 'Volume' ? 'lightgreen' : '',  // Apply background color if cell is clicked
                },
            }),
        }
    ];

    const dataSource = dates.map((date, i) => ({
        key: i,
        Date: `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`,
        pH: getRandomData().pH,
        SuspendedSolids: getRandomData().suspendedSolids,
        Volume: getRandomData().volume
    }));

    const Temp = dataSource

    return (
        <>
            <Flex wrap>
                <Table
                    bordered
                    pagination={false}
                    columns={defaultColumns}
                    dataSource={Temp}
                    rowClassName="custom-row"
                    scroll={{
                        y: window.innerHeight * 0.5,
                    }}
                    style={{
                        width: window.innerWidth * 0.6,
                    }}
                />
            </Flex>
        </>
    );
};

export default BatchReportDemo;
