import { useEffect, useState } from 'react';

const useLoadSKU = () => {
    const [skus, setSkus] = useState([]);
    useEffect(()=>{
        fetch(`http://localhost:5000/skus`)
        .then(res => res.json())
        .then(data => setSkus(data));
    },[]);
    return {
        skus,
    }
};

export default useLoadSKU;