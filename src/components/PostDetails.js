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
  IconButton,
  Modal,
  Box,
  TextField,
  Avatar,
  CardHeader,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Navbar from "./Navbar";
import { Add } from "@mui/icons-material";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const userid_auth = localStorage.getItem("user_id");

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/${id}`)
      .then((response) => {
        const post = response.data;
        setPost(post);

        for (const comment of post.comments) {
          const authorId = comment.author;

          axios
            .get(`http://localhost:3000/users/${authorId}`)
            .then((userResponse) => {
              const authorInfo = userResponse.data;

              comment.authorInfo = authorInfo;

              setPost((prevPost) => ({
                ...prevPost,
                comments: [...prevPost.comments],
              }));
            })
            .catch((userError) => {
              console.error("Error getting data:", userError);
            });
        }

        setLoading(false);
        console.log(post);
      })
      .catch((error) => {
        console.error("Post alınamadı:", error);
        setLoading(false);
      });
  }, [id]);

  const handleLikePost = async (authUserId, postId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/likepost?author=${authUserId}&postId=${postId}`,
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
        console.error("Error Liking/Unliking Post:", response.statusText);
      }
    } catch (error) {
      console.error("Error Liking/Unliking Post:", error);
    }
  };

  const handleSavePost = async (authUserId, postId) => {
    console.log(authUserId, postId);
    try {
      const response = await fetch(
        `http://localhost:3000/savepost?author=${authUserId}&postId=${postId}`,
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
        console.error("Error Saving Post:", response.statusText);
      }
    } catch (error) {
      console.error("Error Saving Post:", error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/commentpost?author=${userid_auth}&postId=${id}&text=${commentText}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Comment Added:", data.comment);

        handleCloseModal();
      } else {
        console.error("Error while adding comment");
      }
    } catch (error) {
      console.error("Error while adding comment:", error);
    }
  };

  const modalContent = (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        minWidth: 400,
      }}
    >
      <h2>Add Comment</h2>
      <TextField
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        onChange={handleCommentTextChange}
      />
      <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
        Send
      </Button>
    </Box>
  );

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
    return <div>No data found.</div>;
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="md" style={{ paddingTop: "10px",maxWidth:"100%" }}>
        <Card
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardMedia
            component="img"
            height="300"
            image={`http://localhost:3000/${post.imagePath}`}
            alt={post.title}
            sx={{ objectFit: "cover" }}
          />
          <CardContent style={{ flexGrow: 1 }}>
            <Typography variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.content}
            </Typography>
          </CardContent>
          <div style={{ display: "flex" }}>
            <div style={{ gap: "3px", marginLeft: "auto" }}>
              <IconButton
                onClick={() => handleLikePost(userid_auth, id)}
                color={
                  post.likes.includes(userid_auth) ? "secondary" : "default"
                }
              >
                <FavoriteIcon />
              </IconButton>
              <IconButton
                onClick={() => handleSavePost(userid_auth, id)}
                color={
                  post.savedBy.includes(userid_auth) ? "secondary" : "default"
                }
              >
                <BookmarkAddIcon />
              </IconButton>
              <IconButton onClick={handleOpenModal}>
                <AddCommentIcon />
              </IconButton>
            </div>
          </div>
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <Button variant="contained" color="primary" href={`/`}>
              Go Back
            </Button>
          </div>
        </Card>
      </Container>
      <div sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
        {post.comments.map((comment) => (
          <CardContent key={comment._id}>
            <Card
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardHeader
                style={{ paddingTop: "10px", paddingBottom: "0px" }}
                avatar={
                  <Avatar aria-label="user-avatar">
                    {comment.authorInfo &&
                    comment.authorInfo.user.profilePicture ? (
                      <img
                        src={`http://localhost:3000/${comment.authorInfo.user.profilePicture}`}
                        alt={`${comment.authorInfo.user.username}'s Profile Picture`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Typography variant="h7" component="div">
                        <strong>
                          {comment.authorInfo
                            ? comment.authorInfo.user.username
                                .charAt(0)
                                .toUpperCase()
                            : "Unknown User"}
                        </strong>
                      </Typography>
                    )}
                  </Avatar>
                }
                title={
                  <Typography variant="h7" component="div">
                    <strong>
                      {comment.authorInfo
                        ? comment.authorInfo.user.username
                        : "Loading"}
                    </strong>
                  </Typography>
                }
                subheader={new Date(comment.date).toLocaleDateString()}
              />
              <CardContent style={{ flexGrow: 1 }}>
                <Typography variant="strong" component="div">
                  {comment.text}
                </Typography>
              </CardContent>
            </Card>
          </CardContent>
        ))}
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {modalContent}
      </Modal>
    </>
  );
}

export default PostDetails;
