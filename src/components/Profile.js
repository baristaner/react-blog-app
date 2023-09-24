import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  CardHeader,
  Avatar,
  Button,
  Skeleton,
} from "@mui/material";
import Navbar from "./Navbar";

function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    fetch(`http://localhost:3000/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
        setPosts(data.posts);
        setIsLoading(false); // Set isLoading to false when data is loaded
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setIsLoading(false); // Set isLoading to false on error as well
      });
    console.log(user);
  }, [userId]);

  return (
    <>
      <Navbar />
      <Container style={{ paddingTop: "10px" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {user.username}'s Profile
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          Posts
        </Typography>

        <Grid container spacing={2}>
          {isLoading ? (
            <>
              {Array.from({ length: 6 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardHeader
                      avatar={
                        <Skeleton variant="circular" width={40} height={40} />
                      }
                      title={<Skeleton variant="text" />}
                      subheader={<Skeleton variant="text" />}
                    />
                    <CardContent>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={200}
                      />
                      <Skeleton variant="text" />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </>
          ) : (
            <>
              {posts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post._id}>
                  <Card>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="user-avatar">
                          {user.profilePicture ? (
                            <img
                              src={`http://localhost:3000/${user.profilePicture}`}
                              alt={`${user.username}'s Profile Picture`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            user.username.charAt(0).toUpperCase()
                          )}
                        </Avatar>
                      }
                      title={
                        <Typography variant="h7" component="div">
                          <strong>{post.title}</strong>
                        </Typography>
                      }
                      subheader={new Date(post.date).toLocaleDateString()}
                    />
                    <CardContent>
                      {post.imagePath && (
                        <img
                          src={`http://localhost:3000/${post.imagePath}`}
                          alt={post.title}
                          style={{ width: "100%", marginBottom: "16px" }}
                        />
                      )}
                      <Link to={`/post/${post._id}`}>
                        <Button variant="outlined" color="primary" fullWidth>
                          Read More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default Profile;
