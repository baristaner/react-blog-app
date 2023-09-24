import React, { useState, useEffect } from "react";
import {
  InputBase,
  Typography,
  Box,
  Container,
  Avatar,
  Link,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "./Navbar";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      fetch(`http://localhost:3000/search/all?q=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          setResults(data);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
        });
    }
  }, [searchQuery]); 

  return (
    <>
    <Navbar/>
    <Container style={{paddingTop:"10px"}}>
      <Box style={{ position: "relative" }}>
        <InputBase
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
        />
        <SearchIcon
          color="primary"
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
          }}
          onClick={() => {
            if (searchQuery) {
              fetch(`http://localhost:3000/search/all?q=${searchQuery}`)
                .then((response) => response.json())
                .then((data) => {
                  setResults(data);
                  console.log(data); 
                })
                .catch((error) => {
                  console.error("Error fetching search results:", error);
                });
            }
          }}
        />
      </Box>
      <div>
        {results.users && results.users.length > 0 && (
          <Grid container spacing={2}>
            {results.users.map((user) => (
              <Grid item key={user._id} xs={12} sm={6} md={3}>
                <Link
                  href={`/profile/${user._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      alt={user.username}
                      src={`http://localhost:3000/${user.profilePicture}`}
                    />
                    <Typography variant="subtitle2" style={{ marginLeft: "8px" }}>
                      {user.username}
                    </Typography>
                  </div>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
        {results.posts && results.posts.length > 0 && (
        <div>
        {results.posts.map((post) => (
          <div key={post._id}>
            <Link
              href={`/post/${post._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span style={{ fontWeight: "normal" }}>{post.title}</span>
            </Link>
          </div>
        ))}
      </div>
        )}
      </div>
    </Container>
    </>
  );
}
