import React from "react";

export class Login extends React.Component {
  constructor(props) {
    super(props);
   this.state = {companyName: "", username: "", password: "", errors: [] };
  }

  showValidationErr(elm, msg) {
    this.setState((prevState) => ({ errors: [...prevState.errors, {elm, msg}]}));
  }

  clearValidationErr(elm) {
    this.setState((prevState) => {
      let newArr = [];
      for(let err of prevState.errors){
      if(elm !== err.elm) {
        newArr.push(err);
        }
      }
      return {errors: newArr};
    });
  }

  onCompanyNameChange(e) {
    this.setState({ companyName: e.target.value});
    this.clearValidationErr("companyName");
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value});
    this.clearValidationErr("username");
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value});
    this.clearValidationErr("password");

  }

  submitLogin(e) {
    if(this.state.companyName === "") {
      this.showValidationErr("companyName", "Company Name cannot be Empty")
    }if (this.state.username === "") {
      this.showValidationErr("username", "Username cannot be Empty")
    }if (this.state.password === "")
      this.showValidationErr("password", "Password cannot be Empty")
  }



  handleSubmit  =() => {
    const error = [];
    if(this.state.companyName.trim() === "") {
      error.push({elm: 'companyName', msg: 'Company Name cannot be Empty'});
    }if (this.state.username.trim() === "") {
      error.push({elm: 'username', msg: 'Username cannot be Empty'});
    }if (this.state.password.trim() === "")
      error.push({elm: 'password', msg: 'Password cannot be Empty'});
      if (error && error.length > 0) {
        this.setState({errors: error});
      } else {
        this.props.history.push("/director");
      }
    };



  render() {
    let companyNameErr = "", usernameErr = "", passwordErr = "";

    for(let err of this.state.errors) {
      if(err.elm === "companyName") {
        companyNameErr = err.msg;
      } if(err.elm === "username") {
        usernameErr = err.msg;
      } if(err.elm === "password") {
        passwordErr = err.msg;

      }
    }
    
    return (
      <div className="base-container">
        <div className="header">Login</div>
        <div className="content">
          <div className="form">
          <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
              <input type="text" name="companyName" placeholder="Company Name"
              onChange={this.onCompanyNameChange.bind(this)} />
              <small className="danger-error">{ companyNameErr ? companyNameErr: ""}</small>
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="Username" 
              onChange={this.onUsernameChange.bind(this)} />
              <small className="danger-error">{ usernameErr ? usernameErr: ""}</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="Password" 
              onChange={this.onPasswordChange.bind(this)} />
              <small className="danger-error">{ passwordErr ? passwordErr: ""}</small>
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" onClick={this.handleSubmit} className="btn">
            Login
          </button>
        </div>
      </div>
    );
  }
}
