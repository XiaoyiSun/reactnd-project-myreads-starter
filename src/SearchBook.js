import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class SearchBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      message: '',
    };
  }

  searchBooks = (query) => {
    BooksAPI.search(query, 20)
      .then((books) => {
        const booksNotOnMyReads = books.filter(book => this.props.myBooks.some(b => b.id !== book.id));
        const booksOnMyReads = books.filter(book => this.props.myBooks.some(b => b.id === book.id));
        this.setState({ books: [...booksNotOnMyReads, ...booksOnMyReads], message: '' });
      })
      .catch((err) => {
        this.setState({ books: [], message: 'No book found.' });
      });
  }

  handleSubmit = (event) => {
    if (!event.target.value) {
      this.setState({ books: [], message: '' });
    } else {
      this.searchBooks(event.target.value.trim());
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <form className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              name="searchQuery"
              onChange={this.handleSubmit}
            />
          </form>
        </div>
        <div className="search-books-results">
          {this.state.message &&
            <h2 className="search-no-results-msg">
              {this.state.message}
            </h2>
          }
          <ol className="books-grid">
            {this.state.books.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  onUpdateBookShelf={this.props.updateBookShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

SearchBook.propTypes = {
  myBooks: PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
};

export default SearchBook;
