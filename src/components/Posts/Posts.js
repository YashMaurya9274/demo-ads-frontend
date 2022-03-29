import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import "./Posts.css";
import Pusher from "pusher-js"; //npm i pusher-js

const pusher = new Pusher("9d8cb3a0083167782a5a", {
  cluster: "ap2",
});

function Posts() {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios.get("http://localhost:4000/get/posts").then((res) => {
      setPosts(res.data);
    });
  };

  useEffect(() => {
    getPosts();

    const posts = pusher.subscribe("posts");
    posts.bind("newPost", function (data) {
      getPosts();
    });
  }, []);

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post
          id={post._id}
          key={post._id}
          title={post.title}
          category={post.category}
          price={post.price}
          image={post.image}
          timestamp={post.timestamp}
          user={post.user}
        />
      ))}

      {/* <Post
        title="Earpods on Sale"
        category="Electronics"
        price="1000 Rs"
        image="https://5.imimg.com/data5/SELLER/Default/2020/10/MF/DR/SO/12721597/airpods-pro-ith-charging-case-earpods-airpods-earbuds-earphones-with-mic-for-android-ios-smartphones-500x500.jpg"
        timestamp="29th March 2022"
      /> */}
    </div>
  );
}

export default Posts;
