import React, { useEffect, useState } from 'react';
import axios from '../axios';

function AuthorsPage() {
  const [authors, setAuthors] = useState([]);

  // Φόρτωση συγγραφέων κατά την πρώτη φόρτωση της σελίδας
  useEffect(() => {
    axios.get('/authors')
      .then((response) => setAuthors(response.data))
      .catch((error) => console.error('Error fetching authors:', error));
  }, []);

  return (
    <div>
      <h1>Authors List</h1>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>{author.name} {author.surname}</li>
        ))}
      </ul>
    </div>
  );
}

export default AuthorsPage;
