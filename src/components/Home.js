import React from 'react';


const Home = (props) => {
    return (
        <div className="home">
            <img className="home-banner-img" src="./home.gif" alt="home-logo"/>
            <h2>Get Ready. Get Gelt.</h2>
            <button type="button" className="btn get-started" onClick = {()=>props.history.push('/login')}>GO!</button>
        </div>
    );
  }
  
export default Home;