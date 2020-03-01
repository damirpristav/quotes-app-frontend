import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { activateAccount, resetErrorMessage } from '../store/actions/userActions';
import Loader from '../components/UI/Loader';

const UserVerification = () => {
  const loading = useSelector(state => state.user.loading);
  const message = useSelector(state => state.user.message);
  const error = useSelector(state => state.user.error);
  const dispatch = useDispatch();
  const token = useParams().token;

  useEffect(() => {
    if(token) {
      dispatch(activateAccount(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    return () => {
      dispatch(resetErrorMessage());
    }
  }, [dispatch]);

  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="col-12">
          <div className="text-center">
            { loading && <Loader /> }
            { error && <p className="u-error">{error}</p> }
            { message && <p className="u-success">{message} - <Link to="/login">login</Link></p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserVerification;