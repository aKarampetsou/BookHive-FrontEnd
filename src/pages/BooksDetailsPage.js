import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';

function BooksDetailsPage() {
  const { id } = useParams(); // Παίρνουμε το ID από το URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`/books/${id}`)
      .then((response) => setBook(response.data))
      .catch((error) => console.error('Error fetching book:', error));
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>ISBN: {book.isbn}</p>
      <p>Author: {book.author.name} {book.author.surname}</p>
    </div>
  );
}

export default BooksDetailsPage;
