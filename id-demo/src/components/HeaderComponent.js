import React, { useState } from 'react';
import { Drawer, List, Divider, Input, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setOrgValue } from '../store/orgSlice';
import { setLocationValue } from '../store/locationSlice'
import { setModuleValue } from '../store/moduleSlice'
import { SearchOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';

import
{
    EnvironmentOutlined,
    BlockOutlined
} from '@ant-design/icons';


function HeaderComponent()
{
    const dispatch = useDispatch();

    //#region   Start > Handling Org Change -----------------------------------------------------------------
    const orgName = useSelector((state) => state.orgValue.value);
    const [orgNamePickerOpen, setOrgNamePickerOpen] = React.useState(false);
    const [orgNamePickerloading, setOrgNamePickerLoading] = React.useState(true);
    const [orgSearchQuery, setOrgSearchQuery] = useState("");

    const handleOrgClick = (org) =>
    {
        dispatch(setOrgValue(org));
        setOrgNamePickerOpen(false)
    };

    const showOrgNamePicker = () =>
    {
        setOrgSearchQuery("");
        setOrgNamePickerOpen(true);
        setOrgNamePickerLoading(true);
        setTimeout(() =>
        {
            setOrgNamePickerLoading(false);
        }, 400);
    };

    const organisations = [
        'The Sandpit (Org A)',
        'Auckland Council',
        'BP',
        'Central Hawke\'s Bay District Council',
        'Central Otago District Council',
        'Central Tablelands Water',
        'Composting NZ',
        'Demo Organisation',
        'Demo Organisation *New*',
        'Dunedin City Council',
        'Fonterra',
        'Greater Wellington Regional Council Parks',
        'Hamilton City Council',
        'Hastings District Council',
        'Horowhenua District Council',
        'Hunter H2O',
        'Infrastructure Data',
        'Invercargill City Council',
        'Kaipara DC',
        'Lithgow City Council',
        'Liverpool Plains Shire Council',
        'Lutra Consultancy',
        'Lutra Ltd',
        'Mackenzie District Council',
        'Marlborough District Council',
        'Masterton District Council',
        'Ministry of Education',
        'Mt Isa',
        'Muswellbrook Shire Council',
        'Napier City Council',
        'Nelson City Council',
        'Open Country Dairy',
        'Org B - TESTING FIELD'
    ];

    // Filter the Orgs based on the search query
    const filteredOrgs = organisations.filter(organisation =>
        organisation.toLowerCase().includes(orgSearchQuery.toLowerCase())
    );

    //#endregion    End > Handling Org Change  

    //#region   Start > Handling Location Change ------------------------------------------------------------
    const locationName = useSelector((state) => state.locationValue.value);
    const [locationPickerOpen, setLocationPickerOpen] = React.useState(false);
    const [locationPickerOpenLoading, setLocationPickerOpenLoading] = React.useState(true);
    const [locationSearchQuery, setLocationSearchQuery] = useState("");
    const showLocationLoading = () =>
    {
        setLocationSearchQuery("");
        setLocationPickerOpen(true);
        setLocationPickerOpenLoading(true);

        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() =>
        {
            setLocationPickerOpenLoading(false);
        }, 400);
    };


    const handleLocationClick = (locations) =>
    {
        dispatch(setLocationValue(locations));
        setLocationPickerOpen(false); // Close the Drawer
    };

    const locations = [
        'Auckland',
        'Wellington',
        'Christchurch',
        'Hamilton',
        'Dunedin',
        'Tauranga',
        'Napier',
        'Palmerston North',
        'Queenstown',
        'Rotorua',
        'Invercargill',
        'Whangarei',
        'New Plymouth',
        'Gisborne',
        'Timaru',
        'Whanganui',
        'Bluff',
        'Masterton',
        'Wanaka',
        'Richmond',
        'Nelson',
        'Tokoroa',
        'Te Awamutu',
        'Whitianga',
        'Kawerau',
        'Reefton',
        'Oamaru',
        'Hastings',
        'Alexandra',
        'Te Puke',
        'Feilding',
        'Paeroa',
        'Balclutha',
        'Hokitika',
        'Martinborough',
        'Otaki',
        'Shannon',
        'Kaikoura',
        'Huruwhenua',
        'Cambridge',
        'Rangiora',
        'Waiuku',
        'Kaitangata',
        'Akaroa',
        'Ngatea',
        'Levin',
        'Wairoa',
        'Pahiatua',
        'Coromandel'
    ];


    // Filter the locations based on the search query
    const filteredLocations = locations.filter(location =>
        location.toLowerCase().includes(locationSearchQuery.toLowerCase())
    );

    //#endregion    End > Handling Location Change

    //#region   Start > Handling Modal Change ----------------------------------------------------------------
    const moduleName = useSelector((state) => state.moduleValue.value);
    const [modulePickerOpen, setModulePickerOpen] = React.useState(false);
    const [modulePickerOpenLoading, setModulePickerOpenLoading] = React.useState(true);
    const showModuleLoading = () =>
    {
        setModulePickerOpen(true);
        setModulePickerOpenLoading(true);

        setTimeout(() =>
        {
            setModulePickerOpenLoading(false);
        }, 400);
    };


    const handleModuleClick = (modules) =>
    {
        dispatch(setModuleValue(modules));
        setModulePickerOpen(false); // Close the Drawer
    };

    const modules = [
        'Home',
        'Alarms',
        'Consents',
        'Licences',
        'Dashboards',
        'Devices',
        'Soft Sensors',
        'Forms',
        'Geospatial',
        'Messaging',
        'Sample Manager',
        'Tasks'

    ];
    //#endregion    End > Handling Modal Change



    return (
        <>

            <svg className="id_icon_left_top" data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg" width="1000.17" height="1000.17"
                viewBox="0 0 1000.17 1000.17">
                <path
                    d="m500.09,0c-26.59,0-52.67,2.11-78.14,6.11v314.98c23.94-10.47,50.34-16.36,78.14-16.36,107.89,0,195.34,87.45,195.34,195.35s-87.45,195.35-195.34,195.35c-27.8,0-54.2-5.9-78.14-16.36v314.99c25.46,4,51.55,6.12,78.14,6.12,276.2,0,500.08-223.9,500.08-500.09S776.29,0,500.09,0Z"
                    style={{ fill: '#54F7C6', strokeWidth: 0 }}></path>
                <path
                    d="m0,500.08c0,206.88,125.62,384.39,304.74,460.47V382.87H13.88C4.84,420.47,0,459.7,0,500.08Z"
                    style={{ fill: '#fefefe', strokeWidth: 0 }}></path>
                <path d="m304.74,39.6C180.24,92.49,81.64,194.4,33.05,321.1h271.69V39.6Z"
                    style={{ fill: '#fefefe', strokeWidth: 0 }}></path>

            </svg>

            <a
                onClick={showOrgNamePicker}
                className="scrollable-text"
                style={{
                    color: '#fefefe',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    marginRight: '64px',
                    maxWidth: '280px', // Set the max-width you want
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'inline-block', // Ensure it behaves like an inline element but can have width
                    cursor: 'pointer', // Optional, to indicate interactivity
                }}>
                {/* Display Org Name */}
                {orgName}</a>

            <button
                className='HeaderPrimary-Button'>
                <EnvironmentOutlined style={{
                    color: 'gray',
                    fontSize: '1.5em',
                    marginRight: '8px'
                }} />
                <a
                    onClick={showLocationLoading}
                    style={{
                        color: '#fefefe',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        marginRight: '16px'
                    }}>
                    {locationName}
                </a>
            </button>

            <button
                className='HeaderPrimary-Button'>
                <BlockOutlined style={{
                    color: 'gray',
                    fontSize: '1.7em',
                    marginRight: '8px'
                }} />
                <a

                    onClick={showModuleLoading}
                    style={{
                        color: '#fefefe',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        marginRight: '16px'
                    }}>
                    {moduleName}
                </a>
            </button>

            <div
                style={{ marginLeft: 'auto' }}>

                <Avatar
                    size={38}
                    style={{
                        backgroundColor: '#306CE3',
                        cursor: 'pointer'
                    }}
                    icon={<UserOutlined />}
                />


            </div >






            {/* Location list drawer */}
            < Drawer
                getContainer={() => document.getElementById('location-picker-drawer-container')
                }
                placement="left"
                title="Pick Location"
                closable={false}
                loading={locationPickerOpenLoading}
                onClose={() => setLocationPickerOpen(false)}
                open={locationPickerOpen}
            >
                <Input
                    addonBefore={<SearchOutlined />}
                    className="locationSearchBox"
                    type="text"
                    placeholder="Search locations..."
                    value={locationSearchQuery}
                    onChange={(e) => setLocationSearchQuery(e.target.value)}
                />


                <Divider />


                <List>
                    {filteredLocations.length > 0 ? (
                        filteredLocations.map((location) => (
                            <List.Item key={location}>
                                <a onClick={() => handleLocationClick(location)}><strong>{location}</strong></a>
                            </List.Item>
                        ))
                    ) : (
                        <List.Item>No locations found</List.Item> // If no location matches the query
                    )}
                </List>

            </Drawer >

            {/* Org list drawer */}
            < Drawer
                getContainer={() => document.getElementById('org-picker-drawer-container')
                }
                title="Pick Organisation"
                placement="left"
                closable={false}
                loading={orgNamePickerloading}
                onClose={() => setOrgNamePickerOpen(false)}
                open={orgNamePickerOpen}
            >
                <Input
                    addonBefore={<SearchOutlined />}
                    className="orgSearchBox"
                    type="text"
                    placeholder="Search orgs..."
                    value={orgSearchQuery}
                    onChange={(e) => setOrgSearchQuery(e.target.value)}
                />


                <Divider />

                <List>
                    {filteredOrgs.length > 0 ? (
                        filteredOrgs.map((org) => (
                            <List.Item key={org}>
                                <a onClick={() => handleOrgClick(org)}><strong>{org}</strong></a>
                            </List.Item>
                        ))
                    ) : (
                        <List.Item>No orgs found</List.Item> // If no location matches the query
                    )}
                </List>


            </Drawer >

            {/* Module list drawer */}
            < Drawer
                getContainer={() => document.getElementById('module-picker-drawer-container')}
                title="Pick Module"
                placement="left"
                closable={false}
                loading={modulePickerOpenLoading}
                onClose={() => setModulePickerOpen(false)}
                open={modulePickerOpen}
            >
                <List>
                    {modules.map((module) => (
                        < List.Item key={module} >
                            <Link to={"/" + module} onClick={() => handleModuleClick(module)}>{module}</Link>
                        </List.Item>
                    ))}

                </List>


            </Drawer >
        </>


    );
}

export default HeaderComponent;
