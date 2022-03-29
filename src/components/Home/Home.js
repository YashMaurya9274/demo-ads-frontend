import Posts from "../Posts/Posts";
import "./Home.css";
import axios from "axios";
import { useState } from "react";
import { useStateValue } from "../../StateProvider";
import Header from "../Header/Header";

function Home() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [{ user }] = useStateValue();

  const createPost = (e) => {
    e.preventDefault();

    if (title && category && price && imageUrl) {
      axios.post(`http://localhost:4000/new/post`, {
        title: title,
        category: category,
        price: price,
        image: imageUrl,
        timestamp: Date.now(),
        userId: user.uid,
        user: {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
      });

      setTitle("");
      setCategory("");
      setPrice("");
      setImageUrl("");
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <div className="home">
      <Header />

      <div className="home__addPost">
        <div className="home__addPostField">
          <h3>Add Title - </h3>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="home__addPostField">
          <h3>Add Category - </h3>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="home__addPostField">
          <h3>Add Price - </h3>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
          />
        </div>

        <div className="home__addPostField">
          <h3>Add Image URL - </h3>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <button onClick={createPost} className="home__addPostButton">
          Post
        </button>
      </div>

      <Posts />
    </div>
  );
}

export default Home;
