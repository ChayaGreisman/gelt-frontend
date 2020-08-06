import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'
import './App.css';

import Home from './components/Home'
import Login from './components/Login'
import DashboardContainer from './containers/DashboardContainer'

const App = () => {
  return (
      <Router>
      <React.Fragment>
      <Switch>
        <Route exact path="/" component= {Home} />
        <Route exact path="/login" component= {Login} />
        <Route exact path="/:id" component= {DashboardContainer} />
      </Switch>  
      </React.Fragment>
    </Router>
  );
}

export default App;
