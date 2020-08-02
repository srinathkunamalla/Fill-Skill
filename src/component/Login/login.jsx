import React from "react";
import { Companies } from "../../api/companies";
import { Directors } from "../../api/directors";

export class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="form">
          <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
              <input type="text" name="companyName" placeholder="Company Name" />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={() => Companies.read()}>
            Login
          </button>
        </div>
      </div>
    );
  }
}
