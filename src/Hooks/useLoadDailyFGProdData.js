import { useEffect, useState } from 'react';

const useLoadDailyFGProdData = (startDate, endDate) => {
    const [dailyFGProdData, setDailyFGProdData] = useState([]);
    useEffect(()=>{
        fetch(`http://localhost:5000/api/getDailyFGProduction/?startDate=${startDate}&endDate=${endDate}`)
        .then(res => res.json())
        .then(data => setDailyFGProdData(data));
    },[]);
    return {
        dailyFGProdData,
    }
};

export default useLoadDailyFGProdData;