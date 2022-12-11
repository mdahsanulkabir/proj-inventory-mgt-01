import { useEffect, useState } from 'react';

const useLoadSFGCategory = () => {
    const [sfgCategories, setSfgCategories] = useState([]);
    useEffect(()=>{
        fetch(`http://localhost:5000/api/getSfgCategory`)
        .then(res => res.json())
        .then(data => setSfgCategories(data));
    },[]);
    return {
        sfgCategories,
    }
};

export default useLoadSFGCategory;