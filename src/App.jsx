import React from 'react';
import Login from './component/Login/login';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Director from './component/DashBoard/director';
import history from './history';
import Manager from './component/DashBoard/managers';
import Skillset from './component/Skillset/skillset';
import { connect } from 'react-redux'
import { getCompany } from './store/company/actions';
import { Link } from 'react-router-dom'
import Developer from './component/DashBoard/developer';
import search from './component/Search/search';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './App.scss';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true,
      query: ''
    };
  }
  async componentWillMount() {
    if (!this.props.company || !this.props.company.id) {
      await this.props.getCompany()
    }
  }
  updateQuery = (evt) => {
    this.setState({
      ...this.state,
      query: evt.target.value
    });
  }

  render() {
    return (
      <div>
        <BrowserRouter history={history}>
          <nav className="navbar navbar-dark bg-dark">
            <Link to={`/company/${this.props.company.id}`} className="navbar-brand">SkillTracker</Link>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active" key="manage-skill">
                <Link to={`/company/${this.props.company.id}/skillset`} className="nav-link">Manage Skillset</Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input 
                className="form-control mr-sm-2" 
                placeholder="ie. javascript>3" aria-label="Search" 
                value={this.state.query} onChange={evt => this.updateQuery(evt)}/>
              <Link className="btn btn-outline-light my-sm-0" to={`/company/${this.props.company.id}/search/${this.state.query || 'all'}`}>Search</Link>
            </form>
          </nav>
          <Switch>
            <Route path="/company/:cid/director/:did/manager/:mid" component={Developer} />
            <Route path="/company/:cid/director/:did/" component={Manager} />
            <Route path="/company/:cid/skillset" component={Skillset} />
            <Route path="/company/:cid/search/:query" component={search} />
            <Route path="/company/:cid" component={Director} />
            <Route path="/" component={Login} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  getCompany: id => dispatch(getCompany(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

