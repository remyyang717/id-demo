//EditableGraphDemo.js
import React, { useEffect, useState } from 'react';
import rainData_json from '../Data/rainData.json';
import { Flex, Input, Col, Row, Select } from 'antd';
import BarChartComponent from '../Components/Graphs/BarChartComponent'
import LineGraphComponent from '../Components/Graphs/LineGraphComponent'
import ScatterComponent from '../Components/Graphs/ScatterComponent'

const { Option } = Select;




function EditableGraphDemo()
{
    const [graphName1, setGraphName1] = useState('CLA - Rain Event Data (Bar)');
    const [graphYLabel1, setGraphYLabel1] = useState('Volume');
    const [graphWidth1, setGraphWidth1] = useState(3);
    const [graphHeight1, setGraphHeight1] = useState(1);
    const [graphYMin1, setGraphYMin1] = useState(0);
    const [graphYMax1, setGraphYMax1] = useState(250);




    const handleGraphNameBlur = (e) =>
    {
        setGraphName1(e.target.value);
        e.target.blur();
    };

    const handleGraphYLabelBlur = (e) =>
    {
        setGraphYLabel1(e.target.value);
        e.target.blur();
    };


    const handleWidthChange = (value) =>
    {
        setGraphWidth1(value);
    };

    const handleHeightChange = (value) =>
    {
        setGraphHeight1(value);
    };

    const handleYminChange = (value) =>
    {
        setGraphYMin1(value);
    };
    const handleYMaxChange = (value) =>
    {
        setGraphYMax1(value);
    };


    const [graphName2, setGraphName2] = useState('CLA - Rain Event Data (Line)');
    const [graphYLabel2, setGraphYLabel2] = useState('Volume');
    const [graphWidth2, setGraphWidth2] = useState(3);
    const [graphHeight2, setGraphHeight2] = useState(1);
    const [graphYMin2, setGraphYMin2] = useState(0);
    const [graphYMax2, setGraphYMax2] = useState(250);


    const handleGraphNameBlur2 = (e) =>
    {
        setGraphName2(e.target.value);
        e.target.blur();
    };

    const handleGraphYLabelBlur2 = (e) =>
    {
        setGraphYLabel2(e.target.value);
        e.target.blur();
    };

    const handleWidthChange2 = (value) =>
    {
        setGraphWidth2(value);
    };

    const handleHeightChange2 = (value) =>
    {
        setGraphHeight2(value);
    };

    const handleYminChange2 = (value) =>
    {
        setGraphYMin2(value);
    };
    const handleYMaxChange2 = (value) =>
    {
        setGraphYMax2(value);
    };


    return (
        <>
            <Row style={{ margin: '10px' }}>
                <Col flex={1} style={{ margin: '15px' }}>
                    <label> First Graph (Bar)</label>
                </Col>
                <Col flex={4} style={{ margin: '10px' }}>
                    <Input
                        addonBefore='Graph Name'
                        showCount maxLength={30}
                        onBlur={handleGraphNameBlur}
                        onPressEnter={handleGraphNameBlur} />
                </Col>

                <Col flex={1} style={{ margin: '10px' }}>
                    <Input
                        addonBefore='Y Label'
                        showCount maxLength={16}
                        onBlur={handleGraphYLabelBlur}
                        onPressEnter={handleGraphYLabelBlur} />
                </Col>
                <Col flex={1} style={{ margin: '10px' }}>
                    <label>Width</label>
                    <Select

                        defaultValue="3"
                        style={{
                            width: 120,
                        }}
                        onChange={handleWidthChange}
                        options={[
                            {
                                value: 1,
                                label: '1',
                            },
                            {
                                value: 2,
                                label: '2',
                            },
                            {
                                value: 3,
                                label: '3',
                            }
                        ]}
                    />
                </Col>
                <Col flex={1} style={{ margin: '10px' }}>
                    <label>Height</label>
                    <Select
                        defaultValue="1"
                        style={{
                            width: 120,
                        }}
                        onChange={handleHeightChange}
                        options={[
                            {
                                value: 1,
                                label: '1',
                            },
                            {
                                value: 2,
                                label: '2',
                            },
                            {
                                value: 3,
                                label: '3',
                            }
                        ]}
                    />
                </Col>
                <Col flex={1} style={{ margin: '10px' }}>
                    <label>Y Min</label>
                    <Select
                        defaultValue="0"
                        style={{
                            width: 120,
                        }}
                        onChange={handleYminChange}
                        options={[

                            {
                                value: 0,
                                label: '0',
                            },
                            {
                                value: -50,
                                label: '-50',
                            },
                            {
                                value: -100,
                                label: '-100',
                            }
                        ]}
                    />
                </Col>
                <Col flex={1} style={{ margin: '10px' }}>
                    <label>Y Max</label>
                    <Select
                        defaultValue="250"
                        style={{
                            width: 120,
                        }}
                        onChange={handleYMaxChange}
                        options={[
                            {
                                value: 200,
                                label: '200',
                            },
                            {
                                value: 250,
                                label: '250',
                            },
                            {
                                value: 300,
                                label: '300',
                            },
                            {
                                value: 1100,
                                label: '1100',
                            }
                        ]}
                    />
                </Col>
                <Col flex={12}></Col>
            </Row >
            <Row style={{ margin: '10px' }}>
                <Col flex={1} style={{ margin: '15px' }}>
                    <label> Second Graph (Line)</label>
                </Col>
                <Col flex={4} style={{ margin: '10px' }}>
                    <Input
                        addonBefore='Graph Name'
                        showCount maxLength={30}
                        onBlur={handleGraphNameBlur2}
                        onPressEnter={handleGraphNameBlur2} />
                </Col>
                <Col flex={1} style={{ margin: '10px' }}>
                    <Input
                        addonBefore='Y Label'
                        showCount maxLength={16}
                        onBlur={handleGraphYLabelBlur2}
                        onPressEnter={handleGraphYLabelBlur2} />
                </Col>
                <Col flex={1} style={{ margin: '10px' }}>
                    <label>Width</label>
                    <Select
                        defaultValue="3"
                        style={{
                            width: 120,
                        }}
                        onChange={handleWidthChange2}
                        options={[
                            {
                                value: 1,
                                label: '1',
                            },
                            {
                                value: 2,
                                label: '2',
                            },
                            {
                                value: 3,
                                label: '3',
                            }
                        ]}
                    />
                </Col>
                <Col flex={1} style={{ margin: '10px' }}>
                    <label>Height</label>
                    <Select
                        defaultValue="1"
                        style={{
                            width: 120,
                        }}
                        onChange={handleHeightChange2}
                        options={[
                            {
                                value: 1,
                                label: '1',
                            },
                            {
                                value: 2,
                                label: '2',
                            },
                            {
                                value: 3,
                                label: '3',
                            }
                        ]}
                    />
                </Col>
                <Col flex={1} style={{ margin: '10px' }}>
                    <label>Y Min</label>
                    <Select
                        defaultValue="0"
                        style={{
                            width: 120,
                        }}
                        onChange={handleYminChange2}
                        options={[

                            {
                                value: 0,
                                label: '0',
                            },
                            {
                                value: -50,
                                label: '-50',
                            },
                            {
                                value: -100,
                                label: '-100',
                            }
                        ]}
                    />
                </Col>
                <Col flex={1} style={{ margin: '10px' }}>
                    <label>Y Max</label>
                    <Select
                        defaultValue="250"
                        style={{
                            width: 120,
                        }}
                        onChange={handleYMaxChange2}
                        options={[
                            {
                                value: 200,
                                label: '200',
                            },
                            {
                                value: 250,
                                label: '250',
                            },
                            {
                                value: 300,
                                label: '300',
                            },
                            {
                                value: 1100,
                                label: '1100',
                            }
                        ]}
                    />
                </Col>
                <Col flex={12}></Col>
            </Row >




            <Flex wrap>
                <BarChartComponent name={graphName1} graphData={rainData_json} width={graphWidth1} height={graphHeight1} yDomainMin={graphYMin1} yDomainMax={graphYMax1} yLabel={graphYLabel1} />
                <LineGraphComponent name={graphName2} graphData={rainData_json} width={graphWidth2} height={graphHeight2} yDomainMin={graphYMin2} yDomainMax={graphYMax2} yLabel={graphYLabel2} />
                {/* <ScatterComponent /> */}
            </Flex>
        </>
    )
};

export default EditableGraphDemo;