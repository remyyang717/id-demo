// BarChartComponent.js
import React from 'react';
import moment from 'moment';
import { Column } from '@ant-design/plots';


function BarChartComponent({ name, graphData, height = 1, width = 1, yDomainMin = 0, yDomainMax = 0, yLabel })
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
        <div style={{ padding: '16px' }} >
            <Column {...config} />
        </div >
    )
};


export default BarChartComponent;