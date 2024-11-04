import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [open, setOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState({ name: '', surname: '' });
  const [editAuthor, setEditAuthor] = useState(null);

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

  const handleAddAuthor = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/authors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAuthor),
      });
      if (response.ok) {
        fetchAuthors();
        setNewAuthor({ name: '', surname: '' });
        setOpen(false);
      }
    } catch (error) {
      console.error('Error adding author:', error);
    }
  };

  const handleUpdateAuthor = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/authors/${editAuthor.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editAuthor),
      });
      if (response.ok) {
        fetchAuthors();
        setEditAuthor(null);
      }
    } catch (error) {
      console.error('Error updating author:', error);
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

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Authors List</h1>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
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
                  <Button variant="contained" color="success" onClick={() => setEditAuthor(author)}>
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
        <DialogTitle>Add New Author</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={newAuthor.name}
            onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
          />
          <TextField
            label="Surname"
            fullWidth
            margin="dense"
            value={newAuthor.surname}
            onChange={(e) => setNewAuthor({ ...newAuthor, surname: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddAuthor} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {editAuthor && (
        <Dialog open={Boolean(editAuthor)} onClose={() => setEditAuthor(null)}>
          <DialogTitle>Update Author</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              margin="dense"
              value={editAuthor.name}
              onChange={(e) => setEditAuthor({ ...editAuthor, name: e.target.value })}
            />
            <TextField
              label="Surname"
              fullWidth
              margin="dense"
              value={editAuthor.surname}
              onChange={(e) => setEditAuthor({ ...editAuthor, surname: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditAuthor(null)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdateAuthor} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default AuthorsPage;