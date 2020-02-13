import React, {Component} from "react";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Table, Button} from 'react-bootstrap'
import Modal from '../modal/Modal'
import './Users.css'
class Users extends Component {

    constructor() {
        super();
        this.state = {
            users: [],
            currentUser: null,
            showDeleteModal: false,
            showViewModal: false,
        }
    }

    componentDidMount() {
        fetch('/api/users?token=' + localStorage.getItem("usertoken"))
        .then(response => {
            return response.json();
        })
        .then(users => {
            this.setState({users});
        })
    }

    openViewModal(user) {
        this.setState({
            currentUser: user,
            showViewModal: true
        })
    }

    deleteUser(user) {
        fetch('api/users/' + user.id + '?token=' + localStorage.getItem("usertoken"), {method: 'delete'})
        .then(response => {
            var array = this.state.users.filter(function(x) {
                return x !== user
            });
            this.setState({
                users: array,
                currentUser: null, 
                showDeleteModal: false
            });
        })
    }

    saveUser(user) {

    }

    openDeleteModal(user) {
            this.setState({
                showDeleteModal: true,
                currentUser: user
            });
    }

    hideModal() {
        this.setState({
            showDeleteModal: false,
            showViewModal: false,
        });
    }

    getUsers() {
        return this.state.users.map(user => {
            return (
                <tbody>
                    <tr>
                        <td><a onClick={() => this.openViewModal(user)} key={user.id}>{user.name}</a></td>
                        <td>{user.username}</td>
                        <td><FontAwesomeIcon icon="trash" onClick={() => this.openDeleteModal(user)}></FontAwesomeIcon></td>
                    </tr>
                </tbody>
            )
        })
    }

    render () {
        return (
            <div>
                {this.state.currentUser ?
                    <div>
                        <Modal 
                            show={this.state.showViewModal}
                            handleClose={() => this.hideModal()} 
                            handleOk={() => this.props.history.push(`/edit-user/${this.state.currentUser.id}`)}
                            handleOkText={'Edit'}>
                            Name: <h2>{this.state.currentUser.name}</h2>
                            <p>Username: {this.state.currentUser.username}</p>
                        </Modal>
                        <Modal 
                            show={this.state.showDeleteModal} 
                            handleClose={() => this.hideModal()} 
                            handleOk={() => this.deleteUser(this.state.currentUser)}
                            handleOkText={'Yes'}>
                            <p>Delete {this.state.currentUser.name}?</p>
                        </Modal>
                    </div>
                : null}
                <Link to='/add-user' className="add-user-link">Add User</Link>
                
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th></th>
                        </tr>
                    </thead>
                    {this.getUsers()}
                </Table>
            </div>
        )
    }
}

export default Users