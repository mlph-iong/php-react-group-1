import React, {Component} from "react";
import {Table} from 'react-bootstrap'
import './Newsfeed.css'

class Newsfeed extends Component {
    constructor() {
        super();
        this.state = {
            services: [],
            currentService: null,
            showDeleteModal: false,
            showViewModal: false,
            filtered: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    getServices() {
        axios.get('api/services')
        .then((response) =>
            this.setState({
                services: [...response.data.services],
                filtered: [...response.data.services]
            })
        );
    }

    componentWillMount() {
        this.getServices();
    }

    convertPrice(price) {
        return "Php " + price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    handleChange(e) {
        let currentList = [];
        let newList = [];
        
        if (e.target.value !== "") {
            currentList = this.state.filtered;
            newList = currentList.filter(item => {
                const filter = e.target.value.toLowerCase();
                return String(item.name).toLowerCase().includes(filter) || 
                    String(item.description).toLowerCase().includes(filter) ||
                    String(item.price).toLowerCase().includes(filter) ||
                    String(item.user.username).toLowerCase().includes(filter) ||
                    String(item.user.email).toLowerCase().includes(filter) ||
                    String(item.user.contact_no).toLowerCase().includes(filter)
                ;
            });
        } else {
            this.getServices();
            newList = this.state.services;
        }
        this.setState({
            services: newList
        });
    }

    renderServices() {
        return this.state.services.map(service => (
            <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>{this.convertPrice(service.price)}</td>
                <td>{service.user.name}</td>
                <td>{service.user.email}</td>
                <td>{service.user.contact_no}</td>
            </tr>
        ));
    }

    render() {
        return (
            <div>
                <input type="text" className="search-input form-control" onChange={this.handleChange} placeholder="Search..." />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Service Provider</th>
                            <th>Email</th>
                            <th>Contact No</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderServices()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Newsfeed