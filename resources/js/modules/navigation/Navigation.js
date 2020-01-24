import React, { Component } from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import "./Navigation.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavBar = () => {
    return (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home"><FontAwesomeIcon icon='calendar'></FontAwesomeIcon></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link><Link to="/">Home</Link></Nav.Link>
                <Nav.Link><Link to='/users'>Users</Link></Nav.Link>
                <Nav.Link><Link to='/venues'>Venues</Link></Nav.Link>
                <Nav.Link><Link to='/reservations'>Reservations</Link></Nav.Link>
            </Nav>
            <Link to="/login"><Button variant="outline-primary" className='login-btn'>Log In</Button></Link>
            <Link to="/register"><Button variant="outline-info">Register</Button></Link>
        </Navbar.Collapse>
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