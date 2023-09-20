import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';



function EditPostPage() {
  const { id } = useParams(); // id parametresini al
  const [post, setPost] = useState({ title: '', content: '' });

  useEffect(() => {
    // Belirli bir postu çekmek için API isteği gönderin
    axios.get(`http://localhost:3000/posts/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error('Veri çekme hatası:', error);
      });
  }, [id]);

  const handleEditPost = async () => {
    console.log(post);
    try {
      const response = await axios.post(`http://localhost:3000/admin/updatepost/${id}`, {
        title: post.title,
        content: post.content,
      });
  
      if (response.status === 200) {
        console.log('Post updated:', response.data);
        // Düzenleme işlemi tamamlandığında başka bir sayfaya yönlendirme yapabilirsiniz
      } else {
        console.error('Post update error:', response.statusText);
      }
    } catch (error) {
      console.error('REQUEST ERROR:', error);
    }
  };
  

  return (
    <Container className="mt-5">
      <h1>Edit Post</h1>
      <Form>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={post.title}
            onChange={(e) => setPost((v) => ({ ...v, title: e.target.value }))}
          />
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter content"
            value={post.content}
            onChange={(e) => setPost((v) => ({ ...v, content: e.target.value }))}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleEditPost}>
          Update Post
        </Button>
      </Form>
    </Container>
  );
}

export default EditPostPage;
