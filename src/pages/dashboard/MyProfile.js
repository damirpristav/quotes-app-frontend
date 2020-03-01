import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getAllUserQuotes } from '../../store/actions/quoteActions';
import { deleteProfile } from '../../store/actions/userActions';
import ProfileInfo from '../../components/UI/ProfileInfo';

const MyProfile = () => {
  const [numOfUserQuotes, setNumOfUserQuotes] = useState('Loading...');
  const user = useSelector(state => state.user.user);
  const userQuotes = useSelector(state => state.quote.userQuotes);
  const loading = useSelector(state => state.quote.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserQuotes(user.id));
  }, [dispatch, user]);

  useEffect(() => {
    if(userQuotes && !loading) {
      setNumOfUserQuotes(userQuotes.length);
    }
  }, [userQuotes, loading]);

  const deleteProfileHandler = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete your profile ?');
    if(isConfirmed) {
      dispatch(deleteProfile(user.id));
    }
  }

  return (
    <div className="profile content-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4>Welcome Damir, this is your profile</h4>
            <div className="actions">
              <Link to="/edit-profile" className="btn btn-secondary btn-small">Edit Profile</Link>
              <Link to={`/profile/${user.username}`} className="btn btn-secondary btn-small">Public Profile</Link>
            </div>
            <ProfileInfo
              fname={user.fname}
              lname={user.lname}
              email={user.email}
              username={user.username}
              date={user.date}
              numOfQuotes={numOfUserQuotes}
            />
            <div className="actions">
              <button
                className="btn btn-danger btn-small"
                style={{ marginTop: '1em' }}
                onClick={deleteProfileHandler}
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;