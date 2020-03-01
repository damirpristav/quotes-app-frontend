import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getAllUserQuotes, deleteQuote, resetQuotesError } from '../../store/actions/quoteActions';
import UserQuotes from '../../components/UI/UserQuotes';
import Loader from '../../components/UI/Loader';

const Dashboard = () => {
  const quotes = useSelector(state => state.quote.userQuotes);
  const loading = useSelector(state => state.quote.loading);
  const error = useSelector(state => state.quote.error);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserQuotes(user.id));
  }, [dispatch, user]);

  useEffect(() => {
    return () => {
      dispatch(resetQuotesError());
    }
  }, [dispatch]);

  const quoteDeleteHandler = (id) => {
    console.log('quote deleted...', id);
    const isConfirmed = window.confirm('Do you want to delete this quote');
    if(isConfirmed) {
      dispatch(deleteQuote(id));
    }else{
      console.log('quote deletion canceled...');
    }
  }

  return (
    <div className="dashboard content-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4>Welcome {user.fname}, this is your dashboard</h4>
            <div className="actions">
              <Link to="/add-quote" className="btn btn-secondary btn-small">Add Quote</Link>
              <Link to="/my-profile" className="btn btn-secondary btn-small">My Profile</Link>
            </div>
            {error && <p className="u-error">{error}</p>}
            {loading ? <Loader />
              : quotes.length > 0 
                ? <UserQuotes quotes={quotes} onDelete={quoteDeleteHandler} />
                : <p>No quotes yet. Please add some!</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;