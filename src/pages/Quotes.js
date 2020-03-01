import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllQuotes } from '../store/actions/quoteActions';
import Loader from '../components/UI/Loader';
import Quote from '../components/UI/Quote';

const Quotes = () => {
  const quotes = useSelector(state => state.quote.quotes);
  const loading = useSelector(state => state.quote.loading);
  const error = useSelector(state => state.quote.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllQuotes());
  }, [dispatch]);

  return(
    <div className="quotes">
      {error && <p className="u-error">{error}</p>}
      {loading && !error
        ? <Loader />
        : quotes.length > 0 ? quotes.map(quote => (
          <Quote key={quote.id} user={quote.createdBy} text={quote.text} author={quote.author} />
        ))
        : <h2>No quotes yet!</h2>
      }
    </div>
  );
}

export default Quotes;