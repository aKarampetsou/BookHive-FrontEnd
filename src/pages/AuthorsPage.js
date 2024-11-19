import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';

function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState({ name: '', surname: '' });
  const [editMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const token = localStorage.getItem('token'); // Παίρνουμε το token από το localStorage
      const response = await fetch('http://localhost:8080/api/authors', {
        headers: {
          Authorization: `Bearer ${token}`, // Προσθέτουμε το token στην επικεφαλίδα
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAuthors(data);
      } else {
        console.error('Error fetching authors:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const handleSaveAuthor = async () => {
    const url = editMode
      ? `http://localhost:8080/api/authors/${currentAuthor.id}`
      : 'http://localhost:8080/api/authors';
    const method = editMode ? 'PUT' : 'POST';

    try {
      const token = localStorage.getItem('token'); // Παίρνουμε το token από το localStorage
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Προσθέτουμε το token στην επικεφαλίδα
        },
        body: JSON.stringify(currentAuthor),
      });

      if (response.ok) {
        fetchAuthors();
        setOpen(false);
        setCurrentAuthor({ name: '', surname: '' });
        setEditMode(false);
        setErrorMessage('');
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText || 'Failed to save author!');
      }
    } catch (error) {
      console.error(`Error ${editMode ? 'updating' : 'adding'} author:`, error);
      setErrorMessage('Something went wrong!');
    }
  };

  const handleDeleteAuthor = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Παίρνουμε το token από το localStorage
      const response = await fetch(`http://localhost:8080/api/authors/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Προσθέτουμε το token στην επικεφαλίδα
        },
      });
      if (response.ok) {
        setAuthors(authors.filter((author) => author.id !== id));
      } else {
        console.error('Error deleting author:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  const openModal = (author = { name: '', surname: '' }, isEdit = false) => {
    setCurrentAuthor(author);
    setEditMode(isEdit);
    setErrorMessage('');
    setOpen(true);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Authors List</h1>
        <Button variant="contained" color="primary" onClick={() => openModal()}>
          Add Author
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors.map((author) => (
              <TableRow key={author.id}>
                <TableCell>{author.id}</TableCell>
                <TableCell>{author.name}</TableCell>
                <TableCell>{author.surname}</TableCell>
                <TableCell>
                  <Button variant="contained" color="success" onClick={() => openModal(author, true)}>
                    Update
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => handleDeleteAuthor(author.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editMode ? 'Update Author' : 'Add New Author'}</DialogTitle>
        <DialogContent>
          {errorMessage && (
            <Typography color="error" variant="body2" style={{ marginBottom: '10px' }}>
              {errorMessage}
            </Typography>
          )}
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={currentAuthor.name}
            onChange={(e) => setCurrentAuthor({ ...currentAuthor, name: e.target.value })}
          />
          <TextField
            label="Surname"
            fullWidth
            margin="dense"
            value={currentAuthor.surname}
            onChange={(e) => setCurrentAuthor({ ...currentAuthor, surname: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveAuthor} color="primary">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AuthorsPage;