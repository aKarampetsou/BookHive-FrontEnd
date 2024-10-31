import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';

function AuthorsDetailsPage() {
  const { id } = useParams(); // Παίρνουμε το ID από το URL
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    axios.get(`/authors/${id}`)
      .then((response) => setAuthor(response.data))
      .catch((error) => console.error('Error fetching author:', error));
  }, [id]);

  if (!author) return <p>Loading...</p>;

  return (
    <div>
      <h1>{author.name} {author.surname}</h1>
      <h2>Books:</h2>
      <ul>
        {author.books.map((book) => (
          <li key={book.id}>{book.title} (ISBN: {book.isbn})</li>
        ))}
      </ul>
    </div>
  );
}

export default AuthorDetailPage;

