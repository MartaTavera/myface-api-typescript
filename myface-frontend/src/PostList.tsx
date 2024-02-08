// import React from "react";
import { useState, useEffect } from 'react'
import './style/App.scss'


function PostList() {
  const [myData, setMyData] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:3001/posts")
      .then(response => response.json())
      .then(data => setMyData(data));
  }, []);

  if (!myData) {
    return <div>Waiting for data!</div>
  }

  return (
    <div className="flexContainer">
      <h1 className="subtitle"> Posts</h1>
      <div className="postsContainer">
        {myData.results.map((post: any, index: number) =>
          <div className="postContainer" key={index}>
            <div className="postInfo">
              <h3>{post.message}</h3>
              <p>{post.createdAt}</p>
            </div>
            <img src={post.imageUrl}></img>
            <div className="postInfo">
              <p>Posted by: {post.postedBy.name} - {post.postedBy.username}</p>
            </div>
            <div className="postInfo">
              <p>Liked by:</p>
              {post.likedBy.map((user: any) =>
                <li>{user.username}</li>
              )}
              <form method="post" action="/posts/{post.id}/like" className="postButtonContainer">
                <button className="postButton" type="submit">Like</button>
              </form>
            </div>
            <div className="postInfo">
              <p>Disliked by:</p>
              {post.dislikedBy.map((user: any) =>
                <li>{user.username}</li>
              )}
              <form method="post" action="/posts/{post.id}/dislike" className="postButtonContainer">
                <button className="postButton" type="submit">Dislike</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostList;