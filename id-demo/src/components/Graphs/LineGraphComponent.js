// LineGraphComponent.js
import React from 'react';
import moment from 'moment';
import { Line } from '@ant-design/plots';


function LineGraphComponent({ graphData, height, width })
{
    const config = {
        colorField: 'location',
        group: true,
        width: window.innerWidth * width * 0.1,
        height: window.innerHeight * height * 0.1,
        title: 'Rain data ',
        data: graphData,
        xField: 'date',
        yField: 'rain',
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
                title: 'Volume',

            }
        },
        scale: {
            y: {
                type: 'linear',
                domain: [0, 100],
            }
        }
    };

    return (
        <div style={{ padding: '16px' }}>
            <Line {...config} />
        </div>
    )
};

export default LineGraphComponent;