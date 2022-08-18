import React from 'react';
import logo1 from "./singer-logo (1).png"
import logo2 from "./arcelik-1-logo-png-transparent.png"


const Footer = () => {
    return (
        <div className='container' style={{display:"flex"}}>
            <h1>Singer Bangladesh Limited</h1>
            <img style={{marginLeft: "auto", width: "100px"}} src={logo1} alt="Singer Logo" />
            <img style={{width: "100px"}} src={logo2} alt="Arcelik Logo" />
        </div>
    );
};

export default Footer;