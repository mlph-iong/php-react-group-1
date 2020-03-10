import React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

export default function NavigationAdmin(props) {
    return (
        <Nav className="mr-auto">
            <Link to='/' className="nav-link">Home</Link>
            <Link to='/users' className="nav-link">Users</Link>
            <Link to='/services' className="nav-link">Services</Link>
            <Link to='/newsfeed' className="nav-link">Newsfeed</Link>
        </Nav>
    );
}