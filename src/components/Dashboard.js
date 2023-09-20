import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Table, Modal } from 'react-bootstrap';
import axios from 'axios';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    // API'den verileri çekmek için bir istek gönderin
    axios.get('http://localhost:3000/posts/all')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Veri çekme hatası:', error);
      });
  }, []);

  const handleEdit = (post) => {
    setSelectedPost(post);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedPost(null);
    setShowEditModal(false);
  };

  const handleUpdatePost = () => {
    if (selectedPost) {
      const updatedPostData = {
        title: selectedPost.title,
        content: selectedPost.content,
      };
  
      axios
        .put(`http://localhost:3000/posts/updatepost/${selectedPost._id}`, updatedPostData)
        .then((response) => {
          console.log('Post updated successfully:', response.data);
          handleCloseEditModal(); // Modalı kapat
        })
        .catch((error) => {
          console.error('Post update error:', error);
          // Hata durumunda kullanıcıya bilgi verilebilir
        });
    }
  };
  
  
  
  
  
  return (
    <Container className="mt-5">
      <h1>Welcome to Admin Dashboard</h1>


      <Card className="mb-3">
        <Card.Header>Add New Post</Card.Header>
        <Card.Body>
          <Form action="/admin/addpost" method="POST">
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" required />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" name="content" required />
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td>{post.title}</td>
                  <td>{post.content}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      className="edit-button"
                      onClick={() => handleEdit(post)}
                    >
                      Edit
                    </Button>
                    {/* ... */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPost && (
            <Form>
              <Form.Group controlId="editTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="post_title"
                  value={selectedPost.title}
                  onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="editContent">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  name="post_content"
                  value={selectedPost.content}
                  onChange={(e) => setSelectedPost({ ...selectedPost, content: e.target.value })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdatePost}>
            Update Post
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Dashboard;
