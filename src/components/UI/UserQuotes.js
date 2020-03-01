import React from 'react';
import { Link } from 'react-router-dom';

const UserQuotes = (props) => {
  return (
    <div className="my-quotes">
      {props.quotes.map(quote => (
        <section key={quote.id}>
          <div>
            <blockquote>
              {quote.text}
            </blockquote>
            <p>&mdash; {quote.author}</p>
            {!props.hideQuoteFooter &&
              <footer>
                <div className="actions">
                  <Link to={`/edit-quote/${quote.id}`} className="btn btn-info btn-small">Edit</Link>
                  <button className="btn btn-danger btn-small" onClick={() => props.onDelete(quote.id)}>Delete</button>
                </div>
              </footer>
            }
          </div>
        </section>
      ))}
    </div>
  );
}

export default UserQuotes;