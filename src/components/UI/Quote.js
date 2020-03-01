import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import bgImage from '../../assets/images/intro_bg.jpg';

const Quote = (props) => {
  return (
    <section className="quote">
      <div className="box" style={{backgroundImage: `url(${bgImage})`}}></div>
      <div className="text">
        <div className="inner-wrap">
          <div className="inner">
            <blockquote>
              {props.text}
            </blockquote>
            <p>{props.author}</p>
          </div>
        </div>
        <p className="by">
          submitted by 
          {props.user 
            ? <Fragment>{' '}<Link to={`/profile/${props.user.username}`}>{props.user.username}</Link></Fragment>
            : ' DELETED_USER'
          }
        </p>
      </div>
    </section>
  );
}

export default Quote;