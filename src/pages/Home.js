import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);
  return (
    <div className="bodyContainer">
      {posts?.map((each) => {
        // <p key={each.id}>{each.title}</p>;
        return (
          <div
            className="post"
            key={each.id}
            onClick={() => {
              navigate(`/post/${each.id}`);
            }}
          >
            <div className="title">{each.title}</div>
            <div className="body">{each.postText}</div>
            <div className="footer">{each.username}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
