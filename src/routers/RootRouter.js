import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Register from '../screens/RegisterScreen'
import Login from '../screens/LoginScreen'
import Main from './MainRouter'

const RootRouter = () => {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  )
}

export default RootRouter
