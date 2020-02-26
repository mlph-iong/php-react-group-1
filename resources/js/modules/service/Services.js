import React, {Component} from "react";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Table, Button} from 'react-bootstrap'
import Modal from '../modal/Modal'

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
            response
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
            this.setState({
                services: array,
                currentService: null,
                showDeleteModal: false
            });
        })
    }

    hideModal() {
        this.setState({
            showDeleteModal: false,
            showViewModal: false
        });
    }

    openDeleteModal(service) {
        this.setState({
            showDeleteModal: true,
            currentService: service
        });
    }

    convertPrice(price) {
        return "Php " + price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    // render services
    renderServices() {
        return this.state.services.map(service => (
            <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>{this.convertPrice(service.price)}</td>
                <td>{service.user.name}</td>
                <td>{service.user.email}</td>
                <td>{service.user.contact_no}</td>
                <td>
                    <Link to={`/services-edit/${service.id}/`}>
                        <FontAwesomeIcon icon="pencil-alt"></FontAwesomeIcon>
                    </Link>
                        
                    <FontAwesomeIcon icon="trash" onClick={() => this.openDeleteModal(service)}></FontAwesomeIcon>
                </td>
            </tr>
        ));
    }


    render() {
        return (
            <div>
                {this.state.currentService ? 
                    <Modal 
                        show={this.state.showDeleteModal} 
                        handleClose={() => this.hideModal()} 
                        handleOk={() => this.deleteService(this.state.currentService)}
                        handleOkText={'Yes'}>
                        <p>Delete {this.state.currentService.name}?</p>
                    </Modal>
                :   null}
                <Link to='/services-add' className="add-user-link"><Button>Add Service</Button></Link>
                
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Service Provider</th>
                            <th>Email</th>
                            <th>Contact No</th>
                            <th></th>
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

export default Services