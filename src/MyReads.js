import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

const MyReads = ({ books, updateBookShelf }) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        <BookShelf
          shelfTitle="Currently Reading"
          books={books.filter(book => book.shelf === 'currentlyReading')}
          updateBookShelf={updateBookShelf}
        />
        <BookShelf
          shelfTitle="Want to Read"
          books={books.filter(book => book.shelf === 'wantToRead')}
          updateBookShelf={updateBookShelf}
        />
        <BookShelf
          shelfTitle="Read"
          books={books.filter(book => book.shelf === 'read')}
          updateBookShelf={updateBookShelf}
        />
      </div>
    </div>
    <div className="open-search">
      <Link to="search">Add a book</Link>
    </div>
  </div>
);

MyReads.propTypes = {
  books: PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
};

export default MyReads;
