import React, { Component } from "react";
import { Button, FormControl, Form } from "react-bootstrap";
import "./Registration.css";
import axios from 'axios';

class Registration extends Component {
  constructor() {
      super()
      this.state = {
          name: '',
          username: '',
          password: '',
          errors: {}
      }
      this.onChange = this.onChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
  }
  onChange (e) {
      this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit (e) {
      e.preventDefault()
      const newUser = {
          name: this.state.name,
          username: this.state.username,
          password: this.state.password
      }
      this.register(newUser).then(res => {
        if (res) {
          
        }
      })
  }

  register (newUser) {
    return axios
        .post('api/register', newUser, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            console.log(response)
            this.props.history.push(`/login`)
        })
        .catch(err => {
            console.log(err)
        })
  }

  render () {
      return (
          <div className="container">
              <div className="row">
                  <div className="col-md-6 mt-5 mx-auto">
                      <form noValidate onSubmit={this.onSubmit}>
                          <h1 className="h3 mb-3 font-weight-normal">
                              Register
                          </h1>
                          <div className="form-group">
                              <label htmlFor="name">Name</label>
                              <input
                                  type="text"
                                  className="form-control"
                                  name="name"
                                  placeholder="Name"
                                  value={this.state.name}
                                  onChange={this.onChange}
                              />
                          </div>
                          <div className="form-group">
                              <label htmlFor="username">Username</label>
                              <input
                                  type="text"
                                  className="form-control"
                                  name="username"
                                  placeholder="Username"
                                  value={this.state.username}
                                  onChange={this.onChange}
                              />
                          </div>
                          <div className="form-group">
                              <label htmlFor="password">Password</label>
                              <input
                                  type="password"
                                  className="form-control"
                                  name="password"
                                  placeholder="Password"
                                  value={this.state.password}
                                  onChange={this.onChange}
                              />
                          </div>
                          <button
                              type="submit"
                              className="btn btn-lg btn-primary btn-block"
                          >
                              Register!
                          </button>
                      </form>
                  </div>
              </div>
          </div>
      )
  }
}
export default Registration