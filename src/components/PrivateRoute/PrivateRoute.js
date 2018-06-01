import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connectAuth } from 'core';

class PrivateRoute extends Component {
  render () {
    const { auth, ...props } = this.props;

    if (auth.isAuthenticated) {
      return (
        <Route {...props}/>
      );
    } else {
      return (
        <Redirect to="/login"/>
      );
    }
  }
}

export default connectAuth(undefined, {})(PrivateRoute);