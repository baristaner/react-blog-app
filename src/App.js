import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button'; // Button bileşenini ekledik
import HomePage from './components/Homepage';
import LoginPage from './components/LoginPage';
import PostList from './components/PostList';
import Dashboard from './components/Dashboard';
import EditPostPage from './components/EditPost';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0b276e', // Bordo
    },
    secondary: {
      main: '#333', // Koyu Gri
    },
    background: {
      default: '#', // Ana arka plan rengi (koyu gri)
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit/:id" element={<EditPostPage />} />
          <Route path="/posts" component={PostList} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
