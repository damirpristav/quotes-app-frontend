import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return(
    <Route {...rest} render={props => 
      !isAuthenticated 
        ? <Component {...props} />
        : <Redirect to="/dashboard" />
    } />
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated
  }
}

export default connect(mapStateToProps)(PublicRoute);