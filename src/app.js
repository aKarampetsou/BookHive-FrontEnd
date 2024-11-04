import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AuthorsPage from './pages/AuthorsPage';
import BooksPage from './pages/BooksPage';
import MainPage from './pages/MainPage'; // Κεντρική σελίδα μετά το login
import { AuthProvider, AuthContext } from './context/AuthContext';

// Το PrivateRoute είναι συνάρτηση που ελέγχει αν ο χρήστης είναι συνδεδεμένος ώστε να παρέχει προστασία για διαδρομές (routes) που απαιτούν σύνδεση
function PrivateRoute({ children }) {
  const { user } = React.useContext(AuthContext); // Ελέγχουμε αν υπάρχει συνδεδεμένος χρήστης
  return user ? children : <Navigate to="/" />; // Ανακατεύθυνση στην αρχική σελίδα αν ο χρήστης δεν είναι συνδεδεμένος
}

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Αρχική σελίδα πριν το login */}

        {/* Προστατευμένη διαδρομή για το MainPage (κεντρική σελίδα μετά το login) */}
        <Route 
          path="/main" 
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          } 
        />

        {/* Προστατευμένες διαδρομές για συγγραφείς */}
        <Route 
          path="/authors" 
          element={
            <PrivateRoute>
              <AuthorsPage />
            </PrivateRoute>
          } 
        />

        {/* Προστατευμένες διαδρομές για βιβλία */}
        <Route 
          path="/books" 
          element={
            <PrivateRoute>
              <BooksPage />
            </PrivateRoute>
          } 
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;