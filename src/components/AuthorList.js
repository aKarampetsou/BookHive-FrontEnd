import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Χρησιμοποιούμε axios για να κάνουμε αιτήματα στο backend

const AuthorList = () => {
  const [authors, setAuthors] = useState([]); // Ορίζουμε το state για τους συγγραφείς

  useEffect(() => {
    // Κάνουμε αίτημα στο backend για να πάρουμε τη λίστα των συγγραφέων
    axios.get('http://localhost:8080/api/authors')
      .then(response => setAuthors(response.data)) // Αποθηκεύουμε τα δεδομένα στο state
      .catch(error => console.error('Error fetching authors:', error)); // Σε περίπτωση σφάλματος, εμφανίζεται μήνυμα στο console
  }, []);

  return (
    <div>
      {authors.map(author => (
        <div key={author.id}> {/* Εμφανίζουμε κάθε συγγραφέα */}
          <h3>{author.name} {author.surname}</h3>
          <ul>
            {/* Εμφάνιση των βιβλίων του συγγραφέα */}
            {author.books.map(book => (
              <li key={book.id}>{book.title} (ISBN: {book.isbn})</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AuthorList;
