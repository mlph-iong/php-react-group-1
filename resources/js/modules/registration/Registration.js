import React, { Component } from "react";
import "./Registration.css";
import InputValidationMessage from "../validationHelper/validationHelper";
import axios from 'axios';

class Registration extends Component {
  constructor() {
      super()
      this.state = {
          name: '',
          username: '',
          password: '',
          firstLoad: true,
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
      let successLoggedIn = false;
    return axios
        .post('api/register', newUser, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            successLoggedIn = true;
        })
        .catch(err => {
            this.setState({ errors: err.response.data.errors })
        }).then(() => {
            this.setState({ firstLoad: false });
            if( successLoggedIn ) {
                this.props.history .push(`/login`)
            }
        })
  }

  validatorClass(inputName) {
    let returnClass;
    if(this.state.firstLoad) {
        returnClass = "";
    } else if(this.state.errors[inputName] != null) {
        returnClass = "is-invalid";
    } else {
        returnClass = "is-valid";
    }
    return returnClass;
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
                                <input type="text" className={"form-control " + this.validatorClass('name') }
                                    name="name" placeholder="Name"
                                    value={this.state.name} onChange={this.onChange}/>
                                <InputValidationMessage message={this.state.errors["name"]} />
                          </div>
                          <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" className={"form-control " + this.validatorClass('username') }
                                    name="username" placeholder="Username"
                                    value={this.state.username} onChange={this.onChange} />
                                <InputValidationMessage message={this.state.errors["username"]} />
                          </div>
                          <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className={"form-control " + this.validatorClass('password') }
                                    name="password" placeholder="Password"
                                    value={this.state.password} onChange={this.onChange} />
                                <InputValidationMessage message={ this.state.errors["password"] } />
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