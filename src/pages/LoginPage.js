import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Εισάγουμε το AuthContext για να έχουμε πρόσβαση στη συνάρτηση login
import { Button, TextField, Snackbar } from '@mui/material'; 

function LoginPage() {
  // Παίρνουμε τη συνάρτηση login από το AuthContext, που μας επιτρέπει να συνδεθούμε
  const { login } = useContext(AuthContext);

  // Ορίζουμε state για το username, όπου θα αποθηκεύεται το όνομα χρήστη που πληκτρολογεί ο χρήστης
  const [username, setUsername] = useState('');

  // Ορίζουμε state για το password, όπου θα αποθηκεύεται ο κωδικός πρόσβασης που πληκτρολογεί ο χρήστης
  const [password, setPassword] = useState('');

  // Ορίζουμε state για να ελέγχουμε αν υπάρχει κάποιο σφάλμα στη σύνδεση.
  // Αν το login αποτύχει, αυτή η μεταβλητή θα γίνει true και θα εμφανιστεί ένα μήνυμα σφάλματος
  const [error, setError] = useState(false);

  // Η συνάρτηση που εκτελείται όταν ο χρήστης πατάει το κουμπί "Login" στο φόρμα
  const handleSubmit = async (e) => {
    e.preventDefault(); // Αποτρέπουμε την ανανέωση της σελίδας όταν υποβάλλεται η φόρμα

    // Καλούμε τη συνάρτηση login με τα δεδομένα username και password και περιμένουμε το αποτέλεσμα
    const success = await login(username, password);

    // Αν το login αποτύχει (success είναι false), ενεργοποιούμε το error state 
    if (!success) {
      setError(true);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {/* Φόρμα για τα στοιχεία σύνδεσης */}
      <form onSubmit={handleSubmit}>
        
        <TextField
          label="Username" 
          variant="outlined" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} // Ανανεώνουμε το state όταν αλλάζει το περιεχόμενο του πεδίου
          fullWidth // Κάνει το πεδίο να καταλαμβάνει όλο το πλάτος του container
        />

        {/* Πεδίο εισαγωγής για το password */}
        <TextField
          label="Password" 
          type="password" 
          variant="outlined" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} // Ανανεώνουμε το state όταν αλλάζει το περιεχόμενο του πεδίου
          fullWidth // Κάνει το πεδίο να καταλαμβάνει όλο το πλάτος του container
        />

        {/* Κουμπί υποβολής */}
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>

      {/* Αν το login αποτύχει, εμφανίζεται ένα μήνυμα σφάλματος (μέσω του Snackbar)
       που ενημερώνει τον χρήστη ότι τα credentials δεν είναι σωστά. */}
      <Snackbar
        open={error} // Το Snackbar ανοίγει αν το error state είναι true
        autoHideDuration={6000} // Το μήνυμα κλείνει αυτόματα μετά από 6 δευτερόλεπτα
        onClose={() => setError(false)} // Κλείνουμε το Snackbar όταν τελειώσει το timeout ή ο χρήστης το κλείσει χειροκίνητα
        message="Invalid credentials" 
      />
    </div>
  );
}

export default LoginPage; 
