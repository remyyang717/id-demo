// LineGraphComponent.js
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Line } from '@ant-design/plots';


function LineGraphComponent({ name, graphData, height, width, yDomainMin = 0, yDomainMax = 0, yLabel })
{
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
        colorField: 'location',
        group: true,
        width: graphWidth,
        height: graphHeight,
        title: name,
        data: graphData,
        xField: 'date',
        yField: 'rain',
        tooltip: {
            title: (d) =>
            {
                const startDate = moment(d.date, 'DD/MM/YYYY').startOf('day').format('DD-MMM HH:mm');
                const endDate = moment(d.date, 'DD/MM/YYYY').endOf('day').format('DD-MMM HH:mm');
                return `${startDate} to ${endDate}`;
            },
            items: [{ channel: 'y' }]

        },
        axis: {
            x: {
                labelFormatter: (val) =>
                {
                    const day = parseInt(moment(val, 'DD-MM-YYYY').format('DD'), 10);
                    const month = moment(val, 'DD-MM-YYYY').format('MMM').toUpperCase();
                    return day % 5 === 0 ? `${month} \n${day}` : '';
                },
            },
            y: {
                title: yLabel,

            }
        },
        scale: {
            y: {
                type: 'linear',
                ...(yDomainMax !== 0 ? { domain: [yDomainMin, yDomainMax] } : {}),

            }
        },
    };

    return (

        <div
            style={{
                padding: 0, // Reset padding
                margin: 0,  // Reset margin
                display: 'flex', // Use flexbox for centering
                justifyContent: 'center', // Center horizontally
                alignItems: 'center', // Center vertically if necessary
            }}
        >
            <Line {...config} />
        </div>

    )
};

export default LineGraphComponent;