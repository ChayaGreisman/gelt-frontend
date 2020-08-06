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
        <div className="top-bar">
            <div className="clock-holder">
            <Clock value={value} className="clock"/>
            </div>
            <h1>{new Date().toString().substring(0,25)}</h1>
            <h1>Hi User! </h1>
        </div>
    );
}





  
export default TopBar;