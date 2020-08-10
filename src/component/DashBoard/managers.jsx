import React from "react";
import { Managers } from "../../api/managers";

class Manager extends React.Component {

  componentDidMount() {
    this.getManagers();
  }

  async getManagers() {
    const cid = this.props.match.params.cid
    const did = this.props.match.params.did
    const managers = await Managers.getAll(cid, did)
    console.log(managers)
    this.setState({ managers });
  }


  render() {
    return (
      <div>
        <div>
          <h1>Dashboard</h1>
          <h1>You are on Managers Page</h1>
          <button type="button" onClick={() => { this.props.history.push(`${this.props.history.location.pathname}/manager/ravi`) }} className="btn">
              --------->>> select one  manager
          </button>
          
        </div>
      </div>
    );
  }
 
};

export default Manager;