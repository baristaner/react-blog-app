import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Stil dosyasını içe aktarın
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';


function PostSlider({ posts }) {


  return (
    <Carousel>
    {posts.map((post) => (
      <div key={post._id}>
        <Card style={{ height: '100%', position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={`http://localhost:3000/${post.imagePath}`}
            alt={post.title}
            style={{ objectFit: 'cover' }} // Fotoğrafın tam olarak doldurmasını sağlar
          />
          <Typography variant="h5" component="div" style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            {post.title}
          </Typography>
          
            <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center', position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              {post.content.length > 100 ? `${post.content.slice(0, 100)}...` : post.content}
            </Typography>

        </Card>
      </div>
    ))}
  </Carousel>
  
  );
};

export default PostSlider;
