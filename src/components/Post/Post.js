import React from "react";
import "./Post.css";

function Post({ title, category, price, image, timestamp, user }) {
  return (
    <div className="post">
      <div className="post__user">
        <img
          src={user.photoURL}
          width={50}
          height={50}
          style={{ objectFit: "fill", borderRadius: 100 }}
          alt=""
        />
        <h2>{user.displayName}</h2>
      </div>
      <div className="post__top">
        <h2>{title}</h2>
        <div>
          <p>{category}</p>
          <p>{price} Rs</p>
        </div>
      </div>
      <img src={image} alt="" />
      <p>{new Date(parseInt(timestamp)).toDateString()}</p>
    </div>
  );
}

export default Post;
