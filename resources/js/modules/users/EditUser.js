import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InputHelper from "../inputHelper/InputHelper";

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            password: '',
            errors: {},
            firstLoad: true
        };
        // bind
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // handle change
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    // create handleSubmit method right after handleChange method
    handleSubmit(e) {
        // stop browser's default behaviour of reloading on form submit
        e.preventDefault();
        axios
            .put(`/api/users/${this.props.match.params.id}`, {
                name: this.state.name,
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                this.props.history.push('/users');
            }).catch(err => {
                this.setState({errors: err.response.data.errors})
            });
    }
    // get all users from backend
    getUsers() {
        axios.get(`/api/users/${this.props.match.params.id}`).then((
            response
        ) =>
            this.setState({
                user: response.data.user,
                name: response.data.user.name,
                username: response.data.user.username,
            })
        );
    }
    // lifecycle method
    componentWillMount() {
        this.getUsers();
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

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.handleSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">
                                Edit User
                            </h1>
                            <InputHelper 
                                label="Name"
                                name="name"
                                type="text"
                                className={ this.validatorClass('name') }
                                placeholder="Name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                errorMessage={ this.state.errors["name"] }
                            />
                            <InputHelper 
                                label="Username"
                                name="username"
                                type="text"
                                className={ this.validatorClass('username') }
                                placeholder="Username"
                                value={this.state.username}
                                onChange={this.handleChange}
                                errorMessage={ this.state.errors["username"] }
                            />
                            <InputHelper 
                                label="Password"
                                name="password"
                                type="password"
                                className={ this.validatorClass('password') }
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                errorMessage={ this.state.errors["passsword"] }
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
        );
    }
}

export default EditUser;