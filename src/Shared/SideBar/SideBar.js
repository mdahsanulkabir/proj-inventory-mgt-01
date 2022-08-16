import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <div>
            <h3>Side bar</h3>
            <Link to="/skuList">SKU LIST</Link>
            <br />
            <Link to="/ownPartList">OWN PART LIST</Link>
        </div>
    );
};

export default SideBar;