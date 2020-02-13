import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ServiceEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            service: ''
        };
        // bind
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // handle change
    handleChange(e) {
        this.setState({
            name: e.target.value
        });
        // console.log('onChange', this.state.name);
    }
    // create handleSubmit method right after handleChange method
    handleSubmit(e) {
        // stop browser's default behaviour of reloading on form submit
        e.preventDefault();
        axios
            .put(`api/services/${this.props.match.params.id}`, {
                name: this.state.name
            })
            .then(response => {
                console.log('successfully edited the service');
                this.props.history.push('/');
            });
    }
    // get all services from backend
    getServices() {
        axios.get(`/services/${this.props.match.params.id}/edit`).then((
            response // console.log(response.data.services)
        ) =>
            this.setState({
                service: response.data.service,
                name: response.data.service.name
            })
        );
    }
    // lifecycle method
    componentWillMount() {
        this.getServices();
    }

    render() {
        console.log(this.props.match.params.id);
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Edit Service</div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <textarea
                                            onChange={this.handleChange}
                                            value={this.state.name}
                                            className="form-control"
                                            rows="5"
                                            maxLength="255"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Edit Service
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ServiceEdit;