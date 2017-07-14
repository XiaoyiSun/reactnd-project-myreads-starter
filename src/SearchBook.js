import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import serializeForm from 'form-serialize';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class SearchBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  searchBooks = (query) => {
    BooksAPI.search(query, 20).then((books) => {
      this.setState({ books });
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formValues = serializeForm(event.target, { hash: true });
    this.searchBooks(formValues.searchQuery);
  }

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <form onSubmit={this.handleSubmit} className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              name="searchQuery"
            />
          </form>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  onUpdateBookShelf={this.updateBookShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBook;
