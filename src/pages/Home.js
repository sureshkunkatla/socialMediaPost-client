import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeApiRequest } from "../api/apiJson";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
// import moment from "moment";
// import {
//   faComment,
//   faHeart as faHeartRegular,
// } from "@fortawesome/free-regular-svg-icons";
import PostCard from "../components/PostCard/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);
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

  const likeOrUnlikePost = async (postId) => {
    try {
      const data = {
        PostId: postId,
      };
      const likeUnlikePost = await makeApiRequest("likes", "POST", data);
      if (likeUnlikePost?.liked) {
        const updatePosts = posts.map((each) => {
          if (each.id === postId) {
            return {
              ...each,
              likesCount: each.likesCount + 1,
              userLiked: true,
            };
          } else {
            return each;
          }
        });
        setPosts(updatePosts);
      } else {
        const updatePosts = posts.map((each) => {
          if (each.id === postId) {
            return {
              ...each,
              likesCount: each.likesCount - 1,
              userLiked: false,
            };
          } else {
            return each;
          }
        });
        setPosts(updatePosts);
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
              key={each.id}
              onClick={() => {
                navigate(`/post/${each.id}`);
              }}
            >
              <PostCard cardDetails={each} likeOrUnlike={likeOrUnlikePost} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
