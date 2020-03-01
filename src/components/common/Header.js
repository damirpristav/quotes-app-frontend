import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../store/actions/userActions';

const Header = () => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/login');
  }

  return(
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-6 nav-left">
            <nav>
              <Link to="/">Home</Link>
              <Link to="/quotes">Quotes</Link>
              {isAuthenticated && <Link to="/dashboard">Dashboard</Link>}
            </nav>
          </div>
          <div className="col-6">
            <nav className="clearfix">
              <ul>
                {!isAuthenticated 
                  ? (
                    <Fragment>
                      <li><Link to="/register">Register</Link></li>
                      <li><Link to="/login">Login</Link></li>
                    </Fragment>
                  )
                  : (
                    <Fragment>
                      <li className="not-link">Hi {user.fname}</li>
                      <li><a href="/#" onClick={logoutHandler}>Logout</a></li>
                    </Fragment>
                  )
                }
                
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;