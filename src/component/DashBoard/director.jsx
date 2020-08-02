import React from "react";
import { Directors } from "../../api/directors";

class Director extends React.Component {
  constructor(props) {
    super(props);
    this.state = {directors: [] };
  }
  async componentWillMount() {
    const cid = this.props.match.params.cid
    console.log(cid)
    const directors = await Directors.getAll(cid)
    this.setState({directors: directors})
    console.log(this.state.directors)

  }
  render() {
    return (
      <div>
        <div>
          <h1>Dashboard</h1>
          <h1>You are on Director Page</h1>
          <button type="button" onClick={() => {this.props.history.push(`${this.props.history.location.pathname}/director/chirag`)}} className="btn">
            select one director
          </button>
        </div>
      </div>
    );
  }
 
};

export default Director;