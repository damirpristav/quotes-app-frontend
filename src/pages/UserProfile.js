import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getUserByUsername, resetErrorMessage, resetUserByUsername } from '../store/actions/userActions';
import { getAllUserQuotes } from '../store/actions/quoteActions';
import ProfileInfo from '../components/UI/ProfileInfo';
import ProfileQuote from '../components/UI/ProfileQuote';
import Loader from '../components/UI/Loader';

const UserProfile = () => {
  const username = useParams().username;
  const user = useSelector(state => state.user.userByUsername);
  const loading = useSelector(state => state.user.loading);
  const error = useSelector(state => state.user.error);
  const quotes = useSelector(state => state.quote.userQuotes);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetErrorMessage());
      dispatch(resetUserByUsername());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserByUsername(username));
  }, [dispatch, username]);

  useEffect(() => {
    if(user) {
      dispatch(getAllUserQuotes(user.id));
    }
  }, [user, dispatch]);

  return (
    <div className="profile content-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {loading ? <Loader />
              : user && !error ?
              <Fragment>
                <ProfileInfo
                  fname={user.fname}
                  lname={user.lname}
                  hideEmail
                  username={user.username}
                  date={user.date}
                  numOfQuotes={quotes.length}
                />
                <h4 className="text-center mv-3">{user.fname}'s Quotes</h4>
                <div className="my-quotes">
                  {quotes.map(quote => (
                    <ProfileQuote key={quote.id} text={quote.text} author={quote.author} />
                  ))}
                </div>
              </Fragment>
              : error && <p className="u-error text-center">{error}</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;