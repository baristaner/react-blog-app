import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, TextareaAutosize, Button, Container, Typography } from '@mui/material';
import Navbar from './Navbar';

function EditPost() {
  const { postId } = useParams();
  const [post, setPost] = useState({ title: '', content: '' });
  const jwt = localStorage.getItem("blog_auth");

  useEffect(() => {
    fetch(`http://localhost:3000/admin/edit/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
      });
  }, [postId]);

  const handleTitleChange = (e) => {
    setPost({ ...post, title: e.target.value });
  };

  const handleContentChange = (e) => {
    setPost({ ...post, content: e.target.value });
  };

  const handleUpdatePost = () => {
    fetch(`http://localhost:3000/updatepost?id=${postId}&title=${post.title}&content=${post.content}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Post updated:', data);
      })
      .catch((error) => {
        console.error('Error updating post:', error);
      });
  };

  return (
    <>
    <Navbar />
    <Container style={{paddingTop:"10px"}}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Post
      </Typography>
      <form>
        <TextField
          label="Title"
          fullWidth
          value={post.title}
          onChange={handleTitleChange}
        />
        <TextareaAutosize
  label="Content"
  fullWidth
  minRows={5}
  value={post.content}
  onChange={handleContentChange}
  style={{ width: '100%'}}
/>
      </form>
        <Button variant="contained" color="primary" onClick={handleUpdatePost}>
          Update Post
        </Button>
    </Container>
    </>
  );
}

export default EditPost;
