import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./MyPosts.css";
import Pusher from "pusher-js"; //npm i pusher-js
import { useStateValue } from "../../StateProvider";
import axios from "axios";
import Post from "../Post/Post";

const pusher = new Pusher("9d8cb3a0083167782a5a", {
  cluster: "ap2",
});

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [{ user }] = useStateValue();

  const getPosts = () => {
    axios
      .get(`http://localhost:4000/get/myposts?id=${user.uid}`)
      .then((res) => {
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
    <div>
      <Header />

      <div className="myPosts__posts">
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
      </div>
    </div>
  );
}

export default MyPosts;
