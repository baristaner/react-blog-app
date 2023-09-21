import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PostSlider from "./PostSlider"; // Blog postları için slideshow

const theme = createTheme({
  palette: {
    primary: {
      main: "#0b276e", // Bordo
    },
    secondary: {
      main: "#333", // Koyu Gri
    },
    background: {
      default: "#", // Ana arka plan rengi (koyu gri)
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API'den postları çekme işlemi
    axios
      .get("http://localhost:3000/posts/all")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Postlar alınamadı:", error);
        setLoading(true);
      });
  }, []);

  if (loading) {
    // Veriler yüklenirken CircularProgress göster
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

  if (!posts) {
    return <div>Veri bulunamadı.</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      {/* <Grid item xs={15} sm={12} md={6}>
  <PostSlider posts={posts} />
</Grid> */}
      <Container maxWidth="md">
        <Typography variant="h2" component="div" gutterBottom></Typography>
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item key={post._id} xs={12} sm={6} md={4}>
              <Card
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:3000/${post.imagePath}`}
                  alt={post.title}
                />
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.content.length > 100
                      ? `${post.content.slice(0, 100)}...`
                      : post.content}
                  </Typography>
                </CardContent>
                <div
                  style={{
                    marginBottom: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "13px",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    href={`/post/${post._id}`}
                  >
                    Devamını Oku
                  </Button>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default PostList;
