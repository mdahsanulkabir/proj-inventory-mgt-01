
const HoverCountProp = ( { count2, increaseCount2 } ) => {
    return (
        <h1 onMouseOver={increaseCount2}> Hovered {count2} times</h1>
    );
};

export default HoverCountProp;