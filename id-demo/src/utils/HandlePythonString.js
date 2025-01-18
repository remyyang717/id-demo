// Global loop iteration limit
const loopLimit = 50000;

const TableGeneratorPreString = `
columns_hj3g6fg4 = []
datasource_d5g6r95bf = []

def setHeader(column_names):
    global columns_hj3g6fg4  # Declare the global variable
    
    # Create column definitions
    columns_hj3g6fg4 = [
        {
            "title": name,
            "dataIndex": name.lower(),  # Convert to lowercase for dataIndex
            "key": name.lower(),       # Convert to lowercase for key
        }
        for name in column_names
    ]

def addRow(*args):
    global columns_hj3g6fg4, datasource_d5g6r95bf  # Access global variables

    # Validate the number of arguments matches the number of columns
    if len(args) != len(columns_hj3g6fg4):
        raise ValueError(f"Expected {len(columns_hj3g6fg4)} addRow inputs, but got {len(args)}.")

    # Generate the new data entry
    entry = {"key": str(len(datasource_d5g6r95bf) + 1)}  # Key based on current datasource length
    for column, value in zip(columns_hj3g6fg4, args):
        entry[column["dataIndex"]] = value

    # Append the new entry to the global datasource
    datasource_d5g6r95bf.append(entry)

`




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




// This function executes Python code within the Pyodide environment, dynamically integrating 
// Variables from the provided `dataSource` and adding safeguards for excessive loop iterations.
// DataSource will looks like this  ([{ key: '1', tag: 'PV1', data: [1, 2, 3, 4, 5, 6, 7] },]);
export const processSoftSensorPythonStringWithDataSource = async (pythonString, type, dataSource = null) =>
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


        // Define the function at the beginning
        let maxLoopGuard = `maxLoopCount_d3xqZl91 = 0
maxLoopLimit_wpLk7gXv = ${loopLimit}

def check_loop_limit():
    global maxLoopCount_d3xqZl91
    maxLoopCount_d3xqZl91 += 1
    if maxLoopCount_d3xqZl91 > maxLoopLimit_wpLk7gXv:
        raise RuntimeError("Global loop iteration limit exceeded")
`;

        // Use switch to determine the value of preScript
        const preScript = (() =>
        {
            switch (type)
            {
                case "ss":
                    return dataSource
                        ? dataSource.map((row) => `${row.tag} = ${JSON.stringify(row.data)}`).join('\n')
                        : "";
                case "tg":
                    return TableGeneratorPreString; // Add your code for "tg"
                default:
                    return ""; // Default case
            }
        })();



        let lines = pythonString.split('\n');

        let outputLines = [];

        lines.forEach((line, index) =>
        {
            let indentLevel = line.match(/^(\s*)/)[0].length;  // Count leading spaces

            // Add the current line to output
            outputLines.push(line);

            // If the line contains a 'for' loop or 'while' loop, insert check_loop_limit() on the next line with the same indent
            if ((line.trim().startsWith("for ") && line.trim().endsWith(":"))
                || (line.trim().startsWith("while ") && line.trim().endsWith(":"))
            )
            {
                outputLines.push(' '.repeat(indentLevel + 4) + "check_loop_limit()");
            }
        });

        // Join the modified lines into the final output
        let modifiedCode = outputLines.join('\n');

        checkGlobalInString(modifiedCode);

        // Execute the combined Python code
        await pyodide.runPythonAsync(maxLoopGuard + preScript + modifiedCode);  // Ensure `check_loop_limit()` is defined first

        return pyodide;
    }
    catch (error)
    {
        return `Error: ${error.message}`; // Handle any errors
    }
};
