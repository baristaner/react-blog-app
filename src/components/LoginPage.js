import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';


function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3000/login', formData); 
  
      const { token } = response.data;
      console.log(token);
      localStorage.setItem("blog_auth", token);
  
      const protectedResponse = await axios.get('http://localhost:3000/protected', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const { userId } = protectedResponse.data;
      console.log(userId);
      localStorage.setItem("user_id", userId);
  
      navigate('/dashboard');
    } catch (error) {
      console.error('Auth failed:', error);
    }
  };
  

  return (
    <Container>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          label="Username"
          value={formData.username}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          type="password"
          name="password"
          label="Şifre"
          value={formData.password}
          onChange={handleInputChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Giriş Yap
        </Button>
      </form>
    </Container>
  );
}

export default LoginPage;
