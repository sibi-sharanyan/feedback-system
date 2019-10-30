import React, { Component } from 'react';
import { render } from 'react-dom';
import ScheduleTest from './scheduletest';
import Alltests from './alltests';
import TakeTest from './taketest';
import Result from './result';
import './style.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Paper , Typography , CircularProgress } from '@material-ui/core';
class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Sibi'
    };
  }

  render() {
    return (
      <Router >
      <Paper>
        <div className=" d-flex justify-content-around bg-dark mb-3 text-white" >


          <Link to={'/'} className="nav-link text-white "> Take Test </Link>
          <Link to={'/alltests'} className="nav-link text-white">All Tests</Link>
          <Link to={'/schedule'} className="nav-link text-white">Schedule</Link>
          
        </div>

      </Paper>











        <Switch>
          <Route exact path='/' component={TakeTest} />
          <Route path='/alltests' component={Alltests} />
          <Route path='/schedule' component={ScheduleTest} />
           <Route path='/result/:code' component={Result} />
        </Switch>


      </Router>
    );
  }
}
render(<App />, document.getElementById('root'));
