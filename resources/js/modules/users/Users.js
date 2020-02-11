import React, {Component} from "react";
import { Link } from 'react-router-dom'
import UserPage from './UserPage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Table} from 'react-bootstrap'

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            currentUser: null
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
            this.setState({users: array});
        })
    }

    getUsers() {
        return this.state.users.map(user => {
            return (
                <tr>
                    <td><a onClick={() => this.selectUser(user)} key={user.id}>{user.name}</a></td>
                    <td>{user.username}</td>
                    <td>
                        <FontAwesomeIcon icon="trash" onClick={() => this.deleteUser(user)} key={user.id}></FontAwesomeIcon>
                    </td>
                </tr>
            )
        })
    }

    render () {
        return (
            <div>
                {this.state.currentUser ? <UserPage user={this.state.currentUser} /> : null}
                <Link to='/add-user' className="add-user-link">Add User</Link>
                <Table striped bordered hover>
                    <thead>
                        <th>Name</th>
                        <th>Username</th>
                        <th></th>
                    </thead>
                    {this.getUsers()}
                </Table>
            </div>
        )
    }
}

export default Users