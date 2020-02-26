import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'

export default function NavigationPublic(props) {
    return (
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Link to='/' className="nav-link">Home</Link>
                <Link to='/users' className="nav-link">Users</Link>
                <Link to='/services' className="nav-link">Services</Link>
            </Nav>
            <Navbar.Text className="px-2">
                    Signed in as:
            </Navbar.Text>
            <NavDropdown title={ props.name } id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">My Account</NavDropdown.Item>
                <NavDropdown.Divider />
                <div className="mx-2">
                    <Button variant="outline-info" size="sm" onClick={ props.logoutHandler } block>Logout</Button>
                </div>
            </NavDropdown>
        </Navbar.Collapse>
    );
}