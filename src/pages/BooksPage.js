import React, { useEffect, useState } from 'react';
import axios from '../axios';

function BooksPage() {
  const [books, setBooks] = useState([]);

  // Χρήση του useEffect για να φορτωθούν τα βιβλία κατά την πρώτη φόρτωση της σελίδας
  useEffect(() => {
    axios.get('/books')
      .then((response) => setBooks(response.data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  return (
    <div>
      <h1>Books List</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title} (ISBN: {book.isbn})</li>
        ))}
      </ul>
    </div>
  );
}

export default BooksPage;
