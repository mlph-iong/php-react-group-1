import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./Navigation.css";
import NavigationPublic from "./NavigationPublic"
import NavigationAdmin from "./NavigationAdmin"
import NavigationServiceProvider from "./NavigationServiceProvider"
import NavigationCustomer from "./NavigationCustomer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isLoggedInChecker, logout, getUserDetails } from "../utils/Utils"
import axios from 'axios'

class NavBar extends Component {

    constructor() {
        super()
        this.state = {
            userDetails: null,
        }
        self = this;
        this.setGlobalAuthorizationBearer();
        this.getUserDetails();
    }

    getUserDetails() {
        if(isLoggedInChecker()) {
            getUserDetails().then((response) => {
                if(response.data.success) {
                    this.setState({ userDetails: response.data.data });
                }
            });
        }
    }

    setGlobalAuthorizationBearer() {
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("usertoken");
    }

    logout() {
        logout().then(response => {
            self.props.history.push("/")
            window.location.reload()
        });
    }

    render() {
        let navBarContent
        let isLoggedIn = isLoggedInChecker()
        if ( !isLoggedIn ) {
            localStorage.removeItem("usertoken");
            navBarContent = <NavigationPublic />
        } else {
            if (this.state.userDetails != null) {
                if (this.state.userDetails.roles.some(x => x.key === 'ADMIN')) {
                    navBarContent = <NavigationAdmin 
                            roles={this.state.userDetails != null ? this.state.userDetails.roles : ''}
                            name={ this.state.userDetails != null ? this.state.userDetails.name : '' } 
                            logoutHander={ this.logout } />
                } else if (this.state.userDetails.roles.some(x => x.key === 'SERVICE_PROVIDER')) {
                    navBarContent = <NavigationServiceProvider 
                            roles={this.state.userDetails != null ? this.state.userDetails.roles : ''}
                            name={ this.state.userDetails != null ? this.state.userDetails.name : '' } 
                            logoutHander={ this.logout } />
                } else if (this.state.userDetails.roles.some(x => x.key === 'CUSTOMER')) {
                    navBarContent = <NavigationCustomer 
                            roles={this.state.userDetails != null ? this.state.userDetails.roles : ''}
                            name={ this.state.userDetails != null ? this.state.userDetails.name : '' } 
                            logoutHander={ this.logout } />
                }
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
    render() {
        return (
            <NavBar history={ this.props.history }/>
        )
    }
}

export default withRouter(Navigation)