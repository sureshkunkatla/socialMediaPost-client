import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeApiRequest } from "../api/apiJson";

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
              Likes: [...each.Likes, likeUnlikePost?.likedData],
            };
          } else {
            return each;
          }
        });
        setPosts(updatePosts);
      } else {
        const updatePosts = posts.map((each) => {
          if (each.id === postId) {
            const updatedLikes = [...each.Likes];
            updatedLikes.pop();
            return {
              ...each,
              Likes: updatedLikes,
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
              className="post"
              key={each.id}
              onClick={() => {
                navigate(`/post/${each.id}`);
              }}
            >
              <div className="title">{each.title}</div>
              <div className="body">{each.postText}</div>
              <div className="footer">
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/userInfo/${each.UserId}`);
                  }}
                >
                  {each.username}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    likeOrUnlikePost(each.id);
                  }}
                >
                  Like
                  <label>{each?.Likes?.length}</label>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
