// LineGraphComponent.js
import React from 'react';
import moment from 'moment';
import { Line } from '@ant-design/plots';




function LineGraphComponent({ name, graphData, height, width, yDomainMin = 0, yDomainMax = 0 })
{

    const config = {
        colorField: 'location',
        group: true,
        width: window.innerWidth * width * 0.3,
        height: window.innerHeight * height * 0.3,
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
                title: 'Volume',

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
        <div style={{ padding: '16px' }}>
            <Line {...config} />
        </div>
    )
};

export default LineGraphComponent;