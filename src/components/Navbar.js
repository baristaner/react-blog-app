import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  IconButton,
  Avatar,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const loggedIn = localStorage.getItem("blog_auth");
  const uid = localStorage.getItem("user_id");

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3000/users/${uid}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      });
    console.log(user);
  }, [uid]);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleProfileButton = () => {
    navigate(`/profile/${uid}`);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, cursor: "pointer" }}
              onClick={() => {
                navigate("/");
              }}
            >
              Blog Uygulaması
            </Typography>
            {loggedIn ? (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleProfileButton}
              >
                <Avatar aria-label="user-avatar">
                  {isLoading ? (
                    <Skeleton variant="circular" width={40} height={40} />
                  ) : (
                    <>
                      {user && user.profilePicture ? (
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
                        user && user.username.charAt(0).toUpperCase()
                      )}
                    </>
                  )}
                </Avatar>
              </IconButton>
            ) : (
              <Button color="inherit" onClick={handleLoginClick}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Container></Container>
    </>
  );
}
