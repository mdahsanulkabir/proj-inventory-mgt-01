import { useEffect, useState } from 'react';

const useLoadSFGBOM = () => {
    const [sfgBOMs, setSFGBOMs] = useState([]);
    useEffect(()=>{
        fetch(`http://localhost:5000/api/sfgBOM`)
        .then(res => res.json())
        .then(data => setSFGBOMs(data));
    },[]);
    return {
        sfgBOMs,
    }
};

export default useLoadSFGBOM;