import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';

//Ορίζουμε την κυρια συνάρτηση AuthorsPageI() που δημιουργεί το component 
function AuthorsPage() {

  const [authors, setAuthors] = useState([]); // authors=μεταβλητή που κρατά την λίστα των συγγραφέων, αρχικοποιείται ως άδειο array 
  const [open, setOpen] = useState(false); // open=μεταβλητή που ελέγχει εάν το pop up παράθυρο είναι ανοιχτό 
  const [currentAuthor, setCurrentAuthor] = useState({ name: '', surname: '' }); // currectAuthor=μεταβλητή που κρατά τις πληροφορίες του συγγραφέα που επεξεργαζόμαστε ή προσθέτουμε
  const [editMode, setEditMode] = useState(false); /* editMode=μεταβληρή για προσδιορισμό αν κάνουμε επεξεργασία ή προσθήκη στο pop up παράθυρο,
  χρησιμοποιείται σε συνδυασμό με την συνάρτηση openModal και ισχύει ότι false=πορσθήκη και true=επεξεργασία*/
  const [errorMessage, setErrorMessage] = useState(''); // State για μήνυμα σφάλματος, αρχικό state χωρίς σφάλμα 

  //Με κάθε load της σελίδας η useEffect καλεί την fetchAuthors για να πάρει τους συγγραφείς από τον server 
  useEffect(() => {
    fetchAuthors();
  }, []);

  //Συνάρτηση fetchAuthors που χρησιμοποιεί promise. 
  //Εάν το promise είναι επιτυχές μετατρέπει τα δεδομένα σε JSON και τα περνάει στο state 'authors', διαφορετικά πετάει error.
  const fetchAuthors = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/authors');
      const data = await response.json();
      setAuthors(data);
    } 
    catch (error) {
      console.error('Error fetching authors:', error);
     }
  };


  //Συνάρτηση handleSaveAuthor που χρησιμοποιεί επίσης promise
  const handleSaveAuthor = async () => {
    const url = editMode
      ? `http://localhost:8080/api/authors/${currentAuthor.id}`//Αν το editMode=true χρησιμοποιούμε αυτό το url
      : 'http://localhost:8080/api/authors';// Ενώ το editMode=false χρησιμοποιούμε αυτό το url 
    const method = editMode ? 'PUT' : 'POST';// Αν editMode=true -> PUT request, ενώ αν editMode=false -> POST request

    try {
      const response = await fetch(url, { //κάνουμε fetch αίτημα στο url που ορίστηκε ακριβώς από πάνω 
        method, //το PUT ή POST αίτημα που ορίστηκε ακριβώς απο πάνω 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentAuthor), //μετατρέπουμε τα στοιχεία του currentAuthor σε JSON για να σταλουν μέσω του αιτήματος
      });

         if (response.ok) { //Αν το response.ok=true 
          fetchAuthors();//καλούμε την fetchAuthors για να ανανεώσει την λίστα των συγγραφεών 
          setOpen(false);//κλείνει το pop up form 
          setCurrentAuthor({ name: '', surname: '' }); //αρχικοποίηση της μεταβλητής σε κενές τιμές 
          setEditMode(false);
          setErrorMessage(''); // Καθαρισμός προηγούμενο error message
        } else {
         const errorText = await response.text(); // Παίρνουμε το μήνυμα σφάλματος από το backend
         setErrorMessage(errorText); // Θέτουμε το μήνυμα σφάλματος στο state
       }
     } 
    catch (error) {//διαχείριση απρόβλεπτου error
      console.error(`Error ${editMode ? 'updating' : 'adding'} author:`, error);
      setErrorMessage('Something went wrong!'); // Προκαθορισμένο μήνυμα σφάλματος
    }

  };

  //Συνάρτηση υπεύθυνη για την διαγραφή συγκεκριμένου συγγραφέα με βάση το id 
  const handleDeleteAuthor = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/authors/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setAuthors(authors.filter((author) => author.id !== id));/* στον πίνακα απο authors εφαρμόζεται η μέθοδος filter  που κρατάει μόνο 
        τους συγγραφείς των οποίων το id δεν είναι ίσο με το id που διαγράψαμε. Ο νέος πίνακας περνάει στη setAuthors, η οποία ενημερώνει το
        state authors ώστε να περιλαμβάνει μόνο τους υπόλοιπους συγγραφείς των οποίων το id δεν είναι ίσο με το id που διαγράψαμε*/
      }
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  //Συνάρτηση openModal υπεύθυνη για το ανοιγμα της φόρμας όταν κάνουμε προσθήκη ή επεξεργασία ενός συγγραφέα
  const openModal = (author = { name: '', surname: '' }, isEdit = false) => {//isEdit = false σημαίνει λειτουργία προσθήκης νέου συγγραφέα και όχι επεξεργασίας
    setCurrentAuthor(author);
    setEditMode(isEdit);
    setErrorMessage(''); // Καθαρισμός μηνύματος σφάλματος κατά το άνοιγμα του διαλόγου
    setOpen(true);
  };

  //UI
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Authors List</h1>
        <Button variant="contained" color="primary" onClick={() => openModal()}>
          Add Author
        </Button>
      </div>

       {/* Πίνακας των Συγγραφέων */}
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
            {authors.map((author) => ( //με την βοηθεια της js μεθόδου map δημιουργούμε τις γραμμές του πίνακα για κάθε συγγραφέα 
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
            onChange={(e) => setCurrentAuthor({ ...currentAuthor, name: e.target.value })}//τα ... δημιουγούν αντίγραφο του currentAuthor αλλάζοντας μόνο το πεδίο name με τη τιμή του χρήστη 
          />
          <TextField
            label="Surname"
            fullWidth
            margin="dense"
            value={currentAuthor.surname}
            onChange={(e) => setCurrentAuthor({ ...currentAuthor, surname: e.target.value })} //onchange=evert handler, 'e'=πληροφοριες του συμβάντος αλλαγής
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