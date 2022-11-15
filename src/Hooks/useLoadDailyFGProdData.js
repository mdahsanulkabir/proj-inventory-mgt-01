import { useEffect, useState } from 'react';

const useLoadDailyFGProdData = (startDate, endDate) => {
    const [dailyFGProdData, setDailyFGProdData] = useState([]);
    useEffect(()=>{
        fetch(`https://srp-planning.onrender.com/api/getDailyFGProduction/?startDate=${startDate}&endDate=${endDate}`)
        .then(res => res.json())
        .then(data => setDailyFGProdData(data));
    },[]);
    return {
        dailyFGProdData,
    }
};

export default useLoadDailyFGProdData;