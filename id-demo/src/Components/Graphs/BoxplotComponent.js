// BarChartComponent.js
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Box } from '@ant-design/plots';
import Title from 'antd/es/skeleton/Title';


const calculateQuartiles = (data) =>
{
    const sortedData = [...data].sort((a, b) => a - b);

    const min = sortedData[0];
    const max = sortedData[sortedData.length - 1];


    const median = (arr) =>
    {
        const mid = Math.floor(arr.length / 2);
        return arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
    };


    const q1 = median(sortedData.slice(0, Math.floor(sortedData.length / 2)));

    const q3 = median(sortedData.slice(Math.ceil(sortedData.length / 2)));

    return [min, q1, q3, median(sortedData), max];
};

function BoxplotComponent({ name, graphData, height = 1, width = 1, yDomainMin = 0, yDomainMax = 0, yLabel })
{




    // Group data by location
    const groupedData = graphData.reduce((acc, { location, value }) =>
    {
        if (!acc[location])
        {
            acc[location] = [];
        }
        acc[location].push(value);
        return acc;
    }, {});

    // Transform the grouped data into the desired format
    const transformedData = Object.keys(groupedData).map(location => ({
        x: location,
        y: calculateQuartiles(groupedData[location].sort((a, b) => a - b)),
    }));



    const [graphWidth, setGraphWidth] = useState(window.innerWidth * width * 0.3);
    const [graphHeight, setGraphHeight] = useState(window.innerHeight * height * 0.3);

    // Resize handler that updates chart dimensions based on window size
    useEffect(() =>
    {
        const handleResize = () =>
        {
            setGraphWidth(window.innerWidth * width * 0.3);
            setGraphHeight(window.innerHeight * height * 0.3);
        };

        // Attach the resize event listener
        window.addEventListener('resize', handleResize);

        // Call the handler once to set initial sizes
        handleResize();

        // Cleanup the event listener on component unmount
        return () =>
        {
            window.removeEventListener('resize', handleResize);
        };
    }, [height, width]);



    const config = {
        data: {
            value: transformedData,
        },
        title: name,
        width: graphWidth,
        height: graphHeight,
        xField: 'x',
        yField: 'y',
        colorField: 'x',
        boxType: 'box',
        legend: true,
        style: {
            stroke: 'black',
        },
        scale: {
            x: { paddingInner: 0.6, paddingOuter: 0.3 },
            y: { zero: true, ...(yDomainMax !== 0 ? { domain: [yDomainMin, yDomainMax] } : {}) },
        }


    };

    return (
        <div>
            <Box {...config} />
        </div>
    )
};


export default BoxplotComponent;