import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Değişiklik burada
import HomePage from './components/Homepage'; // Dosya adı düzeltilmiş
import LoginPage from './components/LoginPage';
import PostList from './components/PostList';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <Router>
      <Routes> {/* Değişiklik burada */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/posts" component={PostList} />
      </Routes> {/* Değişiklik burada */}
    </Router>
  );
}

export default App;
