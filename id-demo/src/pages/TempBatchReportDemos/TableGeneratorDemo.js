import React from 'react';

import { Table } from 'antd';

const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
    {
        key: '3',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
    {
        key: '4',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
    {
        key: '4',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
    {
        key: '4',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    }
];

const columns = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'address',
        dataIndex: 'address',
        key: 'address',
    }
];




function TableGeneratorDemo()
{


    return (
        <>

            <Table
                bordered
                pagination={false}
                columns={columns}
                dataSource={dataSource}
                scroll={{
                    y: window.innerHeight * 0.6,
                }
                }
                style={{
                    width: window.innerWidth * 0.6,
                }}

            />


        </>
    );
};

export default TableGeneratorDemo;
