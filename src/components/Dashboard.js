import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect,useCallback } from 'react';
import { Container, Card, Form, Button, Table, Modal } from 'react-bootstrap';
import axios from 'axios';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/posts/all')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Veri çekme hatası:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  
    try {
      const response = await axios.post('http://localhost:3000/admin/addpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 201) {
        // Başarılı post ekleme işlemi
        // Formu temizleme veya başka bir işlem yapma
        console.log('Post başarıyla eklendi.');
        e.target.reset(); // Formu temizleme
      } else {
        // Hata durumunda
        console.error('Post ekleme hatası:', response.data.error);
      }
    } catch (error) {
      console.error('Post ekleme hatası:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h1>Welcome to Admin Dashboard</h1>


      <Card className="mb-3">
        <Card.Header>Add New Post</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" required />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" name="content" required />
              <Form.Group controlId="image">
            </Form.Group>
           <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" accept="image/*" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Post
            </Button>
            
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>Posts</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td>{post.title}</td>
                  <td>{post.content}</td>
                 
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

    </Container>
  );
}

export default Dashboard;
