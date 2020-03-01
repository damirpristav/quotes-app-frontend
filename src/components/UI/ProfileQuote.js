import React from 'react';

const ProfileQuote = (props) => {
  return (
    <section>
      <div>
        <blockquote>
          {props.text}
        </blockquote>
        <p>&mdash; {props.author}</p>
      </div>
    </section>
  );
}

export default ProfileQuote;