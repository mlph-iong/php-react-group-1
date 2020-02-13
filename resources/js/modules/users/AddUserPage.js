import React, { Component } from "react";
import { withRouter} from 'react-router-dom';
import InputHelper from "../inputHelper/InputHelper";

class AddUserPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            username: '',
            password: '',
            errors: {},
            firstLoad: true
        }
        if (props.currentUser !== undefined) {
            this.state = {
                name: props.currentUser.name,
                username: props.currentUser.username,
                password: props.currentUser.password,
                errors: {},
                firstLoad: true
            }
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
        this.create(newUser)
    }

    create(newUser) {
        let successRegistration = false;
        return axios
            .post('api/register', newUser, {
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => {
                successRegistration = true;
            })
            .catch(err => {
                this.setState({errors: err.response.data.errors})
            })
            .then(() => {
                this.setState({firstLoad: false});
                if (successRegistration) {
                    this.props.history.push(this.props.linkAfterSubmit)
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
                                { this.props.currentUser !== undefined ? 'Edit User' : this.props.formTitle }
                            </h1>
                            <InputHelper 
                                label="Name"
                                name="name"
                                type="text"
                                className={ this.validatorClass('name') }
                                placeholder="Name"
                                value={ this.state.name }
                                onChange={ this.onChange }
                                errorMessage={ this.state.errors["name"] }
                            />
                            <InputHelper 
                                label="Username"
                                name="username"
                                type="text"
                                className={ this.validatorClass('username') }
                                placeholder="Username"
                                value={ this.state.username }
                                onChange={ this.onChange }
                                errorMessage={ this.state.errors["username"] }
                            />
                            {this.props.currentUser === undefined ? 
                                <div>
                                    <InputHelper 
                                        label="Password"
                                        name="password"
                                        type="password"
                                        className={ this.validatorClass('password') }
                                        placeholder="Password"
                                        value={ this.state.password }
                                        onChange={ this.onChange }
                                        errorMessage={ this.state.errors["password"] }
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-lg btn-primary btn-block">
                                            { this.props.formSubmitButtonName }
                                    </button>
                                </div>
                            : null}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AddUserPage)