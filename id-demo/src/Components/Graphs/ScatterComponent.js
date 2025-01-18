// ScatterComponent.js
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Scatter } from '@ant-design/plots';


function ScatterComponent({ name, graphData, height = 1, width = 2, yDomainMin = 0, yDomainMax = 200, yLabel })
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
        data: graphData,
        title: name,
        width: graphWidth,
        height: graphHeight,
        xField: 'date',
        yField: 'value',
        sizeField: 'value',
        shapeField: 'point',
        crosshairs: { type: 'cross' },
        scale: {
            x: { nice: true, },
            y: { nice: true, domainMax: 240 },
            size: { type: 'log', range: [height + width, height * width * 2.5] },
        },
        style: { fillOpacity: 0.3, lineWidth: 1 },
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

    }



    return (
        <div>
            <Scatter {...config} />
        </div>


    )
};


export default ScatterComponent;