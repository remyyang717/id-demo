import React, { useState } from 'react';
import { Table, Input, Button, Flex, Divider, notification } from 'antd';
import { processSoftSensorPythonStringWithDataSource } from '../../utils/HandlePythonString'



function SoftSensorDemo()
{
    // Initial data source
    const [dataSource, setDataSource] = useState([
        { key: '1', tag: 'PV1', data: [1, 2, 3, 4, 5, 6, 7] },
    ]);
    const { TextArea } = Input;

    const [codeInputAreaValue, setCodeInputAreaValue] = useState('print(PV1)');
    const [scriptOutputValue, setScriptOutputValue] = useState('');

    // Calculate line numbers dynamically
    const lineNumbers = Array.from(
        { length: Math.max(7, codeInputAreaValue.split('\n').length) },
        (_, index) => index + 1
    );


    const [api, contextHolder] = notification.useNotification();
    const openTagNotification = (type) =>
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

    const openDatagNotification = (type) =>
    {
        api[type]({
            message: 'Invalid Input',
            description:
                <>
                    Data can not be empty.
                    <br />
                    Value is replaced with 0.
                </>,
            placement: 'bottomRight'

        });
    };


    // Handle Tag 
    const handleTagChange = (key, value) =>
    {
        setDataSource((prev) =>
            prev.map((item) =>
                item.key === key ? { ...item, tag: value } : item
            )
        );
    };

    const handleTagBlur = (key, value) =>
    {
        // Validate if the value starts with a number
        const isValidTag = !/^\d/.test(value) && /^[a-zA-Z0-9]+$/.test(value);

        if (!isValidTag)
        {
            setDataSource((prev) =>
                prev.map((item) =>
                    item.key === key ? { ...item, tag: "PV" + key } : item
                )
            );

            openTagNotification('error')
        }
    };

    // Handle Data input
    const handleDataChange = (key, index, value) =>
    {
        setDataSource((prev) =>
            prev.map((item) =>
                item.key === key
                    ? {
                        ...item,
                        data: item.data.map((d, i) =>
                            i === index
                                ? value.trim() === ""
                                    ? null
                                    : Number(value)
                                : d
                        ),
                    }
                    : item
            )
        );

    };

    const handleDataBlur = (key, index, value) =>
    {

        const isValidNumber = isFinite(value) && value.trim() != ""
        if (!isValidNumber)
        {
            setDataSource((prev) =>
                prev.map((item) =>
                    item.key === key
                        ? {
                            ...item,
                            data: item.data.map((d, i) =>
                                i === index
                                    ? 0
                                    : d
                            ),
                        }
                        : item
                )
            );


            openDatagNotification('error');
        }
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
                        onBlur={(e) => handleTagBlur(record.key, e.target.value)}
                    />
                </>

            ),
        },
        ...Array.from({ length: 7 }, (_, index) => ({
            title: `Data ${index + 1}`,
            dataIndex: `data${index}`,
            key: `data${index}`,
            render: (text, record) => (
                <>
                    {contextHolder}
                    <Input
                        type="number"
                        value={record.data[index]}
                        onChange={(e) => handleDataChange(record.key, index, e.target.value)}
                        onBlur={(e) => handleDataBlur(record.key, index, e.target.value)}
                    />
                </>

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
# Average
average = sum(PV1) / len(PV1)
print("Average:", average)

# Sum
total = sum(PV1)
print("Sum:", total)

# Min and Max
minimum = min(PV1)
maximum = max(PV1)
print("Min:", minimum)
print("Max:", maximum)

# Length
length = len(PV1)
print("Length:", length)

# Loop through the list
print("Loop through the list:")
for num in PV1:
    print(num)

# Filter even numbers
even_numbers = [num for num in PV1 if num % 2 == 0]
print("Even numbers:", even_numbers)

# Square each number
squared_numbers = [num ** 2 for num in PV1]
print("Squared numbers:", squared_numbers)

# Check if a number is in the list
if 4 in PV1:
    print("4 is in the list.")
else:
    print("4 is not in the list.")

# Sort the list
sorted_list = sorted(PV1)  # default ascending
print("Sorted (ascending):", sorted_list)

sorted_desc = sorted(PV1, reverse=True) 
print("Sorted (descending):", sorted_desc)



# 1. Simple for loop
for i in range(3):  # Iterate from 0 to 2
    print(f"Simple for loop i: {i}")

# 2. Simple while loop
x = 0
while x < 3:  # Loop while x is less than 3
    print(f"Simple while loop x: {x}")
    x += 1  # Increment x

# 3. Simple recursion
def factorial(n):  # Define a recursive func to calculate factorial
    if n == 0:
        return 1  # Base case: factorial of 0 is 1
    else:
        return n * factorial(n - 1)  # Recursive case

print("Factorial of 5:", factorial(5))  # Call the func and print the result

# 4. Nested for loop with a while loop inside
for i in range(3):
    print(f"Outer loop i: {i}")  # Print the current index of the outer loop
    for j in range(2):
        print(f"  Inner loop j: {j}")  # Print the current index of the inner loop
        while j < 1:
            print(f"    While loop j: {j}")  # While loop condition inside the nested loop
            break  # Exit the while loop after one iteration

# 5. For loop with an if-else block
for i in range(5):
    if i % 2 == 0:  # Check if the number is even
        print(f"Even number: {i}")
    else:  # Otherwise, it's odd
        print(f"Odd number: {i}")

# 6. While loop with a break condition
while True:
    x = 10
    if x > 5:  # Condition to break the loop
        print("Breaking while loop")
        break  # Exit the infinite loop
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

                    const result = await processSoftSensorPythonStringWithDataSource(codeInputAreaValue, "ss", dataSource);

                    setScriptOutputValue(result); // Set the result to the state

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
            <div style={{ marginTop: '170px' }}>
                <h1>Test for Loop, While Loop, Recursion and more ~</h1>
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
