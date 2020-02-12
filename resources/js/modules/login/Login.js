import React, { Component } from "react";
import "./Login.css";
import InputValidationMessage from "../validationHelper/validationHelper";
import axios from 'axios';

class Login extends Component {
  constructor() {
      super()
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
                this.forceUpdate()
                this.props.history.push('/')
                window.location.reload()
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

                          <div className="form-group">
                              <label htmlFor="username">Username</label>
                              <input type="username" className="form-control"
                                  name="username" placeholder="Username"
                                  value={this.state.username} onChange={this.onChange} />
                          </div>
                          <div className="form-group">
                              <label htmlFor="password">Password</label>
                              <input type="password" className="form-control"
                                  name="password" placeholder="Password"
                                  value={this.state.password} onChange={this.onChange} />
                          </div>
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
export default Login