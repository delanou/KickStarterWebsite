import React, { Component } from 'react';
import '../stylesheets/App.css';
import Form from './Form';
import ResultPage from "./ResultPage";
import ProjectLink from './ProjectLink';
import {Link, Switch, Route} from 'react-router-dom';


const Home = () => (
  <div>
    <Link exact to="/Form"><a href="#" className="btn btn-lg btn-secondary">Fill out Project Manually</a></Link>
    <br/>
    <br/>
    <Link href="#" className="btn btn-lg btn-secondary" exact to="/ProjectLink">Link to Existing Project</Link>
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

class App extends Component {
  render() {
    return (
          <div className="text-center">

            <link href="../stylesheets/cover.css" rel="stylesheet"></link>
            
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