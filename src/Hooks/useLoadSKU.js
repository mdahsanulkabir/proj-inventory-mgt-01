import { useEffect, useState } from 'react';

const useLoadSKU = () => {
    const [skus, setSkus] = useState([]);
    useEffect(()=>{
        fetch(`https://srp-planning.onrender.com/api/skus`)
        .then(res => res.json())
        .then(data => setSkus(data));
    },[]);
    return {
        skus
    }
};

export default useLoadSKU;