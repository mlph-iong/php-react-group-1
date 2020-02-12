import React, { Component } from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import * as jwt_decode from 'jwt-decode';
import "./Navigation.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IsLoggedInChecker, Logout } from "../utils/Utils";

class NavBar extends Component {
    constructor() {
        super()
        this.state = {
            update: true,
        }
        self = this;
    }

    logout() {
        Logout().then(response => {
            self.setState({ update: true })
        });
    }

    render() {
        let navBarContent
        let isLoggedIn = IsLoggedInChecker()
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