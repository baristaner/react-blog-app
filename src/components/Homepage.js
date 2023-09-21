import React,{useState} from 'react';
import { AppBar, Toolbar, Typography, Container, Button,Box,IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PostList from '../components/PostList';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [isUserLoggedIn,setUserLoggedIn] = useState(false);
  const loggedIn = localStorage.getItem("blog_auth");

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem("blog_auth");
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Blog Uygulaması</Typography>
          {loggedIn ? (
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleLogout}
            >

              <AccountCircle />
            </IconButton>
      ) : (
        <Button color="inherit" onClick={handleLoginClick}>Login</Button>
      )}
        
        </Toolbar>
      </AppBar>
      </Box>
      <Container>
      <PostList />
      </Container>
    
    </>
  );
}

export default HomePage;
