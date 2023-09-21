import React from 'react';
import PostList from '../components/PostList';
import Navbar from './Navbar';

function HomePage() {
  return (
    <>
      <Navbar />
      <PostList />
    </>
  );
}

export default HomePage;
