import React from 'react';
import dateFormat from 'dateformat';

const ProfileInfo = (props) => {
  return (
    <div className="profile-info">
      <div className="info">
        <h4>{props.fname} {props.lname}</h4>
        <p><strong>Username:</strong> {props.username}</p>
        {props.hideEmail ? null : <p><strong>Email:</strong> {props.email}</p>}
        <p><strong>Profile Created:</strong> {dateFormat(props.date, "dddd, mmmm dS, yyyy")}</p>
        <p><strong>Quotes:</strong> {props.numOfQuotes}</p>
      </div>
    </div>
  );
}

export default ProfileInfo;