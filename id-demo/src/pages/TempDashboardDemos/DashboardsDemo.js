// DashboardsDemo1.js
import React from 'react';
import rainData_json from '../../Data/rainData.json';
import { Flex, } from 'antd';
import BarChartComponent from '../../Components/Graphs/BarChartComponent'
import LineGraphComponent from '../../Components/Graphs/LineGraphComponent'
import ScatterComponent from '../../Components/Graphs/ScatterComponent';
import BoxplotComponent from '../../Components/Graphs/BoxplotComponent';
import { Column, Pie, Waterfall, DualAxes, Box, Liquid, Gauge, RadialBar } from '@ant-design/plots';

function DashboardsDemo()
{

    //#region 
    const config_RangeColumnChart = {
        data: [
            { month: 'Jan.', profit: 387264, start: 0, end: 387264 },
            { month: 'Feb.', profit: 772096, start: 387264, end: 1159360 },
            { month: 'Mar.', profit: 638075, start: 1159360, end: 1797435 },
            { month: 'Apr.', profit: -211386, start: 1797435, end: 1586049 },
            { month: 'May', profit: -138135, start: 1586049, end: 1447914 },
            { month: 'Jun', profit: -267238, start: 1447914, end: 1180676 },
            { month: 'Jul.', profit: 431406, start: 1180676, end: 1612082 },
            { month: 'Aug.', profit: 363018, start: 1612082, end: 1975100 },
            { month: 'Sep.', profit: -224638, start: 1975100, end: 1750462 },
            { month: 'Oct.', profit: -299867, start: 1750462, end: 1450595 },
            { month: 'Nov.', profit: 607365, start: 1450595, end: 2057960 },
            { month: 'Dec.', profit: 1106986, start: 2057960, end: 3164946 },
            { month: 'Total', start: 0, end: 3164946 },
        ],
        title: 'Range Column Chart Demo',
        xField: 'month',
        yField: ['start', 'end'],
        colorField: (d) => (d.month === 'Total' ? 'Total' : d.profit > 0 ? 'Increase' : 'Decrease'),
        axis: {
            y: { labelFormatter: '~s' },
        },
        tooltip: {
            items: ['start', 'end'],
        },
    };



    const config_Pei = {
        data: [
            { type: 'Auckland', value: 27 },
            { type: 'Wellington', value: 25 },
            { type: 'Hamilton', value: 18 },
            { type: 'Gisborne', value: 15 },
            { type: 'Rotorua', value: 10 },
            { type: 'Other', value: 8 },
        ],
        title: 'Pie Chart',
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
            text: (d) => `${d.type}\n ${d.value}`,
            position: 'spider',
        },
        legend: {
            color: {
                title: false,
                position: 'right',
                rowPadding: 5,
            },
        },
    };

    const config_Waterfall = {
        data: [
            { x: 'Start', value: 23000000 },
            { x: 'Jan', value: 2200000 },
            { x: 'Feb', value: -4600000 },
            { x: 'Mar', value: -9100000 },
            { x: 'Apr', value: 3700000 },
            { x: 'May', value: -2100000 },
            { x: 'Jun', value: 5300000 },
            { x: 'Jul', value: 3100000 },
            { x: 'Aug', value: -1500000 },
            { x: 'Sep', value: 4200000 },
            { x: 'Oct', value: 5300000 },
            { x: 'Nov', value: -1500000 },
            { x: 'Dec', value: 5100000 },
            { x: 'End', isTotal: true, value: 33100000 },
        ],
        title: 'Revenue Flow Waterfall Chart',
        xField: 'x',
        yField: 'value',
        linkStyle: {
            lineDash: [4, 2],
            stroke: '#ccc',
        },
        style: {
            maxWidth: 25,
            stroke: '#ccc',
            fill: (d, idx) =>
            {
                return idx === 0 || d.isTotal ? '#96a6a6' : d.value > 0 ? '#64b5f6' : '#ef6c00';
            },
        },
        label: {
            text: 'value',
            formatter: '~s',
            position: (d) => (d.value > 0 ? 'top' : 'bottom'),
            textBaseline: (d) => (d.value > 0 ? 'bottom' : 'top'),
            fontSize: 10,
            dy: (d) => (d.value > 0 ? -4 : 4),
        },
    };

    const config_DemoDualAxes = {
        data: [
            {
                Month: 'Jan',
                Evaporation: 2,
                Precipitation: 2.6,
                Temperature: 2,
            },
            {
                Month: 'Feb',
                Evaporation: 4.9,
                Precipitation: 5.9,
                Temperature: 2.2,
            },
            {
                Month: 'Mar',
                Evaporation: 7,
                Precipitation: 9,
                Temperature: 3.3,
            },
            {
                Month: 'Apr',
                Evaporation: 23.2,
                Precipitation: 26.4,
                Temperature: 4.5,
            },
            {
                Month: 'May',
                Evaporation: 25.6,
                Precipitation: 28.7,
                Temperature: 6.3,
            },
            {
                Month: 'Jun',
                Evaporation: 76.7,
                Precipitation: 70.7,
                Temperature: 10.2,
            },
            {
                Month: 'Jul',
                Evaporation: 135.6,
                Precipitation: 175.6,
                Temperature: 20.3,
            },
            {
                Month: 'Aug',
                Evaporation: 162.2,
                Precipitation: 182.2,
                Temperature: 23.4,
            },
            {
                Month: 'Sep',
                Evaporation: 32.6,
                Precipitation: 48.7,
                Temperature: 23,
            },
            {
                Month: 'Oct',
                Evaporation: 20,
                Precipitation: 18.8,
                Temperature: 16.5,
            },
            {
                Month: 'Nov',
                Evaporation: 6.4,
                Precipitation: 6,
                Temperature: 12,
            },
            {
                Month: 'Dec',
                Evaporation: 3.3,
                Precipitation: 2.3,
                Temperature: 6.2,
            },
        ],
        title: 'Multi Axis Chart',
        xField: 'Month',
        scale: { y: { nice: false } },
        children: [
            {
                type: 'line',
                yField: 'Temperature',
                shapeField: 'smooth',
                colorField: '#EE6666',
                scale: { y: { domainMax: 30 } },
                axis: {
                    y: {
                        title: 'Temperature (°C)',
                        style: { titleFill: '#EE6666' },
                    },
                },
            },
            {
                type: 'interval',
                yField: 'Evaporation',
                colorField: '#5470C6',
                scale: { y: { domainMax: 200 } },
                style: { fillOpacity: 0.8 },
                axis: {
                    y: {
                        position: 'right',
                        title: 'Evaporation (ml)',
                        style: { titleFill: '#5470C6' },
                    },
                },
            },
            {
                type: 'line',
                yField: 'Precipitation',
                shapeField: 'smooth',
                colorField: '#91CC75',
                style: {
                    lineWidth: 2,
                    lineDash: [2, 2],
                },
                axis: {
                    y: {
                        position: 'right',
                        title: 'Precipitation (ml)',
                        style: { titleFill: '#91CC75' },
                    },
                },
            },
        ],
    };

    const data_PolarBoxplot = [
        { x: 'Oceania', y: [1, 9, 16, 22, 24] },
        { x: 'East Europe', y: [1, 5, 8, 12, 16] },
        { x: 'Australia', y: [1, 8, 12, 19, 26] },
        { x: 'South America', y: [2, 8, 12, 21, 28] },
        { x: 'North Africa', y: [1, 8, 14, 18, 24] },
        { x: 'North America', y: [3, 10, 17, 28, 30] },
        { x: 'West Europe', y: [1, 7, 10, 17, 22] },
        { x: 'West Africa', y: [1, 6, 8, 13, 16] },
    ];

    const config_PolarBoxplot = {
        data: {
            value: data_PolarBoxplot,
        },
        title: 'Polar Boxplot',
        xField: 'x',
        yField: 'y',
        colorField: 'x',
        scale: { x: { paddingInner: 0.6, paddingOuter: 0.3 }, y: { zero: true } },
        coordinate: { type: 'polar', innerRadius: 0.2 },
        style: { stroke: 'black' },
        axis: { y: { tickCount: 5 } },
        legend: false,
    };


    const config_DemoLiquid = {
        percent: 0.375,
        title: 'Liquid Chart',
        style: {
            outlineBorder: 4,
            outlineDistance: 8,
            waveLength: 128,
        }
    };

    const config_DemoGauge = {
        width: window.innerWidth * 0.50,
        height: window.innerHeight * 0.50,
        autoFit: true,
        title: 'Gauge Chart',
        data: {
            target: 159,
            total: 400,
            name: 'score',
            thresholds: [100, 200, 400],
        },
        legend: false,
        scale: {
            color: {
                range: ['#F4664A', '#FAAD14', 'green'],
            },
        },
        style: {
            textContent: (target, total) => `Value：${target}\nPercentage：${(target / total) * 100}%`,
        }
    };

    const config_DemoRadialBar = {
        data: [
            { name: 'Hamilton', star: 1345 },
            { name: 'Rotorua', star: 2254 },
            { name: 'Tauranga', star: 3657 },
            { name: 'Napier', star: 4700 },
            { name: 'Palmerston North', star: 5000 },
            { name: 'Nelson', star: 7100 },
            { name: 'Dunedin', star: 7346 },
            { name: 'Invercargill', star: 10178 },
        ],
        title: 'Radial-Bar plot',
        xField: 'name',
        yField: 'star',
        // maxAngle: 90, //最大旋转角度,
        radius: 1,
        innerRadius: 0.2,
        tooltip: {
            items: ['star'],
        },
    };


    //#endregion




    return (
        <>
            <Flex wrap style={{
                justifyContent: 'space-around',
                minHeight: '100%'
            }}>
                <p>see comparison of https://fonterra.infrastructuredata.nz/WTD/Dashboards/707</p>
                <LineGraphComponent graphData={rainData_json} width={3} height={2} yDomainMax={250} tooltipDisplayRange={true} />
                <p>
                    see comparison of https://fonterra.infrastructuredata.nz/WTD/Dashboards/544   (Jan)
                    <br></br>
                    see comparison of https://fonterra.infrastructuredata.nz/WTD/Dashboards/536   (12 Month)
                </p>

                <BarChartComponent name={'CLASD - Rain Event Data'} graphData={rainData_json} width={3} height={2} yDomainMax={250} tooltipDisplayRange={true} />
                <ScatterComponent name='Scatter Demo' graphData={rainData_json} width={3} height={2} />
                <BoxplotComponent name='Boxplot Demo' graphData={rainData_json} yDomainMax={300} width={3} height={2} />

                <div style={{
                    height: '35vh',
                    width: '45vw'
                }}>
                    <Column {...config_RangeColumnChart} />
                </div>

                <div style={{
                    height: '35vh',
                    width: '45vw'
                }}>
                    <Pie {...config_Pei} />
                </div>

                <div style={{
                    height: '40vh',
                    width: '90vw'
                }}>
                    <Waterfall {...config_Waterfall} />
                </div>

                <div style={{
                    height: '60vh',
                    width: '90vw'
                }}>
                    <DualAxes {...config_DemoDualAxes} />
                </div>

                <div style={{
                    height: '60vh',
                    width: '45vw'
                }}>
                    <Box {...config_PolarBoxplot} />
                </div>

                <div style={{
                    height: '60vh',
                    width: '45vw'
                }}>
                    <Liquid {...config_DemoLiquid} />
                </div>

                <div style={{
                    height: '50vh',
                    width: '45vw'
                }}>
                    <Gauge {...config_DemoGauge} />
                </div>

                <div style={{
                    height: '50vh',
                    width: '45vw'
                }}>
                    <RadialBar {...config_DemoRadialBar} />
                </div>

            </Flex>


        </>
    )
};

export default DashboardsDemo;