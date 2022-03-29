import React from "react";
import { useStateValue } from "../../StateProvider";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase";

function Header() {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header__left ">
        <h3 onClick={() => navigate("/")}>Home</h3>
        <h3 onClick={() => navigate("/myPosts")}>My Active Posts</h3>
        <h3 onClick={() => navigate("/editProfile")}>Edit Profile</h3>
      </div>
      <div className="header__right">
        <h2>{user.displayName}</h2>
        <img
          style={{
            width: 60,
            height: 60,
            objectFit: "fill",
            borderRadius: 20,
            border: "2px solid whitesmoke",
            cursor: "pointer",
          }}
          onClick={() => {
            auth.signOut().then(
              dispatch({
                type: "SET_USER",
                user: null,
              }),

              navigate("/")
            );
          }}
          src={user.photoURL}
          alt=""
        />
      </div>
    </div>
  );
}

export default Header;
