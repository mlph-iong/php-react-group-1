import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

export default function NavigationPublic() {
    return (
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Link to="/login"><Button variant="outline-primary" className='login-btn'>Log In</Button></Link>
            <Link to="/register"><Button variant="outline-primary" className='login-btn'>Registration</Button></Link>
        </Navbar.Collapse>
    );
}