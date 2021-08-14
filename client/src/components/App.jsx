import React from 'react';
import ReactDOM from 'react-dom';
import Summary from './Summary.jsx';
import axios from 'axios';
import '../assets/styles.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summaries: []
    };
  }

  componentDidMount() {
    this.getBookSummary();
  }

  getBookSummary() {
    const query = new URLSearchParams(location.search);
    console.log(query);
    let bookId = query.get('bookId');
    console.log(bookId);
    if (bookId === null) {
      bookId = '1';
    }
    axios.get(`http://localhost:1220/api/summary/${bookId}`)
      .then((response) => {
        console.log(response.data);
        this.setState({summaries: response.data});
      })
      .catch(err => console.log(err));
  }
  render() {
    if (this.state.summaries.length <= 0) {
      return (
        <div style={{
          color: 'blue', padding: '25px',
          fontFamily: 'Arial', textalign: 'center'
        }}>Oops — we can’t find the page you’re looking for. Head back to the homepage and try again with another book!</div>
      );
    } else {
      return (
        <div>
          <Summary summaries={this.state.summaries} />
        </div>
      );
    }
  }
}

export default App;
