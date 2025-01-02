// ScatterComponent.js
import React from 'react';
import moment from 'moment';
import { Scatter } from '@ant-design/plots';


function ScatterComponent({ name, graphData, height = 1, width = 2, yDomainMin = 0, yDomainMax = 200, yLabel })
{



    const config = {
        colorField: 'location',
        data: graphData,
        title: name,
        width: window.innerWidth * width * 0.3,
        height: window.innerHeight * height * 0.3,
        xField: 'date',
        yField: 'rain',
        sizeField: 'rain',
        shapeField: 'point',
        crosshairs: { type: 'cross' },
        scale: {
            x: { nice: true, },
            y: { nice: true, domainMax: 240 },
            size: { type: 'log', range: [height + width, height * width * 5] },
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
        <div style={{ padding: '16px' }} >
            <Scatter {...config} />
        </div >
    )
};


export default ScatterComponent;