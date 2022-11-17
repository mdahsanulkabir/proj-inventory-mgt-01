import React from 'react';
import withCounter2 from './withCounter2';

const ClickCounter2 = ({ count, incrementCount }) => {
    return (
        <div>
            <button style={{width : "250px"}} onClick={incrementCount}>count value is-{count}</button>
        </div>
    );
};

export default withCounter2(ClickCounter2);