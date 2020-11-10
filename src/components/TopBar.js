import React, { useEffect, useState } from 'react';
import Clock from 'react-clock';
 


const TopBar = (props) => {

    const [value, setValue] = useState(new Date());

    useEffect(() => {
    const interval = setInterval(
        () => setValue(new Date()),
        1000
    );

    return () => {
        clearInterval(interval);
    }
    }, []);

    return (
        <React.Fragment>
        <div className="top-bar"> 
            <img src='./plain-logo.png' alt='logo'/>   
            <div className="clock-holder" >
            
            <Clock value={value} className="clock"/>
            
            </div>
            <h3>{new Date().toString().substring(0,25)}</h3>  
        </div>
        </React.Fragment>
    );
}





  
export default TopBar;