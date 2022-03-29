import React, { useEffect } from "react";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import auth from "./firebase";
import { useStateValue } from "./StateProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyPosts from "./components/MyPosts/MyPosts";
import EditProfile from "./components/EditProfile/EditProfile";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    return unsubscribe;
  }, [user, dispatch]);

  // return <div>{user ? <Home /> : <Login />}</div>;
  return (
    <Router>
      {!user ? (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/myPosts" element={<MyPosts />} />
          <Route path="/" element={<Home />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
