import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'

export default function NavigationCustomer(props) {
    return (
        <Nav className="mr-auto">
            <Link to='/' className="nav-link">Home</Link>
            <Link to='/newsfeed' className="nav-link">Newsfeed</Link>
        </Nav>
    );
}