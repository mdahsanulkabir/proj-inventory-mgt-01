import { useEffect, useState } from "react";


const useLoadParts = () => {
    const [parts, setParts] = useState([]);
    useEffect(()=>{
        fetch(`https://srp-planning.onrender.com/api/rms`)
        .then(res => res.json())
        .then(data => setParts(data));
    },[]);
    return {
        parts,
    }
};

export default useLoadParts;