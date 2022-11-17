

const ClickCountProp = ( { count2, increaseCount2 } ) => {
    return (
        <button onClick={increaseCount2}> clicked {count2} times</button>
    );
};

export default ClickCountProp;