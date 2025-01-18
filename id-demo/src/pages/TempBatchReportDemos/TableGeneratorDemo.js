import React, { useState } from 'react';
import { Table, Input, Button } from 'antd';
import { processSoftSensorPythonStringWithDataSource } from '../../utils/HandlePythonString'



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

            <div>
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




        </div>
    );
};

export default TableGeneratorDemo;
