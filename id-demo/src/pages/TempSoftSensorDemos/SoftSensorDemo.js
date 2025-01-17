import React, { useState, useMemo } from 'react';
import { Table, Input, Button, Flex, Divider, notification } from 'antd';
import
{
    RadiusBottomleftOutlined,
    RadiusBottomrightOutlined,
    RadiusUpleftOutlined,
    RadiusUprightOutlined,
} from '@ant-design/icons';

const Context = React.createContext({
    name: 'Default',
});

function SoftSensorDemo()
{
    // Initial data source
    const [dataSource, setDataSource] = useState([
        { key: '1', tag: 'PV1', data: [1, 2, 3, 4, 5, 6, 7] },
    ]);
    const { TextArea } = Input;

    const [codeInputAreaValue, setCodeInputAreaValue] = useState('');
    const [scriptOutputValue, setScriptOutputValue] = useState('');

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) =>
    {
        api[type]({
            message: 'Invalid Input',
            description: <>

                <br />
                The tag cannot be blank (must not be empty or contain only spaces).
                <br />
                The tag cannot start with a number.
                <br />
                The tag can only include letters

            </>,
            placement: 'bottomRight'

        });
    };



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
        // Validate if the value starts with a number
        const isValidTag = !/^\d/.test(value) && /^[a-zA-Z0-9]+$/.test(value);


        if (isValidTag)
        {
            setDataSource((prev) =>
                prev.map((item) =>
                    item.key === key ? { ...item, tag: value } : item
                )
            );
        } else
        {
            // Optionally show a message or reset the value
            openNotificationWithIcon('error')
        }
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
            title: 'Tag (Aa !)',
            dataIndex: 'tag',
            key: 'tag',
            render: (text, record) => (
                <>
                    {contextHolder}
                    <Input
                        value={record.tag}
                        onChange={(e) => handleTagChange(record.key, e.target.value)}
                    />
                </>

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
                            tag: `PV${dataSource.length + 1}`,
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

    //#region codeString (Demo & Test)
    const codeString = `
# Test Python String Operations

# String concatenation
greeting = "Hello"
name = "Python"
message = greeting + " " + name
print("Concatenation:", message)

# String formatting using f-strings
age = 30
formatted_message = f"{name} is {age} years old."
print("Formatted String:", formatted_message)

# Using the join method
words = ["This", "is", "a", "test"]
sentence = " ".join(words)
print("Join Method:", sentence)

# String slicing
text = "Python Programming"
sliced_text = text[0:6]  # Extract 'Python'
print("Sliced String:", sliced_text)

# Checking if a string contains a substring
contains_test = "test" in sentence
print('Contains "test":', contains_test)

# String methods: lower, upper, and title
text = "hello world"
print("Lowercase:", text.lower())
print("Uppercase:", text.upper())
print("Title Case:", text.title())

# String stripping: removing leading/trailing spaces
text_with_spaces = "   Python   "
print("Stripped String:", text_with_spaces.strip())

# Replacing parts of a string
replaced_text = text.replace("hello", "Goodbye")
print("Replaced String:", replaced_text)

# String formatting with placeholders
placeholders_message = "Name: %s, Age: %d" % ("John", 25)
print("Formatted with placeholders:", placeholders_message)

# Raw strings to handle escape sequences
raw_string = r"Path\\to\\directory"
print("Raw String:", raw_string)

# Multiline string
multi_line_string = '''This is a
multi-line
string.'''
print("Multiline String:", multi_line_string)

# Checking if string starts or ends with a specific substring
starts_with_hello = message.startswith("Hello")
ends_with_python = message.endswith("Python")
print("Starts with 'Hello':", starts_with_hello)
print("Ends with 'Python':", ends_with_python)

# String length
length_of_string = len(message)
print("Length of String:", length_of_string)

# String formatting with .format()
formatted_string = "Hello, {}. You are {} years old.".format(name, age)
print("String formatted with .format():", formatted_string)

# String splitting
split_string = sentence.split()
print("Split String:", split_string)

# Escape sequences in strings
escaped_string = "This is a backslash: \"
print("Escaped String:", escaped_string)
`;
    //#endregion

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



                    // Handle Brackets and Quotes Completion
                    const pairs = {
                        '(': ')',
                        '[': ']',
                        '{': '}',
                        "'": "'",
                        '"': '"',
                    };
                    if (pairs[e.key])
                    {
                        e.preventDefault();
                        const updatedValue =
                            codeInputAreaValue.substring(0, start) +
                            e.key +
                            pairs[e.key] +
                            codeInputAreaValue.substring(end);
                        setCodeInputAreaValue(updatedValue);
                        setTimeout(() =>
                        {
                            textarea.selectionStart = textarea.selectionEnd = start + 1;
                        });
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
                            if (line.trim().startsWith("for ")
                                || line.trim().startsWith("while ")
                                || line.trim().startsWith("if ")
                                || line.trim().startsWith("elif ")
                                || line.trim().startsWith("else ")
                            )
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
