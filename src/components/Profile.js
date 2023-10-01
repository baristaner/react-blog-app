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
  IconButton,
} from "@mui/material";
import Navbar from "./Navbar";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

function Profile() {
  const { userId } = useParams();
  const userIdToFollow = userId;
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const currentauthUserId = localStorage.getItem("user_id");

  useEffect(() => {
    fetch(`http://localhost:3000/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
        setPosts(data.posts);
        setIsLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setIsLoading(false); 
      });
    //console.log(user);
  }, [userId]);

  const handleFollowUser = async (userIdToFollow, authUserId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/follow?userId=${authUserId}&user_id_followed=${userIdToFollow}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        console.error("Follow User Error:", response.statusText);
      }
    } catch (error) {
      console.error("Follow User Error:", error);
    }
  };

  const handeUnfollowerUser = async (userIdToFollow, authUserId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/unfollow?userId=${authUserId}&user_id_unfollowed=${userIdToFollow}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        console.error("Follow User Error:", response.statusText);
      }
    } catch (error) {
      console.error("Follow User Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Container style={{ paddingTop: "10px" }}>
        {isLoading ? (
          <></>
        ) : (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              {user.username}'s Profile
            </Typography>
            <p>Followers : {user.followers.length}</p>
            <p>Following : {user.following.length}</p>
          </>
        )}

        <IconButton onClick={() => handleFollowUser(userId, currentauthUserId)}>
          <PersonAddIcon />
        </IconButton>

        <IconButton
          onClick={() => handeUnfollowerUser(userId, currentauthUserId)}
        >
          <PersonRemoveIcon />
        </IconButton>

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
