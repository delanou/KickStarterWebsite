import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import ResultPage from "./components/ResultPage";
import ProjectLink from './components/ProjectLink';
import {Link, Switch, Route} from 'react-router-dom';


const Home = () => (
  <div>
    <Link href="#" className="btn btn-lg btn-secondary" to="/Form">Fill out Project Manually</Link>
    <br/>
    <br/>
    <Link href="#" className="btn btn-lg btn-secondary" to="/ProjectLink">Link to Existing Project</Link>
  </div>
);

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/Form' component={Form}></Route>
    <Route exact path='/ProjectLink' component={ProjectLink}></Route>
    <Route exact path='/ResultPage' component={ResultPage}></Route>
  </Switch>
);

//<link href="../stylesheets/cover.css" rel="stylesheet"></link>
class App extends Component {
  render() {
    return (
          <div className="text-center">
            
            <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
              <main role="main" className="inner cover">
                <h1 className="cover-heading">KickStarter Prediction</h1>
                <p className="lead"> This project aims to provide a prediction service
                for current KickStarter projects.</p>
              </main>
            </div>

            <Main/>

          </div>
    );
  }
}

export default App;