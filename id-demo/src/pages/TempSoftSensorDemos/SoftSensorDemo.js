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

    // Check if global or dangerous commands are used
    function checkGlobalInString(inputString)
    {
        const globalPattern = /\bglobal\b/i;
        const dangerousPatterns = [/\beval\b/i, /\bFunction\b/i, /\bsetTimeout\b/i, /\bsetInterval\b/i];

        if (globalPattern.test(inputString))
        {
            throw new Error("Usage of 'global' is not allowed.");
        }

        dangerousPatterns.forEach((pattern) =>
        {
            if (pattern.test(inputString))
            {
                throw new Error("Dangerous function usage detected (eval/Function/setTimeout/setInterval).");
            }
        });

        console.log("No dangerous commands detected. Code is safe.");
    }

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

    const codeString = `
# Test for loop without break
def test_for_loop():
    print("Testing for loop:")
    for i in range(5):  # Loop runs 5 times
        print(f"i = {i}")

test_for_loop()


# Test while loop without break
def test_while_loop():
    print("\\nTesting while loop:")
    i = 0
    while i < 5:  # Loop runs 5 times
        print(f"i = {i}")
        i += 1  # Ensure the loop progresses

test_while_loop()


# Test recursive call without break
def test_recursive_function(i=0):
    if i >= 5:  # Base case to stop recursion after 5 iterations
        return
    print(f"Recursive call {i}")
    test_recursive_function(i + 1)  # Recursive call

test_recursive_function()
`;

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

            <Divider style={{ marginTop: 36 }} orientation="mid">Script Input Area</Divider>


            <TextArea
                value={codeInputAreaValue}
                onChange={(e) => setCodeInputAreaValue(e.target.value)}
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

                        const loopLimit = 70000;

                        // Define the function at the beginning
                        let processedCode = `maxLoopCount_d3xqZl91 = 0
maxLoopLimit_wpLk7gXv = ${loopLimit}

def check_loop_limit():
    global maxLoopCount_d3xqZl91
    maxLoopCount_d3xqZl91 += 1
    if maxLoopCount_d3xqZl91 > maxLoopLimit_wpLk7gXv:
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

                            // If the line contains a 'for' loop or 'while' loop, insert check_loop_limit() on the next line with the same indent
                            if (line.trim().startsWith("for ") || line.trim().startsWith("while "))
                            {
                                outputLines.push(' '.repeat(indentLevel + 4) + "check_loop_limit()");
                            }
                        });

                        // Join the modified lines into the final output
                        let modifiedCode = outputLines.join('\n');

                        checkGlobalInString(modifiedCode);

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
            <div style={{ marginTop: '170px' }}>
                <h1>Test for Loop, While Loop, and Recursion</h1>
                <pre>
                    <code><strong>{codeString}</strong></code>
                </pre>
            </div>
            <div style={{
                marginTop: 100,
                fontSize: 20
            }}>
                <h2 style={{ color: '#333' }}>User Code Execution Limitations</h2>
                <p style={{ color: '#555' }}>
                    To ensure security and system stability, the following actions are <strong>not allowed</strong>:
                </p>
                <ul style={{ color: '#555' }}>
                    <li><strong>Global Variables</strong>: Do not use <code>global</code> to modify global variables.</li>
                    <li><strong>Dangerous Functions</strong>: Avoid using <code>eval()</code>, <code>Function()</code>, <code>setTimeout()</code>, <code>setInterval()</code>, <code>XMLHttpRequest</code>, and <code>WebSocket</code>.</li>
                    <li><strong>Excessive Recursion</strong>: Recursion depth is limited to avoid stack overflow.</li>
                    <li><strong>Sensitive Objects</strong>: Do not access or modify <code>window</code>, <code>document</code>, or <code>localStorage</code>.</li>
                    <li><strong>Dynamic Code Execution</strong>: Dynamic code execution via <code>eval</code> or <code>Function</code> is prohibited.</li>
                </ul>
                <h4 style={{ color: '#333' }}>Consequences</h4>
                <p style={{ color: '#555' }}>
                    Violations will result in immediate error reporting and code termination.
                </p>
            </div>
        </div >
    );
}

export default SoftSensorDemo;
