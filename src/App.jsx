import React from 'react';
import './App.scss';
import Login from './component/Login/login';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Director from './component/DashBoard/director';
import 'bootstrap/dist/css/bootstrap.min.css';
import history from './history';
import Manager from './component/DashBoard/managers';
import Skillset from './component/Skillset/skillset';
import { connect } from 'react-redux'
import { getCompany } from './store/company/actions';
import { Link } from 'react-router-dom'
import Developer from './component/DashBoard/developer';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import search from './component/Search/search';

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
          <nav class="navbar navbar-dark bg-dark">
            <Link to={`/company/${this.props.company.id}`} class="navbar-brand">GapFinder</Link>
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link to={`/company/${this.props.company.id}/skillset`} class="nav-link">Manage Skillset</Link>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
              <input 
                class="form-control mr-sm-2" 
                placeholder="ie. javascript>3" aria-label="Search" 
                value={this.state.query} onChange={evt => this.updateQuery(evt)}/>
              <Link class="btn btn-outline-success my-sm-0" to={`/company/${this.props.company.id}/search/${this.state.query || 'all'}`}>Search</Link>
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

