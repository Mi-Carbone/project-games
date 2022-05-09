//import React from 'react'
import * as React from 'react';

import useStateWithCallback from 'use-state-with-callback';

const TestSetStateCallBack = () => {
    const [count, setCount] = useStateWithCallback(0, currentCount => {
        console.log('render, then callback.');
        console.log( currentCount)
        // if (currentCount > 1) {
        //     console.log('Threshold of over 1 reached.');
        // } else {
        //     console.log('No threshold reached.');
        // }
    });

    const handleClick = () =>{
        setCount(count + 1)
    };

    return (
        <div>
            {count}

            <button type="button" onClick={handleClick}>
                Increase
            </button>
        </div>
    );
};

export default TestSetStateCallBack;