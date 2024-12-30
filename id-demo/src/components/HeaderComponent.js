import React, { useState } from 'react';
import { Drawer, List, Flex } from 'antd';
import
{
    EnvironmentOutlined,
    BlockOutlined
} from '@ant-design/icons';






function HeaderComponent()
{
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const showLoading = () =>
    {
        setOpen(true);
        setLoading(true);

        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() =>
        {
            setLoading(false);
        }, 400);
    };


    const [locationText, setLocationText] = useState("Auckland");
    const handleLocationClick = (location) =>
    {
        setLocationText(location); // Update the Button text with the selected location
        setOpen(false); // Close the Drawer
    };




    return (
        <>
            <Flex>
                <Flex>
                    <svg className="id_icon_left_top" data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg" width="1000.17" height="1000.17"
                        viewBox="0 0 1000.17 1000.17">
                        <path
                            d="m500.09,0c-26.59,0-52.67,2.11-78.14,6.11v314.98c23.94-10.47,50.34-16.36,78.14-16.36,107.89,0,195.34,87.45,195.34,195.35s-87.45,195.35-195.34,195.35c-27.8,0-54.2-5.9-78.14-16.36v314.99c25.46,4,51.55,6.12,78.14,6.12,276.2,0,500.08-223.9,500.08-500.09S776.29,0,500.09,0Z"
                            style={{ fill: '#fefefe', strokeWidth: 0 }}></path>
                        <path
                            d="m0,500.08c0,206.88,125.62,384.39,304.74,460.47V382.87H13.88C4.84,420.47,0,459.7,0,500.08Z"
                            style={{ fill: 'rgb(254, 254, 254)', strokeWidth: 0 }}></path>
                        <path d="m304.74,39.6C180.24,92.49,81.64,194.4,33.05,321.1h271.69V39.6Z"
                            style={{ fill: 'rgb(254, 254, 254)', strokeWidth: 0 }}></path>

                    </svg>

                    <a
                        style={{
                            color: '#fefefe',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            marginRight: '64px'
                        }}>
                        Lutra</a>
                </Flex>
                <button
                    className='HeaderPrimary-Button'>
                    <EnvironmentOutlined style={{
                        color: 'gray',
                        fontSize: '1.5em',
                        marginRight: '8px'
                    }} />
                    <a

                        onClick={showLoading}
                        style={{
                            color: '#fefefe',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            marginRight: '16px'
                        }}>
                        {locationText}
                    </a>
                </button>
                <button
                    className='HeaderPrimary-Button'>
                    <BlockOutlined style={{
                        color: 'gray',
                        fontSize: '24px',
                        marginRight: '8px'
                    }} />
                    <a

                        // onClick={showLoading}
                        style={{
                            color: '#fefefe',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            marginRight: '16px'
                        }}>
                        Alarms
                    </a>
                </button>
            </Flex>





            <Drawer
                getContainer={() => document.getElementById('drawer-container')}
                title="Pick Location"
                placement="left"
                closable={false}
                loading={loading}
                onClose={() => setOpen(false)}
                open={open}
            >
                <List
                    itemLayout="horizontal">

                    <List.Item>
                        <button onClick={() => handleLocationClick('Auckland')}>Auckland</button>
                    </List.Item>

                    <List.Item>
                        <button onClick={() => handleLocationClick('Wellington')}>Wellington</button>
                    </List.Item>

                    <List.Item>
                        <button>Christchurch</button>
                    </List.Item>

                    <List.Item>
                        <button>Hamilton</button>
                    </List.Item>

                    <List.Item>
                        <button>Dunedin</button>
                    </List.Item>

                    <List.Item>
                        <button>Tauranga</button>
                    </List.Item>

                    <List.Item>
                        <button>Napier</button>
                    </List.Item>

                    <List.Item>
                        <button>Palmerston North</button>
                    </List.Item>

                    <List.Item>
                        <button>Queenstown</button>
                    </List.Item>

                    <List.Item>
                        <button>Rotorua</button>
                    </List.Item>

                    <List.Item>
                        <button>Invercargill</button>
                    </List.Item>

                    <List.Item>
                        <button>Whangarei</button>
                    </List.Item>

                    <List.Item>
                        <button>New Plymouth</button>
                    </List.Item>

                    <List.Item>
                        <button>Gisborne</button>
                    </List.Item>

                    <List.Item>
                        <button>Timaru</button>
                    </List.Item>

                    <List.Item>
                        <button>Whanganui</button>
                    </List.Item>

                    <List.Item>
                        <button>Bluff</button>
                    </List.Item>

                    <List.Item>
                        <button>Masterton</button>
                    </List.Item>

                    <List.Item>
                        <button>Wanaka</button>
                    </List.Item>

                    <List.Item>
                        <button>Richmond</button>
                    </List.Item>

                    <List.Item>
                        <button>Nelson</button>
                    </List.Item>

                    <List.Item>
                        <button>Tokoroa</button>
                    </List.Item>

                    <List.Item>
                        <button>Te Awamutu</button>
                    </List.Item>

                    <List.Item>
                        <button>Whitianga</button>
                    </List.Item>

                    <List.Item>
                        <button>Kawerau</button>
                    </List.Item>

                    <List.Item>
                        <button>Reefton</button>
                    </List.Item>

                    <List.Item>
                        <button>Oamaru</button>
                    </List.Item>

                    <List.Item>
                        <button>Hastings</button>
                    </List.Item>

                    <List.Item>
                        <button>Alexandra</button>
                    </List.Item>

                    <List.Item>
                        <button>Te Puke</button>
                    </List.Item>

                    <List.Item>
                        <button>Feilding</button>
                    </List.Item>

                    <List.Item>
                        <button>Paeroa</button>
                    </List.Item>

                    <List.Item>
                        <button>Balclutha</button>
                    </List.Item>

                    <List.Item>
                        <button>Hokitika</button>
                    </List.Item>

                    <List.Item>
                        <button>Martinborough</button>
                    </List.Item>

                    <List.Item>
                        <button>Otaki</button>
                    </List.Item>

                    <List.Item>
                        <button>Shannon</button>
                    </List.Item>

                    <List.Item>
                        <button>Kaikoura</button>
                    </List.Item>

                    <List.Item>
                        <button>Huruwhenua</button>
                    </List.Item>

                    <List.Item>
                        <button>Cambridge</button>
                    </List.Item>

                    <List.Item>
                        <button>Rangiora</button>
                    </List.Item>

                    <List.Item>
                        <button>Waiuku</button>
                    </List.Item>

                    <List.Item>
                        <button>Kaitangata</button>
                    </List.Item>

                    <List.Item>
                        <button>Akaroa</button>
                    </List.Item>

                    <List.Item>
                        <button>Ngatea</button>
                    </List.Item>

                    <List.Item>
                        <button>Levin</button>
                    </List.Item>

                    <List.Item>
                        <button>Wairoa</button>
                    </List.Item>

                    <List.Item>
                        <button>Pahiatua</button>
                    </List.Item>

                    <List.Item>
                        <button>Coromandel</button>
                    </List.Item>

                </List>



            </Drawer>
        </>


    );
}

export default HeaderComponent;
