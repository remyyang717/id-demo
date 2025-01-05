import React, { useEffect, useState } from 'react';
import { Divider, List, Skeleton, Badge, Card, Input } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import formListData from '../Data/formListData.json';
import { ScheduleOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function FormInfiniteScrollListComponent()
{
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const localData = formListData;

    // First load the first 50 items
    const loadInitialData = () =>
    {
        setData(localData.slice(0, 50));  // Load first 50 items initially
    };

    const loadMoreData = () =>
    {
        if (loading) return;

        setLoading(true);

        // Simulate loading more data by slicing the local data array
        setTimeout(() =>
        {
            setData((prevData) => [
                ...prevData,
                ...localData.slice(prevData.length, prevData.length + 50),
            ]);
            setLoading(false);
        }, 1000); // Simulate a delay
    };

    const handleSearchChange = (e) =>
    {
        setSearchTerm(e.target.value); // Update search term on input change
        setLoading(false); // Stop loading while searching
    };

    useEffect(() =>
    {
        loadInitialData(); // Initial load when the component mounts
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // Filter data based on the search term
    const filteredData = (searchTerm.length >= 1 ? formListData : data).filter((item) =>
        item.formName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div
            id="scrollableDiv"
            style={{
                width: 800,
                overflow: 'auto',
                height: '100vh',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
                paddingTop: '64px',
            }}
        >
            {/* Sticky Search Bar and Count */}
            <div style={{
                position: 'sticky',
                top: -2,
                background: '#eef0f0',
                zIndex: 1000,
                paddingTop: 16,
                paddingBottom: 16,
                paddingLeft: 16,
            }}>
                <Input
                    style={{
                        width: 740,
                        marginBottom: 16,
                        fontWeight: 'bold',
                        fontSize: 50,
                    }}
                    addonBefore={<SearchOutlined />}
                    placeholder="Search by form name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    size="large"
                    allowClear
                />

                {/* Display the count of displayed items */}
                <div style={{ marginBottom: 16 }}>
                    <strong>{filteredData.length} / {localData.length}</strong> items displayed
                </div>
            </div>
            <InfiniteScroll
                dataLength={filteredData.length} // Use filtered data length
                next={loadMoreData}
                hasMore={filteredData.length < localData.length}
                loader={
                    loading && (
                        <Skeleton
                            paragraph={{
                                rows: 2,
                            }}
                            active
                        />
                    )
                }
                endMessage={<Divider plain>End</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={filteredData} // Use filtered data
                    renderItem={(item) => (
                        <List.Item key={item.formId}>
                            <Badge.Ribbon
                                text={<span style={{ color: item.status === 'Active' ? '#7A5449' : '#7D6161' }}><strong>{item.status}</strong> </span>}
                                color={item.status === 'Active' ? '#19FAB6' : '#D3D3D3'}
                            >
                                <Link to={item.link} style={{ display: 'block', width: '100%', height: '100%' }}>
                                    <Card
                                        hoverable
                                        title={
                                            <div style={{
                                                display: 'block',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'normal',
                                                lineHeight: '1.2em',
                                                maxHeight: '2.4em',
                                                paddingRight: '40px',
                                                marginTop: '5px',
                                            }}>

                                                {item.formName}
                                            </div>}
                                        style={{ width: 740 }}
                                    >

                                        <div style={{
                                            display: 'block',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'normal',
                                            lineHeight: '1.2em',
                                            maxHeight: '3.6em',
                                            paddingRight: '40px',
                                        }}>

                                            {item.formAbout}
                                        </div>

                                        {
                                            (() =>
                                            {
                                                if (item.scheduled === true)
                                                {
                                                    if (item.critical)
                                                    {
                                                        return <ScheduleOutlined style={{
                                                            position: 'absolute',
                                                            top: '50%',
                                                            right: '0',
                                                            padding: '10px',
                                                            fontSize: '2.5em',
                                                            color: '#FA4A19'
                                                        }} />;
                                                    } else
                                                    {
                                                        return <ScheduleOutlined style={{
                                                            position: 'absolute',
                                                            top: '50%',
                                                            right: '0',
                                                            padding: '10px',
                                                            fontSize: '2.5em',
                                                        }} />;
                                                    }
                                                }
                                            })()
                                        }

                                    </Card>
                                </Link>

                            </Badge.Ribbon>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div >
    );
}

export default FormInfiniteScrollListComponent;
