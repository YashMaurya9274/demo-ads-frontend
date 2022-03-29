import axios from "axios";
import { updateProfile } from "firebase/auth";
import React, { useState } from "react";
import auth from "../../firebase";
import { useStateValue } from "../../StateProvider";
import Header from "../Header/Header";
import "./EditProfile.css";

function EditProfile() {
  const [{ user }, dispatch] = useStateValue();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const editProfile = () => {
    if (imageUrl || name) {
      updateProfile(auth.currentUser, {
        displayName: name ? name : user.displayName,
        photoURL: imageUrl ? imageUrl : user.photoURL,
        phoneNumber: phoneNo ? phoneNo : user.phoneNumber,
      })
        .then(() => {
          axios.post(`http://localhost:4000/update/posts?id=${user.uid}`, {
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
          });
        })
        .then(() => {
          dispatch({
            type: "SET_USER",
            user: auth.currentUser,
          });
        });

      setName("");
      setImageUrl("");
    }
  };

  return (
    <div className="editProfile">
      <Header />

      <h1>Edit Profile</h1>

      <div className="editProfile__field">
        <h4>Name</h4>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={user.displayName}
        />
      </div>

      <img src={user.photoURL} alt="" />

      <div className="editProfile__field">
        <h4>Image</h4>
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter new Image URL"
        />
      </div>

      <div className="editProfile__field">
        <h4>Phone No.</h4>
        <input
          maxLength={10}
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          placeholder={
            user.phoneNumber !== null ? user.phoneNumber : "Enter Phone Number"
          }
        />
      </div>

      <button onClick={editProfile}>Submit</button>
    </div>
  );
}

export default EditProfile;
