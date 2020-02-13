import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InputHelper from "../inputHelper/InputHelper";

class ServiceAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            price: '',
            service: '',
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
            .post('/api/services', {
                name: this.state.name,
                description: this.state.description,
                price: this.state.price
            })
            .then(response => {
                this.props.history.push('/services');
            });
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
                                Add Service
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
                                label="Description"
                                name="description"
                                type="text"
                                className={ this.validatorClass('description') }
                                placeholder="Description"
                                value={this.state.description}
                                onChange={this.handleChange}
                                errorMessage={ this.state.errors["description"] }
                            />
                            <InputHelper 
                                label="Price"
                                name="price"
                                type="text"
                                className={ this.validatorClass('descrippricetion') }
                                placeholder="Price"
                                value={this.state.price}
                                onChange={this.handleChange}
                                errorMessage={ this.state.errors["price"] }
                            />
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block">
                                    Add Service
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ServiceAdd;