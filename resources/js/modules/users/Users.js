import React, {Component} from "react";
import { Link } from 'react-router-dom'
import UserPage from './UserPage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Table} from 'react-bootstrap'
import Confirm from '../confirm/Confirm'
class Users extends Component {

    constructor() {
        super();
        this.state = {
            users: [],
            currentUser: null,
            showDeleteModal: false
        }
    }

    componentDidMount() {
        fetch('/api/users')
        .then(response => {
            return response.json();
        })
        .then(users => {
            this.setState({users});
        })
    }

    selectUser(user) {
        this.setState({currentUser: user})
    }

    deleteUser(user) {
        fetch('api/users/' + user.id, {method: 'delete'})
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

    showModal(user) {
            this.setState({
                showDeleteModal: true,
                currentUser: user
            });
    }

    hideModal() {
        this.setState({showDeleteModal: false});
    }

    getUsers() {
        return this.state.users.map(user => {
            return (
                <tbody>
                    <tr>
                        <td><a onClick={() => this.selectUser(user)} key={user.id}>{user.name}</a></td>
                        <td>{user.username}</td>
                        <td><FontAwesomeIcon icon="trash" onClick={() => this.showModal(user)}></FontAwesomeIcon></td>
                    </tr>
                </tbody>
            )
        })
    }

    render () {
        return (
            <div>
                {this.state.currentUser ? <UserPage user={this.state.currentUser} /> : null}
                {this.state.currentUser ?
                    <Confirm show={this.state.showDeleteModal} handleClose={() => this.hideModal()} handleOk={() => this.deleteUser(this.state.currentUser)}>
                        <p>Delete {this.state.currentUser.name}?</p>
                    </Confirm>
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