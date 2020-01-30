import React, { Component } from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import "./Navigation.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavBar = () => {
    return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <div className="container">
            <Navbar.Brand><Link to='/'><FontAwesomeIcon icon='calendar'></FontAwesomeIcon></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to='/' className="nav-link">Home</Link>
                    <Link to='/users' className="nav-link">Users</Link>
                    <Link to='/venues' className="nav-link">Venues</Link>
                    <Link to='/reservations' className="nav-link">Reservations</Link>
                </Nav>
                <Link to="/login"><Button variant="outline-primary" className='login-btn'>Log In</Button></Link>
                <Link to="/register"><Button variant="outline-info">Register</Button></Link>
            </Navbar.Collapse>
        </div>
    </Navbar>
    )
}

class Navigation extends Component {
    render() {
        return (
            <NavBar />
        )
    }
}

export default Navigation