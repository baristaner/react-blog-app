import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
} from "@mui/material";
import Navbar from './Navbar';

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/${id}`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Post alınamadı:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (!post) {
    return <div>Veri bulunamadı.</div>;
  }

  return (
    <>
    <Navbar />
    <Container maxWidth="md" style={{paddingTop:"10px"}}>
      <Card
        style={{ height: "100%",width:"100%", display: "flex", flexDirection: "column" }}
      >
        <CardMedia
          component="img"
          height="200"
          image={`http://localhost:3000/${post.imagePath}`}
          alt={post.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent style={{ flexGrow: 1 }}>
          <Typography variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.content}
          </Typography>
        </CardContent>
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <Button variant="contained" color="primary" href={`/`}>
            Geri Dön
          </Button>
        </div>
      </Card>
    </Container>
    </>
  );
}

export default PostDetails;
