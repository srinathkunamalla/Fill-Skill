import React from 'react';
import './App.scss';
import Login from './component/Login/login';
import { Switch, Route, HashRouter } from "react-router-dom";
import Director from './component/DashBoard/director';
import 'bootstrap/dist/css/bootstrap.min.css';
import history from './history';
import Managers from './component/DashBoard/managers';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true
    };
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-dark bg-dark">
          <a class="navbar-brand" href="#">GapFinder</a>
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Manage Skillset</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </nav>

        <HashRouter history={history}>
          <Switch>
            <Route path="/company/:cid/director/:did" component={Managers} />
            <Route path="/company/:cid/" component={Director} />
            <Route path="/" component={Login} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}



export default App;
