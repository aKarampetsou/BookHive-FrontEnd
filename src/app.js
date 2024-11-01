import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AuthorsPage from './pages/AuthorsPage';
import BooksPage from './pages/BooksPage';
import BookDetailPage from './pages/BookDetailPage';
import AuthorDetailPage from './pages/AuthorDetailPage';
import { AuthProvider } from './context/AuthContext'; // Εισάγουμε τον AuthProvider για το context του authentication

// Το app.js κύριο component της εφαρμογής κάτι σαν σημείο εκκίνησης 
function App() {
  return (
    /*AuthProvider: Εξασφαλίζει ότι τα δεδομένα του authentication (π.χ., αν ο χρήστης είναι συνδεδεμένος και το token)
     είναι διαθέσιμα σε κάθε μέρος της εφαρμογής που το χρειάζεται (component)*/
    <AuthProvider>
      {/* Router: Χρησιμοποιείται για να καθοδηγούμε την εφαρμογή στα σωστά components με βάση το URL */}
      <Router>
        <Navbar /> {/* Το navigation bar που εμφανίζεται σε όλες τις σελίδες */}

        {/* Routes: Ορίζουμε τις διαδρομές για κάθε σελίδα */}
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Αρχική σελίδα */}
          <Route path="/login" element={<LoginPage />} /> {/* Σελίδα σύνδεσης */}
          <Route path="/authors" element={<AuthorsPage />} /> {/* Λίστα συγγραφέων */}
          <Route path="/authors/:id" element={<AuthorsDetailsPage />} /> {/* Λεπτομέρειες για συγκεκριμένο συγγραφέα */}
          <Route path="/books" element={<BooksPage />} /> {/* Λίστα βιβλίων */}
          <Route path="/books/:id" element={<BooksDetailsPage />} /> {/* Λεπτομέρειες για συγκεκριμένο βιβλίο */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; 
