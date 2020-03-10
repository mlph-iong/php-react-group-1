import React, { Component } from "react";
import "./Login.css";
import InputHelper from "../inputHelper/InputHelper";
import InputValidationMessage from "../validationHelper/validationHelper";
import { withRouter } from "react-router-dom"
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
      this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
      e.preventDefault()
      let continueRequest = false;
      const user = {
          username: this.state.username,
          password: this.state.password
      }
      if( this.state.username.length == 0 && this.state.password.length == 0 ) {
        this.setState({ errors: { "message": "Username and Password are required." } })
      } else if( this.state.username.length == 0 ) {
        this.setState({ errors: { "message": "Username is required." } })
      } else if(this.state.password.length == 0 ) {
        this.setState({ errors: { "message": "Password is required." } })
      } else {
          continueRequest = true;
      }
      if( continueRequest ) {
        this.login(user).then(res => {
            if (res) {
                self.props.history.push("/")
                this.props.changeIsLoggedIn(true);
            }
        })
      }
  }

  login (user) {
    this.setState({ errors: {} })
    return axios
        .post(
            'api/login',
            {
                username: user.username,
                password: user.password
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }

        )
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)
            return response.data.token
        })
        .catch(err => {
            const errors = {
                "message": err.response.data.message
            }
            this.setState({ errors: errors })
        })
}

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">
                                Please sign in
                            </h1>
                            <InputValidationMessage message={this.state.errors["message"]} />

                            <InputHelper 
                                label="Username" name="username" type="text"
                                className="" placeholder="Username"
                                value={ this.state.username } onChange={ this.onChange }
                                errorMessage="" />
                            <InputHelper 
                                label="Password" name="password" type="password"
                                className="" placeholder="Password"
                                value={ this.state.password } onChange={ this.onChange }
                                errorMessage="" />
                            
                            <button type="submit"
                                className="btn btn-lg btn-primary btn-block" >
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Login)