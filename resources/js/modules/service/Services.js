import React, {Component} from "react";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Table} from 'react-bootstrap'
import {Modal} from '../modal/Modal'

class Services extends Component {
    constructor() {
        super();
        this.state = {
            services: [],
            currentService: null,
            showDeleteModal: false,
            showViewModal: false
        }
    }

    // get all services from backend
    getServices() {
        axios.get('api/services').then((
            response // console.log(response.data.services)
        ) =>
            this.setState({
                services: [...response.data.services]
            })
        );
    }

    // lifecycle method
    componentWillMount() {
        this.getServices();
    }

    // selectService(service) {
    //     this.setState({currentService: service})
    // }

    deleteService(service) {
        fetch('api/services/' + service.id, {method: 'delete'})
        .then(response => {
            var array = this.state.services.filter(function(x) {
                return x !== service
            });
            this.setState({services: array});
        })
    }

    // render services
    renderServices() {
        return this.state.services.map(service => (
            <tbody>
                <tr>
                    <td><a onClick={() => this.openViewModal(service)} key={service.id}>{service.name}</a></td>
                    <td><FontAwesomeIcon icon="trash" onClick={() => this.openDeleteModal(service)}></FontAwesomeIcon></td>
                </tr>
            </tbody>
        ));
    }

    hideModal() {
        this.setState({
            showDeleteModal: false,
            showViewModal: false
        });
    }

    openEditModal(service) {
        console.log('Test')
    }

    openViewModal(service) {
        this.setState({
            currentService: service,
            showViewModal: true
        })
    }

    render() {
        return (
            <div>
                <Link to='/services-add' className="add-service-link">Add Service</Link>
                
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    {this.renderServices()}
                </Table>
            </div>
        )
    }
}

export default Services