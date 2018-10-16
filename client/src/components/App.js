import React, { Component } from 'react';
import '../stylesheets/App.css';
import Form from './Form';
import ProjectLink from './ProjectLink';
import {Link, Switch, Route} from 'react-router-dom';
import Pass from './Pass';
import Fail from './Fail';

const Home = () => (
  <div>
    <Link exact to="/Form"><button>Fill out Project Manually</button></Link>
    <br/>
    <Link exact to="/ProjectLink"><button>Link to Existing Project</button></Link>
  </div>
);

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/Form' component={Form}></Route>
    <Route exact path='/ProjectLink' component={ProjectLink}></Route>
    <Route exact path='/Pass' component={Pass}></Route>
    <Route exact path='/Fail' component={Fail}></Route>
  </Switch>
);

class App extends Component {
  render() {
    return (
      <div>
        KickStarter Prediction
        <br/>
        <Main/>
      </div>
    );
  }
}

export default App;