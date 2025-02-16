import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Divider, List, Skeleton, Badge, Card, Input } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import listData from '../Data/deviceAndSoftSensorListData.json';
import { SearchOutlined } from '@ant-design/icons';
import debounce from 'lodash.debounce';

function SoftSensorInfiniteScrollListComponent()
{
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const localData = listData;

    const scrollContainer = useRef(null);
    const containerRef = useRef(null);

    const scrollToTop = () =>
    {
        if (containerRef.current)
        {
            containerRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

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

    const debouncedSearch = useCallback(
        debounce((value) =>
        {
            setSearchTerm(value);
        }, 300),
        []
    );


    const handleSearchChange = (e) =>
    {
        const value = e.target.value;
        setInputValue(value);

        if (value.length < 3)
        {
            setSearchTerm('');
            debouncedSearch.cancel();
        } else
        {
            debouncedSearch(value);
        }
        setLoading(false);
    };

    useEffect(() =>
    {
        loadInitialData(); // Initial load when the component mounts
        // eslint-disable-next-line react-hooks/exhaustive-deps


        scrollToTop()
    }, [searchTerm]);




    // Filter data based on the search term
    const filteredData = (searchTerm.length >= 1 ? listData : data).filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div
            ref={containerRef}
            id="scrollableDiv"
            style={{
                width: 800,
                overflow: 'auto',
                height: '100vh',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
                paddingTop: '64px',
                overscrollBehavior: 'contain',
                touchAction: 'pan-y',
            }}
        >
            {/* Sticky Search Bar and Count */}
            <div style={{
                position: 'sticky',
                top: -2,
                background: '#eef0f0',
                zIndex: 1000,
                paddingTop: 16,
                paddingBottom: 16
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
                    value={inputValue}
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
                        <List.Item key={item.id}>
                            <Badge.Ribbon
                                text={<span><strong>{item.type}</strong> </span>}
                                color={item.type === 'Device' ? 'green' : 'cyan'}
                            >
                                <Card
                                    hoverable
                                    style={{ width: 740 }} >
                                    {
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

                                            {item.name}
                                        </div>}
                                </Card>
                            </Badge.Ribbon>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div >
    );
}

export default SoftSensorInfiniteScrollListComponent;
