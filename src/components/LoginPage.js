import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import axios from 'axios'; // Axios'ı import edin
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
      const response = await axios.post('http://localhost:3000/login', formData); // Backend ile iletişim kurun

      // Başarılı giriş sonrası JWT'yi alın
      const { token } = response.data;
      console.log(token);
      localStorage.setItem("blog_auth",token);

      navigate('/');

      // JWT'yi kullanarak kullanıcıyı oturum açık olarak işaretleyin
      // Bu işlemi yerel depolama, oturum saklama veya Redux gibi bir yöntemle yapabilirsiniz.
    } catch (error) {
      console.error('Giriş başarısız:', error);
      // Hata durumunda kullanıcıya uygun bir hata mesajı gösterilebilir
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
