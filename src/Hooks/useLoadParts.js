import { useEffect, useState } from "react";


const useLoadParts = () => {
    const [parts, setParts] = useState([]);
    useEffect(()=>{
        fetch(`http://localhost:5000/ownParts`)
        .then(res => res.json())
        .then(data => setParts(data));
    },[]);
    return {
        parts,
    }
};

export default useLoadParts;