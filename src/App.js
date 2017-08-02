import React from 'react';
import { Route } from 'react-router-dom';
import MyReads from './MyReads';
import SearchBook from './SearchBook';
import './App.css';
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  updateBookShelf = (book, shelf) => {
    // BooksAPI.update(book, shelf)
    //   .then(BooksAPI.getAll().then((books) => { this.setState({ books }); }));
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;

      // Filter out the book and append it to the end of the list
      // so it appears at the end of whatever shelf it was added to.
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book]),
      }));
    });
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <MyReads
              books={this.state.books}
              updateBookShelf={this.updateBookShelf}
            />)}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBook
              myBooks={this.state.books}
              updateBookShelf={this.updateBookShelf}
            />)}
        />
      </div>
    );
  }
}

export default BooksApp;
