import React from 'react';


const Home = (props) => {
    return (
        <div className="home">
            <img className="home-banner-img" src="./home.gif" alt="home-logo"/>
            <h3 className="app-description">A Personal Finance Management App</h3>
            <h2>Get Ready. Get Gelt.</h2>
            <button type="button" className="btn get-started" onClick = {()=>props.history.push('/login')}>GO!</button>

            {/* <div className="home-footer">
                
                <small>Copyright © {new Date().toISOString().substring(0, 4)} | Chaya M. Greisman</small>
                
            </div> */}

         </div>
    );
  }
  
export default Home;