import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Burada tüm postları çeken bir API isteği gönderin ve sonuçları posts state'ine kaydedin
    axios.get('http://localhost:3000/posts/all')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Postlar alınamadı:', error);
      });
  }, []);

  return (
    <div>
      <h2>Tüm Postlar</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            {/* Postun başlık, içerik veya diğer bilgilerini burada gösterin */}
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
