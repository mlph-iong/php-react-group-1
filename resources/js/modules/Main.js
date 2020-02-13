import React from 'react'
import {Route, Switch, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './home/Home'
import Login from './login/Login'
import Registration from './registration/Registration'
import Users from './users/Users'
import AddUser from './users/AddUser'
import EditUser from './users/EditUser'
import Services from './service/Services';
import ServiceAdd from './service/ServiceAdd';
import ServiceEdit from './service/ServiceEdit';

export default function Main() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Registration} />
      <Route path="/users" component={Users} />
      <Route path="/add-user" component={AddUser} />
      <Route path="/edit-user/:id" component={EditUser} />
      <Route path="/services" component={Services} />
      <Route path="/services-add" component={ServiceAdd} exact={true} />
      <Route path="/services-edit/:id" component={ServiceEdit} exact={true} />
    </Switch>
  )
}