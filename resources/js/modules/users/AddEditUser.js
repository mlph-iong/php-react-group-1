import React, { Component } from "react";
import { withRouter} from 'react-router-dom';
import InputHelper from "../inputHelper/InputHelper";

class AddEditUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            username: '',
            password: '',
            email: '',
            contact_no: '',
            errors: {},
            firstLoad: true,
            isNew: true
        }
        if (props.match.params.id) {
            axios.get(`/api/users/${this.props.match.params.id}`)
            .then((response) =>
                this.setState({
                    user: response.data.user,
                    name: response.data.user.name,
                    username: response.data.user.username,
                    email: response.data.user.email,
                    contact_no: response.data.user.contact_no,
                    isNew: false
                })
            );
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
            password: this.state.password,
            email: this.state.email,
            contact_no: this.state.contact_no,
        }
        if (this.state.isNew) {
            this.create(newUser)
        } else {
            this.update(newUser);
        }
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
                    this.props.history.push('/users')
                }
            })
    }

    update(newUser) {
        let successRegistration = false;
        return axios.put('/api/users/' + this.props.match.params.id, newUser)
        .then(response => {
            successRegistration = true;
        })
        .catch(err => {
            this.setState({errors: err.response.data.errors})
        })
        .then(() => {
            this.setState({firstLoad: false});
            if (successRegistration) {
                this.props.history.push('/users');
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
                                {this.props.formTitle}
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
                            <InputHelper 
                                label="Email"
                                name="email"
                                type="email"
                                className={ this.validatorClass('email') }
                                placeholder="Email"
                                value={ this.state.email }
                                onChange={ this.onChange }
                                errorMessage={ this.state.errors["email"] }
                            />
                            <InputHelper 
                                label="Contact No"
                                name="contact_no"
                                type="text"
                                className={ this.validatorClass('contact_no') }
                                placeholder="Contact No"
                                value={ this.state.contact_no }
                                onChange={ this.onChange }
                                errorMessage={ this.state.errors["contact_no"] }
                            />
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block">
                                    Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AddEditUser)