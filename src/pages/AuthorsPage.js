import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';

function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState({ name: '', surname: '' }); // Χρησιμοποιείται για νέο ή υπάρχον συγγραφέα
  const [editMode, setEditMode] = useState(false); // Για προσδιορισμό αν κάνουμε επεξεργασία ή προσθήκη
  const [errorMessage, setErrorMessage] = useState(''); // State για μήνυμα σφάλματος

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/authors');
      const data = await response.json();
      setAuthors(data);
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
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentAuthor),
      });

      if (response.ok) {
        fetchAuthors();
        setOpen(false);
        setCurrentAuthor({ name: '', surname: '' });
        setEditMode(false);
        setErrorMessage(''); // Καθαρισμός του μηνύματος σφάλματος σε περίπτωση επιτυχίας
      } else {
        const errorText = await response.text(); // Παίρνουμε το μήνυμα σφάλματος από το backend
        setErrorMessage(errorText); // Θέτουμε το μήνυμα σφάλματος στο state
      }
    } catch (error) {
      console.error(`Error ${editMode ? 'updating' : 'adding'} author:`, error);
      setErrorMessage('Something went wrong!'); // Προκαθορισμένο μήνυμα σφάλματος
    }
  };

  const handleDeleteAuthor = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/authors/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setAuthors(authors.filter((author) => author.id !== id));
      }
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  const openModal = (author = { name: '', surname: '' }, isEdit = false) => {
    setCurrentAuthor(author);
    setEditMode(isEdit);
    setErrorMessage(''); // Καθαρισμός μηνύματος σφάλματος κατά το άνοιγμα του διαλόγου
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

      {/* Dialog για προσθήκη και ενημέρωση συγγραφέα */}
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
