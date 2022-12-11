import { useEffect, useState } from 'react';

const useLoadSFGSourceCategory = () => {
    const [sfgSourceCategories, setSfgSourceCategories] = useState([]);
    useEffect(()=>{
        fetch(`http://localhost:5000/api/getSfgSourceCategory`)
        .then(res => res.json())
        .then(data => setSfgSourceCategories(data));
    },[]);
    return {
        sfgSourceCategories,
    }
};

export default useLoadSFGSourceCategory;