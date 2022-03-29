import { useState } from "react";
import "./Login.css";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../firebase";
import { updateProfile } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  const signUp = (e) => {
    e.preventDefault();

    if (email && password && name && image) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((authUser) => {
          updateProfile(authUser.user, {
            displayName: name,
            photoURL:
              image ||
              "https://www.seekpng.com/png/detail/46-462910_person-icon-black-avatar-png.png",
          });
        })
        .catch((error) => alert(error.message));
    } else {
      alert("Please fill all the fields");
    }
  };

  //   https://i.pinimg.com/originals/d7/bd/93/d7bd934adc5e5a50da570cb1bc98e946.jpg

  const signIn = (e) => {
    e.preventDefault();

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password).catch((error) =>
        alert("Please Sign Up First or Provide correct Information")
      );
    } else {
      alert("Please fill email and password fields");
    }
  };

  return (
    <form className="login">
      <h1>SAMPLE POST WEBSITE</h1>
      <div className="login__container">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter Password"
        />
        <input
          type="email"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter User Name"
        />
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter User Image URL"
        />
        <button type="submit" onClick={signIn}>
          Login
        </button>
        <p>
          Don't have an account?{" "}
          <span onClick={signUp}>Click here to Register</span>
        </p>
        <p className="note">
          Note: If you have already have an account click on Login button (just
          email and password are required) and if you want to register, just
          simply put your email, password, username and image URL in the fields
          given and click to register.
        </p>
      </div>
    </form>
  );
}

export default Login;
