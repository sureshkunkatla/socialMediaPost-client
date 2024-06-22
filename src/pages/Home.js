import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeApiRequest } from "../api/apiJson";

const Home = () => {
  const [posts, setPosts] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      const getAllPosts = await makeApiRequest("posts", "GET");
      if (getAllPosts?.length > 0) {
        setPosts(getAllPosts);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="bodyContainer">
        {posts?.map((each) => {
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
    </>
  );
};

export default Home;
