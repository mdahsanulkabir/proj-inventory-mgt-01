import { useEffect, useState } from 'react';

const useLoadWarehouse = () => {
    const [warehouses, setWarehouses] = useState([]);
    useEffect(()=>{
        fetch(`https://srp-planning.onrender.com/api/warehouse`)
        .then(res => res.json())
        .then(data => setWarehouses(data));
    },[]);
    return {
        warehouses,
    }
};

export default useLoadWarehouse;