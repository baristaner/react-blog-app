import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './components/Homepage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/Register';
import PostList from './components/PostList';
import Dashboard from './components/Dashboard';
import EditPost from './components/EditPost';
import PostDetails from './components/PostDetails';
import Profile from './components/Profile';

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
  spacing: 4,
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/edit/:postId" element={<EditPost />} />
          <Route path="/profile/:userId" element={<Profile />}/>
          <Route path="/posts" component={PostList} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
