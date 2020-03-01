import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Quotes from '../pages/Quotes';
import UserProfile from '../pages/UserProfile';
import UserVerification from '../pages/UserVerification';
import Dashboard from '../pages/dashboard/Dashboard';
import AddQuote from '../pages/dashboard/AddQuote';
import EditQuote from '../pages/dashboard/EditQuote';
import MyProfile from '../pages/dashboard/MyProfile';
import EditProfile from '../pages/dashboard/EditProfile';
import NotFound from '../pages/NotFound';
import PrivateRoute from './common/PrivateRoute';
import PublicRoute from './common/PublicRoute';
import LoadingScreen from './common/LoadingScreen';

const Routes = () => {
  const loading = useSelector(state => state.user.loading);

  if(loading) {
    return <LoadingScreen />;
  }

  return(
    <Switch>
      <Route exact path="/" component={Landing} />
      <PublicRoute exact path="/login" component={Login} />
      <PublicRoute exact path="/register" component={Register} />
      <Route exact path="/quotes" component={Quotes} />
      <Route exact path="/profile/:username" component={UserProfile} />
      <Route exact path="/verifyUser/:token" component={UserVerification} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/add-quote" component={AddQuote} />
      <PrivateRoute exact path="/edit-quote/:id" component={EditQuote} />
      <PrivateRoute exact path="/my-profile" component={MyProfile} />
      <PrivateRoute exact path="/edit-profile" component={EditProfile} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;