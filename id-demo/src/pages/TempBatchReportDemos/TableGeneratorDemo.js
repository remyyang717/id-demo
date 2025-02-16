import React, { useState } from 'react';
import { Table, Input, Button } from 'antd';
import { processSoftSensorPythonStringWithDataSource } from '../../utils/HandlePythonString'

// NZ time zone code = "NZ"
// UTC time zone code = "UTC"

// # Check all the time zones
// for i in pytz.all_timezones:
// print(i)

const codeString = `
volume_Auckland = [
    ['01/01/2025', 8596],
    ['02/01/2025', 4348],
    ['03/01/2025', 697],
    ['04/01/2025', 4853],
    ['05/01/2025', 2813],
    ['06/01/2025', 3992],
    ['07/01/2025', 7301],
    ['08/01/2025', 9194],
    ['09/01/2025', 7089],
    ['10/01/2025', 6319],
    ['11/01/2025', 1365],
    ['12/01/2025', 8346],
    ['13/01/2025', 7651],
    ['14/01/2025', 8498],
    ['15/01/2025', 1878],
    ['16/01/2025', 5227],
    ['17/01/2025', 1598],
    ['18/01/2025', 6462],
    ['19/01/2025', 2814],
    ['20/01/2025', 5081],
    ['21/01/2025', 5455],
    ['22/01/2025', 4655],
    ['23/01/2025', 2125],
    ['24/01/2025', 9124],
    ['25/01/2025', 2658],
    ['26/01/2025', 6071],
    ['27/01/2025', 308],
    ['28/01/2025', 2252],
    ['29/01/2025', 1252],
    ['30/01/2025', 6054],
    ['31/01/2025', 2777]
]

volume_Whakapapa = [
    ['01/01/2025', 21],
    ['02/01/2025', 31],
    ['03/01/2025', 68],
    ['04/01/2025', 54],
    ['05/01/2025', 79],
    ['06/01/2025', 41],
    ['07/01/2025', 42],
    ['08/01/2025', 64],
    ['09/01/2025', 44],
    ['10/01/2025', 22],
    ['11/01/2025', 28],
    ['12/01/2025', 89],
    ['13/01/2025', 53],
    ['14/01/2025', 80],
    ['15/01/2025', 80],
    ['16/01/2025', 52],
    ['17/01/2025', 79],
    ['18/01/2025', 36],
    ['19/01/2025', 89],
    ['20/01/2025', 65],
    ['21/01/2025', 43],
    ['22/01/2025', 22],
    ['23/01/2025', 65],
    ['24/01/2025', 55],
    ['25/01/2025', 30],
    ['26/01/2025', 95],
    ['27/01/2025', 32],
    ['28/01/2025', 46],
    ['29/01/2025', 25],
    ['30/01/2025', 89],
    ['31/01/2025', 31]
]

Suspended_Solid = [
    ['01/01/2025', 3.51],
    ['02/01/2025', 1.87],
    ['03/01/2025', 0.49],
    ['04/01/2025', 5.75],
    ['05/01/2025', 2.68],
    ['06/01/2025', 0.83],
    ['07/01/2025', 6.69],
    ['08/01/2025', 5.93],
    ['09/01/2025', 0.94],
    ['10/01/2025', 3.76],
    ['11/01/2025', 4.74],
    ['12/01/2025', 3.74],
    ['13/01/2025', 2.37],
    ['14/01/2025', 5.79],
    ['15/01/2025', 5.67],
    ['16/01/2025', 0.42],
    ['17/01/2025', 0.79],
    ['18/01/2025', 2.29],
    ['19/01/2025', 5.46],
    ['20/01/2025', 2.65],
    ['21/01/2025', 3.76],
    ['22/01/2025', 1.08],
    ['23/01/2025', 0.83],
    ['24/01/2025', 3.33],
    ['25/01/2025', 6.81],
    ['26/01/2025', 6.16],
    ['27/01/2025', 6.11],
    ['28/01/2025', 1.18],
    ['29/01/2025', 3.19],
    ['30/01/2025', 2.95],
    ['31/01/2025', 4.6]
]

setHeader("Date", 
"Suspended Solid (g/m3)", 
"Volume Auckland (m3)", 
"Total SS Auckland (g)",  
"Volume Whakapapa (m3)", 
"Total SS Whakapapa (g)")

for i in range(len(volume_Auckland)):
    addRow(Suspended_Solid[i][0],
round(Suspended_Solid[i][1], 4),
round(volume_Auckland[i][1], 4),
round(volume_Auckland[i][1]*Suspended_Solid[i][1], 4),
round(volume_Whakapapa[i][1], 4),
round(volume_Whakapapa[i][1]*Suspended_Solid[i][1], 4)
)
    
`

function TableGeneratorDemo()
{

    // State for columns
    const [columns, setColumns] = useState();

    // State for dataSource
    const [dataSource, setDataSource] = useState();

    const { TextArea } = Input;

    const [codeInputAreaValue, setCodeInputAreaValue] = useState('');
    const [scriptOutputValue, setScriptOutputValue] = useState('');
    const [tableDisplay, setTableDisplay] = useState(false);

    // Calculate line numbers dynamically
    const lineNumbers = Array.from(
        { length: Math.max(7, codeInputAreaValue.split('\n').length) },
        (_, index) => index + 1
    );



    return (
        <div
            wrap='wrap'
            style={{
                width: '80%',
                minHeight: '100vh',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '16px',
                justifyContent: 'space-around',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'flex-start', position: 'relative', width: '100%' }}>
                {/* Line numbers */}
                <div
                    style={{
                        position: 'absolute', // Position absolutely within the parent
                        top: 0,
                        left: 0,
                        transform: 'translateX(-100%)',
                        padding: '10px',
                        fontSize: '16px',
                        backgroundColor: 'transparent',
                        borderRight: 'none',
                        textAlign: 'right',
                        fontFamily: 'monospace',
                        lineHeight: '1.5', // Match the line height of TextArea
                        color: '#595959',
                        minWidth: '30px',
                    }}
                >
                    {lineNumbers.map((number) => (
                        <div key={number}>{number}</div>
                    ))}
                </div>
                <TextArea
                    value={codeInputAreaValue}
                    onChange={(e) => setCodeInputAreaValue(e.target.value)}
                    onKeyDown={(e) =>
                    {
                        const textarea = e.target;
                        const start = textarea.selectionStart;
                        const end = textarea.selectionEnd;

                        // Handle Tab for Indentation
                        if (e.key === 'Tab')
                        {
                            e.preventDefault();
                            const indent = '    '; // Use 4 spaces for Python indentation
                            if (e.shiftKey)
                            {
                                // Remove indentation on Shift+Tab
                                const beforeCursor = codeInputAreaValue.substring(0, start);
                                const afterCursor = codeInputAreaValue.substring(end);
                                if (beforeCursor.endsWith(indent))
                                {
                                    const updatedValue = beforeCursor.slice(0, -indent.length) + afterCursor;
                                    setCodeInputAreaValue(updatedValue);
                                    setTimeout(() =>
                                    {
                                        textarea.selectionStart = textarea.selectionEnd = start - indent.length;
                                    });
                                }
                            } else
                            {
                                // Add indentation on Tab
                                const updatedValue =
                                    codeInputAreaValue.substring(0, start) + indent + codeInputAreaValue.substring(end);
                                setCodeInputAreaValue(updatedValue);
                                setTimeout(() =>
                                {
                                    textarea.selectionStart = textarea.selectionEnd = start + indent.length;
                                });
                            }
                        }

                    }}
                    autoSize={{ minRows: 7 }}
                    placeholder="Write your Python code here (e.g., def hello():)"
                    style={{
                        fontFamily: 'monospace',
                        backgroundColor: '#C2C2C2',
                        border: '1px solid #333333',
                        color: '#333333',
                        borderRadius: '4px',
                        padding: '10px',
                        fontSize: '16px',
                        lineHeight: '1.5',
                        overflow: 'auto',
                    }}
                />
            </div>
            <Button
                type="primary"
                style={{
                    marginTop: '16px'
                }}
                onClick={async () =>
                {
                    const result = await processSoftSensorPythonStringWithDataSource(codeInputAreaValue, "tg");

                    if (typeof result === "object" && result !== null)
                    {
                        // If result is an object, set result, columns, dataSource, and display the table
                        setScriptOutputValue(result.result); // Set the result to the state
                        setColumns(result.columns); // Set the table columns
                        setDataSource(result.datasource); // Set the table dataSource
                        setTableDisplay(true); // Display the table
                    } else if (typeof result === "string")
                    {
                        // If result is a string, set it as the script output value
                        setScriptOutputValue(result);
                        setTableDisplay(false);
                    } else
                    {
                        setScriptOutputValue("An unexpected error occurred.");
                    }

                }
                }
            >
                Run Python Code
            </Button>

            <div
                style={{
                    width: '100%',
                    marginTop: '16px',
                    padding: '10px',
                    backgroundColor: '#E8E8E8',
                    border: '1px solid #333333',
                    borderRadius: '4px',
                    color: '#333333',
                    fontFamily: 'Monospace fonts',
                    lineHeight: '1.5',
                    fontSize: '16px',
                    whiteSpace: 'pre-wrap',
                    minHeight: '100px',
                }}
            >
                {scriptOutputValue || 'Your output will appear here...'}
            </div>

            <div style={{ marginTop: '32px' }}>
                {tableDisplay && (
                    <Table
                        bordered
                        pagination={false}
                        columns={columns}
                        dataSource={dataSource}
                        rowClassName="custom-row"
                        scroll={{
                            y: window.innerHeight * 0.5,
                        }}
                        style={{
                            width: window.innerWidth * 0.6,
                        }}
                    />
                )}
            </div>

            <div style={{ marginTop: '170px' }}>
                <h1> # Code example</h1>
                <pre>
                    <code><strong>{codeString}</strong></code>
                </pre>
            </div>


        </div>
    );
};

export default TableGeneratorDemo;
