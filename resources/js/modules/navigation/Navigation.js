import React, { Component } from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import * as jwt_decode from 'jwt-decode';
import "./Navigation.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class NavBar extends Component {
    constructor() {
        super()
        this.state = {
            update: true,
        }
        self = this;
    }

    logout() {
        return axios
            .get('api/logout' + '?token=' + localStorage.getItem("usertoken"))
            .then(response => {
                localStorage.removeItem("usertoken")
            })
            .catch(err => {
                localStorage.removeItem("usertoken")
            }).then(response => {
                self.setState({ update: true })
            });
    }

    render() {
        let navBarContent
        let decoded
        let isLoggedIn
        try{
            decoded = jwt_decode(localStorage.getItem("usertoken"))
            if ( Date.now() >= decoded.exp * 1000) {
                isLoggedIn = false
            } else {
                isLoggedIn = true
            }
        } catch (e){
            isLoggedIn = false
        }
        if ( !isLoggedIn ) {
            localStorage.removeItem("usertoken");
            navBarContent = <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                </Nav>
                                <Link to="/login"><Button variant="outline-primary" className='login-btn'>Log In</Button></Link>
                                <Link to="/register"><Button variant="outline-primary" className='login-btn'>Registration</Button></Link>
                            </Navbar.Collapse>
        } else {
            navBarContent = <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Link to='/' className="nav-link">Home</Link>
                                    <Link to='/users' className="nav-link">Users</Link>
                                </Nav>
                                <Button variant="outline-info" onClick={ this.logout }>Logout</Button>
                            </Navbar.Collapse>
        }

        return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <div className="container">
                <Navbar.Brand><Link to='/'><FontAwesomeIcon icon='calendar'></FontAwesomeIcon></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                { navBarContent }
            </div>
        </Navbar>
        )
    }
}

class Navigation extends Component {
    render() {
        return (
            <NavBar />
        )
    }
}

export default Navigation