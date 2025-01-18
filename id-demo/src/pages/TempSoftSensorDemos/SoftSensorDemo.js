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

# 7. Inline for and while loops
for i in range(3): print(f"Inline for loop i: {i}")  # Inline for loop
while False: print("This will not execute")  # Inline while loop (never executes)

if 3 > 1: print("Inline if statement")  # Inline if statement

# 8. Nested for and while loops with a condition
for i in range(2):
    for j in range(3):
        while j < 2:
            if i == 1:  # Nested condition inside the loops
                print(f"Nested loop: i={i}, j={j}")
            break  # Exit the while loop

# 9. Nested for loop with break and continue
for i in range(3):
    for j in range(3):
        if j == 2:
            print(f"Breaking inner loop at j={j}")
            break  # Exit the inner loop
        elif j == 1:
            print(f"Continuing inner loop at j={j}")
            continue  # Skip the rest of the inner loop for this iteration
        print(f"Inner loop iteration j={j}")
    print(f"Outer loop iteration i={i}")

# 10. List comprehension with nested for loops
result = [i * j for i in range(3) for j in range(3) if j % 2 == 0]  # Create a list of products where j is even
print("List comprehension result:", result)

# 11. While loop with a condition and break
while True:
    x = 5
    if x == 5:  # Condition to break the loop
        print("Breaking infinite loop")
        break  # Exit the loop

# 12. If-elif-else block
if 4 > 3:
    print("If block")  # This block executes because the condition is true
elif 3 > 2:
    print("Elif block")  # Skipped because the first condition is true
else:
    print("Else block")  # Skipped because one of the above conditions is true

# Inline if-else statement
print("Inline if-else:", "True case" if 3 > 2 else "False case")  # Inline if-else syntax

# 13. Complex nested for and if-else blocks
for i in range(3):
    if i % 2 == 0:  # Outer loop condition
        for j in range(2):
            if j == 1:  # Inner loop condition
                print(f"Nested if: i={i}, j={j}")
            else:  # Inner loop else block
                print(f"Nested else: i={i}, j={j}")
    else:  # Outer loop else block
        print(f"Outer else: i={i}")

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
                        const pyodide = await processSoftSensorPythonStringWithDataSource(codeInputAreaValue, "ss", dataSource);
                        const result = pyodide.runPython("sys.stdout.getvalue()");
                        setScriptOutputValue(result); // Set the result to the state
                    } catch (error)
                    {
                        setScriptOutputValue(`Error: ${error.message}`); // Handle and display any errors
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
