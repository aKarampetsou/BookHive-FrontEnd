import React, { createContext, useState, useEffect } from 'react';
import axios from '../axios';

// Δημιουργία του Context για το Authentication
export const AuthContext = createContext();

/*το AuthProvider λειτουργεί σαν "περιβάλλον" μέσα στο οποίο εκτελείται η εφαρμογή, επιτρέποντας στα components
 να έχουν πρόσβαση σε πληροφορίες όπως τα στοιχεία του χρήστη, το αν είναι συνδεδεμένος, κ.λπ., χωρίς να χρειάζεται να περνάμε 
 αυτά τα δεδομένα με props σε κάθε component ξεχωριστά. */


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); /*Η useState δημιουργεί μια μεταβλητή user και μια συνάρτηση setUser που θα
   χρησιμοποιούμε για να ενημερώνουμε την κατάσταση του χρήστη. Η αρχική τιμή του user είναι null, που σημαίνει ότι ο χρήστης 
   δεν είναι συνδεδεμένος στην αρχή.*/
  const [loading, setLoading] = useState(true); //Το loading δείχνει αν η εφαρμογή ακόμα φορτώνει τα δεδομένα του χρήστη(true) ή έχει ολοκληρωθεί η φόρτωση(false).

  // Συνάρτηση login
  const login = async (username, password) => {
    try {
      const response = await axios.post('/auth/login', { username, password });
      setUser(response.data.user); // Αποθηκεύουμε τα στοιχεία του χρήστη
      localStorage.setItem('token', response.data.token); // Αποθηκεύουμε το token στο localStorage
      return true; // Επιτυχής σύνδεση 
    } catch (error) {
      console.error('Login error:', error);
      return false; // Αποτυχία σύνδεσης
    }
  };

  // Συνάρτηση logout
  const logout = () => {
    setUser(null); // Διαγράφουμε τα στοιχεία του χρήστη
    localStorage.removeItem('token'); // Διαγράφουμε το token από το localStorage
  };

  // Όταν φορτώνει η εφαρμογή, το useEffect hook τσεκάρει εαν υπάρχει token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/auth/me') // Ζητά τα στοιχεία του χρήστη με βάση το token
        .then(response => setUser(response.data.user))
        .catch(() => logout())
        .finally(() => setLoading(false)); // ολοκληρώνει τη φόρτωση
    } else {
      setLoading(false); // Στην περ'ιπτωση που δεν υπάρχει token, σταματά 
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};