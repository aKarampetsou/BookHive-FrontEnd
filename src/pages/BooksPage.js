import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Alert } from '@mui/material';

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false); // Για το Add Book modal
  const [updateOpen, setUpdateOpen] = useState(false); // Για το Update modal
  const [selectedBook, setSelectedBook] = useState(null); // Το βιβλίο για ενημέρωση
  const [newBook, setNewBook] = useState({ title: '', authorName: '', authorSurname: '', isbn: '' });
  const [error, setError] = useState(null); // Κατάσταση για το μήνυμα σφάλματος

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token'); // Παίρνουμε το token από το localStorage
      const response = await fetch('http://localhost:8080/api/books', {
        headers: {
          Authorization: `Bearer ${token}`, // Προσθέτουμε το token στην επικεφαλίδα
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        console.error('Error fetching books:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddBook = async () => {
    setError(null);
    try {
      const token = localStorage.getItem('token'); // Παίρνουμε το token από το localStorage
      const response = await fetch('http://localhost:8080/api/books/addBookWithAuthor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Προσθέτουμε το token στην επικεφαλίδα
        },
        body: JSON.stringify(newBook),
      });
      if (response.ok) {
        fetchBooks();
        setOpen(false);
        setNewBook({ title: '', authorName: '', authorSurname: '', isbn: '' });
      } else if (response.status === 409) {
        setError("This book already exists in the database.");
      } else {
        setError('Failed to save book.');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      setError('Something went wrong!');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const token = localStorage.getItem('token'); // Παίρνουμε το token από το localStorage
        const response = await fetch(`http://localhost:8080/api/books/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`, // Προσθέτουμε το token στην επικεφαλίδα
          },
        });
        if (response.ok) {
          fetchBooks();
        } else {
          console.error('Error deleting book:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  const handleUpdateBook = async () => {
    try {
      const token = localStorage.getItem('token'); // Παίρνουμε το token από το localStorage
      const response = await fetch(`http://localhost:8080/api/books/${selectedBook.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Προσθέτουμε το token στην επικεφαλίδα
        },
        body: JSON.stringify(selectedBook),
      });
      if (response.ok) {
        fetchBooks();
        setUpdateOpen(false);
      } else {
        console.error('Error updating book:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Books List</h1>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add Book</Button>
      </div>

      {error && <Alert severity="error" style={{ marginBottom: '20px' }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table aria-label="books table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id} hover>
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author.name} {book.author.surname}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>
                  <Button variant="contained" color="success" onClick={() => { setSelectedBook(book); setUpdateOpen(true); }}>Update</Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => handleDelete(book.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent>
          <TextField label="Title" fullWidth value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} />
          <TextField label="Author Name" fullWidth value={newBook.authorName} onChange={(e) => setNewBook({ ...newBook, authorName: e.target.value })} />
          <TextField label="Author Surname" fullWidth value={newBook.authorSurname} onChange={(e) => setNewBook({ ...newBook, authorSurname: e.target.value })} />
          <TextField label="ISBN" fullWidth value={newBook.isbn} onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleAddBook} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
        <DialogTitle>Update Book</DialogTitle>
        <DialogContent>
          <TextField label="Title" fullWidth value={selectedBook?.title || ''} onChange={(e) => setSelectedBook({ ...selectedBook, title: e.target.value })} />
          <TextField label="Author Name" fullWidth value={selectedBook?.author?.name || ''} onChange={(e) => setSelectedBook({ ...selectedBook, author: { ...selectedBook.author, name: e.target.value } })} />
          <TextField label="Author Surname" fullWidth value={selectedBook?.author?.surname || ''} onChange={(e) => setSelectedBook({ ...selectedBook, author: { ...selectedBook.author, surname: e.target.value } })} />
          <TextField label="ISBN" fullWidth value={selectedBook?.isbn || ''} onChange={(e) => setSelectedBook({ ...selectedBook, isbn: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleUpdateBook} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BooksPage;