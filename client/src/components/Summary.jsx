import React from 'react';
import BookSummary from './BookSummary.jsx';

const Summary = (props) => (

  <div className="book-summary">
    {
      props.summaries.map((summary, index) => {
        return (
          < BookSummary summary={summary} key={index} />
        );
      })
    }
  </div>
);

export default Summary;




