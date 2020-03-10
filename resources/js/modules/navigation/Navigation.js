import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import "./Navigation.css";
import NavigationPublic from "./NavigationPublic"
import NavigationAdmin from "./NavigationAdmin"
import NavigationServiceProvider from "./NavigationServiceProvider"
import NavigationCustomer from "./NavigationCustomer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logoutUser, getUserDetails } from "../utils/Utils"
import axios from 'axios'

class NavBar extends Component {

    constructor(props) {
        super()
        this.state = {
            userDetails: null
        }
        self = this;
    }

    componentDidMount() {
        if(this.state.userDetails == null && this.props.isLoggedIn) {
            this.getUserDetails();
        }            
    }

    getUserDetails() {
        getUserDetails().then((response) => {
            if(response.data.success) {
                this.setState({ userDetails: response.data.data });
            }
        }).catch(() => {
            this.props.changeIsLoggedIn(false);
        })
    }

    logout() {
        logoutUser().then(response => {
            self.props.history.push("/")
            self.props.changeIsLoggedIn(false);
        });
    }

    render() {
        let navBarContent
        if ( !this.props.isLoggedIn ) {
            navBarContent = <NavigationPublic />
        } else {
            let innerNavBarContent
            if ( this.state.userDetails != null ) {
                if (this.state.userDetails.roles.some(x => x.key === 'ADMIN')) {
                    innerNavBarContent = <NavigationAdmin  />
                } else if (this.state.userDetails.roles.some(x => x.key === 'SERVICE_PROVIDER')) {
                    innerNavBarContent = <NavigationServiceProvider />
                } else if (this.state.userDetails.roles.some(x => x.key === 'CUSTOMER')) {
                    innerNavBarContent = <NavigationCustomer  />
                }
                navBarContent =
                    <Navbar.Collapse id="basic-navbar-nav">
                        { innerNavBarContent }
                        <Navbar.Text className="px-2">
                                Signed in as:
                        </Navbar.Text>
                        <NavDropdown title={ this.state.userDetails != null ? this.state.userDetails.name : '' }  id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">My Account</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <div className="mx-2">
                                <Button variant="outline-info" size="sm" onClick={ this.logout } block>Logout</Button>
                            </div>
                        </NavDropdown>
                    </Navbar.Collapse>
            }
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
    render(props) {
        return (
            <NavBar history={ this.props.history } changeIsLoggedIn={ this.props.changeIsLoggedIn } isLoggedIn = { this.props.isLoggedIn }/>
        )
    }
}

export default withRouter(Navigation)