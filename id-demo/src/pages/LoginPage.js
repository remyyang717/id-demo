import React, { useState } from 'react';
import { Button, Input, Space, Tooltip, Checkbox, Switch, notification, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, QuestionCircleOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

const { Link } = Typography;

function LoginPage()
{
    const [videoSrc, setVideoSrc] = useState("/bg1.mp4");
    const navigate = useNavigate();

    const [showSVG, setShowSVG] = useState(false);
    const toggleSVG = () =>
    {
        setShowSVG((prev) => !prev); // 切换状态
    };

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement) =>
    {
        api.info({
            message: `Set a New Password`,
            description: 'You will receive an email to reset your password',
            placement,
        });
    };


    const handleButtonClick = () =>
    {
        navigate("/Home");
    };

    const onBackGroudChange = (checked) =>
    {
        setVideoSrc(checked ? "/bg2.mp4" : "/bg1.mp4");
        console.log(videoSrc);

    };

    return (
        <>

            {/* <Link to="/Home">Login</Link> */}
            <div style={{ position: "relative" }}>
                <Switch
                    style={{ zIndex: 9, }}
                    onChange={onBackGroudChange} />
                <Switch
                    style={{ zIndex: 9, }}
                    onChange={toggleSVG} />

                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 0,
                    backgroundColor: "rgba(4, 47, 85, 0.2)",
                }}>
                    {showSVG &&
                        <svg style={{
                            position: "fixed",
                            top: "50%", // Center vertically
                            left: "50%", // Center horizontally
                            width: "180%",
                            height: "180%",
                            transform: "translate(-50%, -50%)",
                            opacity: 0.05
                        }}
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
                    }
                </div>
                <video
                    key={videoSrc}
                    autoPlay
                    muted
                    loop
                    style={{
                        position: "fixed",
                        top: "50%", // Center vertically
                        left: "50%", // Center horizontally
                        width: "100%",
                        height: "100%",
                        zIndex: -1,
                        objectFit: "cover",
                        transform: "translate(-50%, -50%)",
                    }}>
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="login-container"
                    style={{
                        position: "fixed",
                        zIndex: 1,
                        color: "white",
                        textAlign: "center",
                        fontFamily: "Arial, sans-serif",
                        top: "35%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        // backgroundColor: "rgba(24, 64, 98,0.7)",
                        borderRadius: 15,
                        padding: 20

                    }}>

                    <Space direction="vertical">
                        <p style={{
                            fontWeight: 100,
                            fontSize: '5rem',
                            margin: '0 0 2rem 0'
                        }}
                        >Infrastructure Data</p>

                        <Input
                            allowClear
                            type="text"
                            id="username"
                            name="username"
                            style={{
                                width: 350,
                                fontSize: "1.1rem",
                                margin: '10px 20px 10px 20px'
                            }}
                            placeholder="Email Address"
                            prefix={
                                <UserOutlined
                                    style={{
                                        marginRight: 10, color: 'rgba(0,0,0,.25)'
                                    }} />}
                            suffix={
                                <Tooltip placement='right' title="Remember Me">
                                    <Checkbox
                                        style={{
                                            position: "relative"
                                        }}
                                    />

                                </Tooltip>
                            }
                        />
                        <Input.Password
                            type="password"
                            id="pass"
                            name="password"
                            prefix={<SafetyCertificateOutlined style={{ marginRight: 10, color: 'rgba(0,0,0,.25)' }} />}
                            style={{
                                width: 350,
                                fontSize: "1.1rem",
                                margin: '10px 20px 10px 20px'
                            }}
                            placeholder="Password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            allowClear
                        />


                        {/* onClick={handleButtonClick} */}

                        <div style={{ width: 180, display: 'inline' }} >


                            <Button
                                onClick={handleButtonClick}
                            >
                                &emsp; &emsp;Log Me In &emsp; &emsp;
                            </Button>

                            <Tooltip
                                placement='bottom'
                                title={

                                    <Link onClick={() => openNotification('bottomLeft')}> {contextHolder} Forgotten your password?</Link>
                                }>
                                <QuestionCircleOutlined
                                    style={{
                                        color: 'rgb(2, 85, 163)',
                                        fontSize: '1rem',
                                        transform: "translate(-150%, 0)",
                                    }} />
                            </Tooltip>
                        </div>



                    </Space>

                </div >
            </div >

        </>

    );
};
export default LoginPage;