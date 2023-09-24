import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  CircularProgress,
  Avatar,
  CardHeader,
  Skeleton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import axios from "axios";

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
      .then(async (response) => {
        const postList = response.data;
        const postsWithUserInfo = await Promise.all(
          postList.map(async (post) => {
            const userInfoResponse = await axios.get(
              `http://localhost:3000/users/${post.author}`
            );
            const userInfo = userInfoResponse.data.user;
            return { ...post, userInfo };
          })
        );
        setPosts(postsWithUserInfo);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Postlar alınamadı:", error);
        setLoading(true);
      });
    console.log(posts);
  }, []);

  if (loading) {
    // Veriler yüklenirken CircularProgress veya Skeleton göster
    return (
      <Container maxWidth="md">
        <Typography variant="h2" component="div" gutterBottom></Typography>
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardHeader
                  avatar={
                    <Skeleton variant="circular" width={40} height={40} />
                  }
                  title={<Skeleton variant="text" />}
                  subheader={<Skeleton variant="text" />}
                />
                <Skeleton variant="rectangular" height={200} />
                <CardContent style={{ flexGrow: 1 }}>
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                </CardContent>
                <div
                  style={{
                    marginBottom: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "13px",
                  }}
                >
                  <Skeleton variant="rectangular" height={36} />
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (!posts) {
    return <div>Veri bulunamadı.</div>;
  }

  return (
    <ThemeProvider theme={theme}>
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
                <CardHeader
                  avatar={
                    <Link
                      to={`/profile/${post.userInfo._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Avatar aria-label="user-avatar">
                        {post.userInfo.profilePicture ? (
                          <img
                            src={`http://localhost:3000/${post.userInfo.profilePicture}`}
                            alt={`${post.userInfo.username}'s Profile Picture`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <Typography variant="h7" component="div">
                            <strong>
                              {post.userInfo.username.charAt(0).toUpperCase()}
                            </strong>
                          </Typography>
                        )}
                      </Avatar>
                    </Link>
                  }
                  title={
                    <Link
                      to={`/profile/${post.userInfo._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography variant="h7" component="div">
                        <strong>{post.userInfo.username}</strong>
                      </Typography>
                    </Link>
                  }
                  subheader={new Date(post.date).toLocaleDateString()}
                />

                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:3000/${post.imagePath}`}
                  alt={post.title}
                />
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div">
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
                  <Link to={`/post/${post._id}`}>
                    <Button variant="outlined" color="primary" fullWidth>
                      Read More
                    </Button>
                  </Link>
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
