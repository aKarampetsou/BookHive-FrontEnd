import React from 'react';

function Book({ book }) {
  return (
    <div>
      <h2>{book.title}</h2>  {/* Εμφάνιση του τίτλου του βιβλίου */}
      <p>ISBN: {book.isbn}</p>  {/* Εμφάνιση του ISBN του βιβλίου */}
      <p>Author: {book.author.name} {book.author.surname}</p>  {/* Εμφάνιση του συγγραφέα */}
    </div>
  );
}

export default Book;
