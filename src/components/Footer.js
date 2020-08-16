import React from 'react';

const Footer = () => {
    return(
        <div className="page-footer">
            <img  src='./piggy.gif' alt="piggy-gif"/><br></br>
            <img className="footer-logo" src='./plain-logo.png' alt="logo"/>
            <div className="footer-copyright text-center py-3" onClick={()=>{window.open('http://chayagreisman.com/','_blank')}}>
                Copyright © {new Date().toISOString().substring(0, 4)} | Chaya M. Greisman
            </div>   
        </div>
    )
}

export default Footer