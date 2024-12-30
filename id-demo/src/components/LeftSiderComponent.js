// LeftSiderComponent.js
import React from 'react';



function LeftSiderComponent()
{


    return (
        <>
            <div class="trigger-bar"
                style={{
                    background: 'linear-gradient(to right, #e1e5e5 50%, transparent 50%)',
                    position: 'absolute',
                    top: 0,
                    left: '100%',
                    height: '100%',
                    width: '64px',
                    cursor: 'pointer'
                }}></div>
            <div class="sider-content"
                style={{
                    padding: '20px'
                }}>
                <ul>
                    <li>菜单项 1</li>
                    <li>菜单项 2</li>
                    <li>菜单项 3</li>
                </ul>
            </div>
        </>
    )
};

export default LeftSiderComponent;
