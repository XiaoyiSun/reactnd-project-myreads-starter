import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookShelf = props => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.shelfTitle}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books.map(book => (
          <li key={book.id}>
            <Book
              book={book}
              onUpdateBookShelf={props.updateBookShelf}
            />
          </li>
        ))}
      </ol>
    </div>
  </div>
);

BookShelf.propTypes = {
  shelfTitle: PropTypes.string.isRequired,
  books: PropTypes.object.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
};

export default BookShelf;
