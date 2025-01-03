// LineGraphComponent.js
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Line } from '@ant-design/plots';


function LineGraphComponent({ name, graphData, height, width, yDomainMin = 0, yDomainMax = 0, yLabel, tooltipDisplayRange = false })
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
            const startDate = moment(d.date, 'DD/MM/YYYY hh:mm:ss').startOf('day').format('DD-MMM HH:mm');
            const endDate = moment(d.date, 'DD/MM/YYYY hh:mm:ss').endOf('day').format('DD-MMM HH:mm');
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

    const locations = new Set(graphData.map(item => item.location)).size;
    const labelMod = Math.floor((graphData.length / locations) / (graphWidth / 150));


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
                            return index % labelMod === 0 ? `${time}\n${day}` : '';
                        case 'DD MMM':
                            return index % labelMod === 0 ? `${day}\n${month}` : '';
                        case 'MMM YYYY':
                            return index % labelMod === 0 ? `${month}\n${year}` : '';
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
            <Line {...config} />
        </div>

    )
};

export default LineGraphComponent;