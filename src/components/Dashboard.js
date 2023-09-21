import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useCallback } from "react";
import { Container, Card, Form, Button, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from './Navbar';

function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts/all")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Veri çekme hatası:", error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("blog_auth");
    console.log("Logged Out");
  };

  const handleSubmit = async (e) => {
    const jwt = localStorage.getItem("blog_auth");
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await axios.post(
        "http://localhost:3000/admin/addpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Post added succesfully");
        e.target.reset();
      } else {
        console.error("addPost Error:", response.data.error);
      }
    } catch (error) {
      console.error("addPost Error:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const jwt = localStorage.getItem("blog_auth");
      const response = await axios.delete(
        `http://localhost:3000/admin/deletepost/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (response.status === 200) {
        window.location.reload();
      } else {
        console.error("Post silme hatası:", response.data.error);
      }
    } catch (error) {
      console.error("Post silme hatası:", error);
    }
  };

  return (
    <>
    <Navbar/>
    <Container className="mt-5">
      <h1>Welcome to Admin Dashboard</h1>
      <Button variant="danger" onClick={handleLogout}>
        Log Out
      </Button>

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
              <Form.Group controlId="image"></Form.Group>
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
                  <td>
                    <Link to={`/edit/${post._id}`} className="btn btn-primary">
                      Edit
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => handleDeletePost(post._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
    </>
  );
}

export default Dashboard;
