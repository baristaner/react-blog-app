import React from 'react';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import PostList from '../components/PostList';

function HomePage() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Blog Uygulaması</Typography>
        </Toolbar>
      </AppBar>
      <Container>
      <PostList />
      </Container>
      
    </div>
  );
}

export default HomePage;
