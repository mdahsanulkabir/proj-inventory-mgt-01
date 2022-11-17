import { useState } from "react";

const Counter = ({ render }) => {
    const [ myCount, setMyCount] = useState(0)

    const myIncreaseCount = () => {
        setMyCount( myCount + 1 )
    }
    return (
        render(myCount, myIncreaseCount)
    );
};

export default Counter;