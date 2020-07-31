import React from 'react';
import './App.scss';
import {Login} from './component/Login/index';
import {  Switch, Route, HashRouter } from "react-router-dom";
import Director from './component/DashBoard/director';
import 'bootstrap/dist/css/bootstrap.min.css';
import history from './history';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true
    };
  }

  render() {
    return (
      <div className="App">
       <HashRouter history={history}>
       <Switch>
            <Route path="/director" component={Director}/>
            <Route path="/" component={Login}/>
        </Switch>
        </HashRouter>
      </div>
    );
  }
}



export default App;
