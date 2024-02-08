// import React from "react";
import { useState, useEffect } from 'react'
import './style/App.scss'
import {Page} from '../../src/models/api/page'
import {PostModel} from '../../src/models/api/postModel'

import { FormEventHandler, ChangeEventHandler } from "react";


  export default function PostList(){
    const [myData, setMyData] = useState<Page<PostModel>|null>(null);

    useEffect(() => {
    fetch("http://localhost:3001/posts").then(response => response.json()).then(data => setMyData(data));
    }, [])
    
    if(!myData){
        return <h1>Waiting for data</h1>
    }

    let likes : string[] = [];
    let dislikes : string[] = [];

    myData.results.forEach((post) =>
        post.likedBy.forEach((user) => {
            likes.push(user.username)
            }
        )
    )
    myData.results.forEach((post) =>
        post.dislikedBy.forEach((user) => {
            dislikes.push(user.username)
            }
        )
    )

    return (
        <div className="flexContainer">
            <h1 className="subtitle">Posts</h1>
            <div className="postsContainer">
            {myData.results.map((post) =>
                <div className="postContainer" key={post.id}>
                    <img className="postImage" src={post.imageUrl}></img>
                    <div className ="postInfo">
                        <h3>{post.message}</h3>
                        <p>By {post.postedBy.username}</p>
                        <p>{post.createdAt}</p>
                        <p>Liked by: {likes.length}</p>
                        <p>{likes.join(', ')}</p>
                        <p>Disliked by: {dislikes.length}</p>
                        <p>{dislikes.join(', ')}</p>
                    </div>
                    <div className= "postButtonContainer">
                        <form method="post">
                            <button type="submit">Dislike</button>  
                        </form>
                        <form method="post" action="/posts/{post.id}/like">
                            <button type="submit">Like</button>  
                        </form>
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}


/*

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
*/