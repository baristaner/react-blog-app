import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EditPost() {
  const { postId } = useParams();
  const [post, setPost] = useState({ title: '', content: '' });

  useEffect(() => {
    fetch(`http://localhost:3000/admin/edit/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
      });
  }, [postId]);

  const handleTitleChange = (e) => {
    setPost({ ...post, title: e.target.value });
  };

  const handleContentChange = (e) => {
    setPost({ ...post, content: e.target.value });
  };

  const handleUpdatePost = () => {
    fetch(`http://localhost:3000/admin/editpost/${postId}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Post updated:', data);
      })
      .catch((error) => {
        console.error('Error updating post:', error);
      });
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <div>
        <label>Title:</label>
        <input
          name="title"
          type="text"
          id="title"
          value={post.title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={post.content}
          onChange={handleContentChange}
        />
      </div>
      <button onClick={handleUpdatePost}>Update Post</button>
    </div>
  );
}

export default EditPost;
