// FormDemo1.js
import React from 'react';
import FormDemo from '../../Asset/FormDemo1.jpg'
import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from 'antd'
import { LeftOutlined } from '@ant-design/icons';

function FormDemo1()
{

    const navigate = useNavigate();

    const handleGoBack = () =>
    {
        navigate('/Forms');  // Go back to the previous page
    };
    return (
        <>
            <div
                style={{
                    position: 'sticky',
                    top: 36,
                    right: 36,
                }}>
                <Tooltip
                    title="Back"
                >
                    <Button
                        onClick={handleGoBack}
                        type="primary" shape="circle" icon={<LeftOutlined />} />
                </Tooltip>
            </div>


            <img src={FormDemo} alt='Form Demo' />
        </>
    )
};

export default FormDemo1;