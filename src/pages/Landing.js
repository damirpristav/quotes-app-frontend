import React from 'react';
import { Link } from 'react-router-dom';

import bgImage from '../assets/images/intro_bg.jpg';

const Landing = () => {
  return(
    <div className="intro" style={{backgroundImage: `url(${bgImage})`}}>
      <div className="overlay"></div>
      <div className="intro-text">
        <section>
          <h1>
            Most good programmers do programming not because they expect to get paid or get adulation 
            by the public, but because it is fun to program.
          </h1>
          <p>
            Want to submit some quotes ? Then <Link to="/register">Sign up</Link> and start submitting! Or{' '} 
            <Link to="/login">login</Link> if you already have an account.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Landing;