// LeftSiderComponent.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FormInfiniteScrollListComponent from './FormInfiniteScrollListComponent'






function LeftSiderComponent()
{

    const moduleContent = {
        Forms: (
            <FormInfiniteScrollListComponent />
        ),
        // Add more modules as needed
    };




    // Default to an unknown page if no match
    const moduleName = useSelector((state) => state.moduleValue.value);
    const content = moduleContent[moduleName] || <div><h2>Unknown Page</h2></div>;

    return (
        <>
            <div className="trigger-bar"
                style={{
                    background: ' #e1e5e5',
                    position: 'absolute',
                    top: 0,
                    left: '100%',
                    height: '100%',
                    width: '32px',
                    cursor: 'pointer'
                }}></div>

            {content}

        </>
    )
};

export default LeftSiderComponent;
