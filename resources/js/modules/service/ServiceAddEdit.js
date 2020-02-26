import React, { Component } from 'react';
import InputHelper from "../inputHelper/InputHelper";
import {GetUserDetails} from '../utils/Utils';

class ServiceAddEdit extends Component {
    constructor(props) {
        super(props);
        let parentThis = this;
        this.state = {
            name: '',
            description: '',
            price: '',
            service: '',
            user_id:'',
            errors: {},
            firstLoad: true,
            isNew: true
        };
        if (props.match && props.match.params.id) {
            axios.get(`/api/services/${props.match.params.id}/edit`)
            .then((response) =>
                this.setState({
                    service: response.data.service,
                    name: response.data.service.name,
                    description: response.data.service.description,
                    price: response.data.service.price,
                    isNew: false
                })
            );
        }
        GetUserDetails().then(response => {
            parentThis.setState({
                user_id: response.data.data.id
            })
        })
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        const newService = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            user_id: this.state.user_id
        }
        if (this.state.isNew) {
            this.create(newService)
        } else {
            this.update(newService)
        }
    }

    create(newService) {
        return axios.post('/api/services', newService)
        .then(response => {
            this.props.history.push('/services');
        })
    }

    update(newService) {
        return axios.put('/api/services/' + this.props.match.params.id, newService)
        .then(response => {
            this.props.history.push('/services');
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

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.handleSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">
                                {this.props.formTitle}
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
                                    Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ServiceAddEdit;