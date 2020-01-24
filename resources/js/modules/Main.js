import React from 'react'
import {Route, Switch, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './home/Home'
import Login from './login/Login'
import Registration from './registration/Registration'
import Users from './users/Users'
import Venues from './venues/Venues'
import Reservations from './reservations/Reservations'

export default function Main() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Registration} />
      <Route path="/users" component={Users} />
      <Route path="/venues" component={Venues} />
      <Route path="/reservations" component={Reservations} />
    </Switch>
  )
}