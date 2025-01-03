// BarChartComponent.js
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Column } from '@ant-design/plots';


function BarChartComponent({ name, graphData, height = 1, width = 1, yDomainMin = 0, yDomainMax = 0, yLabel, tooltipDisplayRange = false })
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


    const tooltipConfig = {
        title: (d) =>
        {
            const startDate = moment(d.date, 'DD/MM/YYYY').startOf('day').format('DD-MMM HH:mm');
            const endDate = moment(d.date, 'DD/MM/YYYY').endOf('day').format('DD-MMM HH:mm');
            return `${startDate} to ${endDate}`;
        },
        items: [{ channel: 'y' }]
    };

    // Customise Label
    // Calculate the minimum and maximum date from the graphData
    const dates = graphData.map(item => moment(item.date, 'DD-MM-YYYY HH:mm:ss'));
    const minDate = moment.min(dates);
    const maxDate = moment.max(dates);

    // Calculate the time range (difference between the min and max dates)
    const dateRange = maxDate.diff(minDate, 'days');
    const getLabelFormat = () =>
    {
        if (dateRange < 1)
        {
            return 'hh:mm'; // For ranges less than 3 days
        } else if (dateRange >= 1 && dateRange <= 365)
        {
            return 'DD MMM'; // For ranges between 3 days and 6 months
        } else
        {
            return 'MMM YYYY'; // For ranges greater than 6 months
        }
    };

    const dataLength = new Set(graphData.map(item => item.location)).size;
    const labelMod = Math.floor((graphData.length / dataLength) / (graphWidth / 150));

    const config = {
        colorField: 'location',
        group: true,
        width: graphWidth,
        height: graphHeight,
        title: name,
        data: graphData,
        xField: 'date',
        yField: 'value',
        tooltip: tooltipDisplayRange ? tooltipConfig : {},

        axis: {

            x: {
                labelFormatter: (val, index) =>
                {
                    const momentVal = moment(val, 'DD-MM-YYYY');
                    const day = momentVal.format('DD');
                    const month = momentVal.format('MMM');
                    const year = momentVal.format('YYYY');
                    const time = momentVal.format('HH:mm');

                    const format = getLabelFormat();
                    switch (format)
                    {
                        case 'hh:mm':
                            return index % labelMod === 0 ? `${time} ${day}` : '';
                        case 'DD MMM':
                            return index % labelMod === 0 ? `${day} ${month}` : '';
                        case 'MMM YYYY':
                            return index % labelMod === 0 ? `${month} ${year}` : '';
                        default:
                            return '';
                    }
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
        <div>
            <Column {...config} />
        </div>
    )
};


export default BarChartComponent;