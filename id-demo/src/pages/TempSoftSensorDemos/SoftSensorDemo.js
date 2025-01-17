// SoftSensorDemo.js
import React, { useState } from 'react';
import { Table, Input, Button, Flex, Divider } from 'antd';

function SoftSensorDemo()
{
    // Initial data source
    const [dataSource, setDataSource] = useState([
        { key: '1', tag: 'PV_1', data: [1, 2, 3, 4, 5, 6, 7] },
    ]);
    const { TextArea } = Input;

    const [codeInputAreaValue, setCodeInputAreaValue] = useState('');
    const [scriptOutputValue, setScriptOutputValue] = useState('');

    // Handle Tag input changes
    const handleTagChange = (key, value) =>
    {
        setDataSource((prev) =>
            prev.map((item) => (item.key === key ? { ...item, tag: value } : item))
        );
    };

    // Handle Data input changes
    const handleDataChange = (key, index, value) =>
    {
        setDataSource((prev) =>
            prev.map((item) =>
                item.key === key
                    ? {
                        ...item,
                        data: item.data.map((d, i) => (i === index ? value : d)),
                    }
                    : item
            )
        );
    };

    // Generate random data for a specific row
    const handleGenerateRandomData = (key) =>
    {
        setDataSource((prev) =>
            prev.map((item) =>
                item.key === key
                    ? {
                        ...item,
                        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 20) + 1),
                    }
                    : item
            )
        );
    };

    // Table columns definition
    const columns = [
        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
            render: (text, record) => (
                <Input
                    value={record.tag}
                    onChange={(e) => handleTagChange(record.key, e.target.value)}
                />
            ),
        },
        ...Array.from({ length: 7 }, (_, index) => ({
            title: `Data ${index + 1}`,
            dataIndex: `data${index}`,
            key: `data${index}`,
            render: (text, record) => (
                <Input
                    type="number"
                    value={record.data[index]}
                    onChange={(e) => handleDataChange(record.key, index, e.target.value)}
                />
            ),
        })),
        {
            title: <Flex>
                Actions
                <Button
                    style={{ marginLeft: 'auto' }}
                    type="primary"
                    shape="circle"
                    onClick={() =>
                    {
                        const newRow = {
                            key: `${dataSource.length + 1}`,
                            tag: `PV_${dataSource.length + 1}`,
                            data: Array(7).fill(''),
                        };
                        setDataSource((prev) => [...prev, newRow]);
                        handleGenerateRandomData(newRow.key)
                    }}
                >
                    +
                </Button>
            </Flex>,
            key: 'actions',
            render: (_, record) => (
                <Button onClick={() => handleGenerateRandomData(record.key)}>
                    Generate Random Data
                </Button>
            ),
        },
    ];



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


            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                bordered
                style={{ width: '100%' }}
            />


            <Divider style={{ marginTop: 36 }}
                orientation="mid">Script Input Area</Divider>


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



                    // // Handle Brackets and Quotes Completion
                    // const pairs = {
                    //     '(': ')',
                    //     '[': ']',
                    //     '{': '}',
                    //     "'": "'",
                    //     '"': '"',
                    // };
                    // if (pairs[e.key])
                    // {
                    //     e.preventDefault();
                    //     const updatedValue =
                    //         codeInputAreaValue.substring(0, start) +
                    //         e.key +
                    //         pairs[e.key] +
                    //         codeInputAreaValue.substring(end);
                    //     setCodeInputAreaValue(updatedValue);
                    //     setTimeout(() =>
                    //     {
                    //         textarea.selectionStart = textarea.selectionEnd = start + 1;
                    //     });
                    // }
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
                    try
                    {
                        // Load Pyodide
                        const pyodide = await window.loadPyodide();

                        pyodide.runPython(`
                import sys
                from io import StringIO
                sys.stdout = StringIO()  # Redirect stdout to capture print output
            `);

                        const loopLimit = 100000;

                        // Define the function at the beginning
                        let processedCode = `maxLoopCount = 0
maxLoopLimit = ${loopLimit}

def check_loop_limit():
    global maxLoopCount
    maxLoopCount += 1
    if maxLoopCount > maxLoopLimit:
        raise RuntimeError("Global loop iteration limit exceeded")
            `;

                        // Generate preScript dynamically from dataSource
                        const preScript = dataSource
                            .map((row) => `${row.tag} = ${JSON.stringify(row.data)}`)
                            .join('\n');

                        // Combine preScript with user's Python code
                        const fullScript = `\n${preScript}\n${codeInputAreaValue}`;
                        let lines = fullScript.split('\n');

                        let outputLines = [];

                        lines.forEach((line, index) =>
                        {
                            let indentLevel = line.match(/^(\s*)/)[0].length;  // Count leading spaces

                            // Add the current line to output
                            outputLines.push(line);

                            // If the line contains a 'for' loop, insert check_loop_limit() on the next line with the same indent
                            if (line.trim().startsWith("for "))
                            {
                                outputLines.push(' '.repeat(indentLevel + 4) + "check_loop_limit()");
                            }
                        });

                        // Join the modified lines into the final output
                        let modifiedCode = outputLines.join('\n');

                        // Execute the combined Python code
                        await pyodide.runPythonAsync(processedCode + modifiedCode);  // Ensure `check_loop_limit()` is defined first

                        const result = pyodide.runPython("sys.stdout.getvalue()");

                        setScriptOutputValue(result); // Set the output to the result
                    } catch (error)
                    {
                        setScriptOutputValue(`Error: ${error.message}`); // Handle any errors
                    }
                }}
            >
                Run Python Code
            </Button>

            <div
                style={{
                    marginTop: '16px',
                    padding: '10px',
                    backgroundColor: '#E8E8E8',
                    border: '1px solid #333333',
                    borderRadius: '4px',
                    color: '#333333',
                    fontFamily: 'Monospace fonts',
                    lineHeight: '1.5',
                    fontSize: '16px',
                    whiteSpace: 'pre-wrap', // Preserve formatting like line breaks
                    minHeight: '100px',
                }}
            >
                {scriptOutputValue || 'Your output will appear here...'}
            </div>
        </div >
    );
};

export default SoftSensorDemo;
