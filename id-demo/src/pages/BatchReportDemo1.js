// BatchReportDemo1.js
import React from 'react';
import { Flex, } from 'antd';
import { Table } from 'antd';



const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        width: 150,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        width: 150,
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];
const dataSource = Array.from({
    length: 100,
}).map((_, i) => ({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
}));


function BatchReportDemo1()
{

    return (
        <>
            <Flex wrap>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    scroll={{
                        y: window.innerHeight * 0.5,
                    }}
                    style={{
                        width: window.innerWidth * 0.3,

                    }}

                />

            </Flex>


        </>
    )
};

export default BatchReportDemo1;