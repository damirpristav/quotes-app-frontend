import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return(
    <Route {...rest} render={props => 
      isAuthenticated && localStorage.getItem('q_app_token') 
        ? <Component {...props} />
        : <Redirect to="/login" />
    } />
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated
  }
}

export default connect(mapStateToProps)(PrivateRoute);