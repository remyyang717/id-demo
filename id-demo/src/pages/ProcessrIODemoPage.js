//ProcessrIODemoPage.js
import React from 'react';
import { Flex } from 'antd';
import LineGraphComponent from '../Components/Graphs/LineGraphComponent'


function GetProcessrIOData(deviceId, dataTag)
{

    var myHeaders = new Headers();
    myHeaders.append("X-Api-Key", "0hcVBe9ED0iZYHhxrmNT_Q"); // Provide your Processr.IO API key here
    myHeaders.append("Content-Type", "application/json");

    // The query payload
    var raw = JSON.stringify({
        "names": [
            dataTag
        ],
        "format": 2
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    // Enter the device Id here
    var deviceId = deviceId;

    fetch("https://api.nz.processr.io/api/v1/DataPoints/byDeviceId/" + deviceId, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}






function ProcessrIODemoPage()
{




    return (
        <>
            <Flex wrap
                height='100%'
            >

                <button onClick={GetProcessrIOData(746, "Device Battery Voltage")}>
                    Get
                </button>
            </Flex>


        </>
    )
};

export default ProcessrIODemoPage;