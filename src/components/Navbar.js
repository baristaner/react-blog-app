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
  InputBase,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";



export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const loggedIn = localStorage.getItem("blog_auth");
  const uid = localStorage.getItem("user_id");

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3000/users/${uid}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
        console.log(user);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      });
  }, [uid]);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleProfileButton = () => {
    navigate(`/profile/${uid}`);
  };

  const handleSearchClick = () => {
    navigate("/search")
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
              Blog App
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

            <div style={{ position: "relative",paddingBottom:"32px" }}>
          
              <IconButton
                color="inherit"
                onClick={handleSearchClick}
                style={{ position: "absolute", right: 70, top: "50%", transform: "translateY(-50%)" }}
              >
                <SearchIcon />
              </IconButton>
              
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Container></Container>
    </>
  );
}
