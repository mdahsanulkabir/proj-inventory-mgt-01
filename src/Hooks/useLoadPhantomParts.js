import { useEffect, useState } from 'react';

const useLoadPhantomParts = () => {
    const [phantomParts, setPhantomParts] = useState([]);
    useEffect(()=>{
        fetch(`http://localhost:5000/api/getPhantomParts`)
        .then(res => res.json())
        .then(data => setPhantomParts(data));
    },[]);
    return {
        phantomParts,
    }
};

export default useLoadPhantomParts;