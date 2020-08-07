import React, { useContext, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ProjectState from './context/project/ProjectState'
import AuthContext from './context/auth/authContext';
import PrivateRoute from './routing/PrivateRoute'

import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import Dashboard from './components/Dashboard';

// Styles
import M from 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css'
import './App.css';

function App() {

  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      M.AutoInit();
      loadUser();
    }
    return () => {
      mounted = false
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <ProjectState>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </ProjectState>
    </Fragment>
  );
}

export default App;
