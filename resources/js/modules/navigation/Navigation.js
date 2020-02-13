import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import "./Navigation.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IsLoggedInChecker, Logout, GetUserDetails } from "../utils/Utils";

class NavBar extends Component {
    constructor() {
        super()
        this.state = {
            userDetails: null,
        }
        self = this;
        if(IsLoggedInChecker()) {
            GetUserDetails().then((response) => {
                if(response.data.success) {
                    self.setState({ userDetails: response.data.data });
                }
            });
        }
    }

    logout() {
        Logout().then(response => {
            self.props.history.push("/")
            window.location.reload()
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
                                    <Link to='/services' className="nav-link">Services</Link>
                                </Nav>
                                <Navbar.Text className="px-2">
                                        Signed in as:
                                </Navbar.Text>
                                <NavDropdown title={ self.state.userDetails != null? self.state.userDetails.name : '' } id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">My Account</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <div className="mx-2">
                                        <Button variant="outline-info" size="sm" onClick={ this.logout } block>Logout</Button>
                                    </div>
                                </NavDropdown>
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
            <NavBar history={ this.props.history }/>
        )
    }
}

export default withRouter(Navigation)