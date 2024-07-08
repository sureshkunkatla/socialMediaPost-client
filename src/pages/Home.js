import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { makeApiRequest } from "../api/apiJson";
import PostCard from "../components/PostCard/PostCard";
import InfinitySpinner from "../components/InfinitySpinner/InfinitySpinner";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const initialized = useRef(false);
  const scrollableRef = useRef(null);

  useEffect(() => {
    if (!initialized.current) {
      fetchAllPosts();
      initialized.current = true;
    }
  }, [page]);

  useEffect(() => {
    scrollableRef.current.addEventListener("scroll", handleScroll);
  }, []);

  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      const getAllPosts = await makeApiRequest(`posts?page=${page}`, "GET");
      if (getAllPosts?.length > 0) {
        if (getAllPosts?.length < 12) {
          setPage((prev) => prev - 1);
        }
        const checkforDuplicates = getAllPosts.filter(
          (obj2) => !posts.some((obj1) => obj1.id === obj2.id)
        );
        setPosts((prevPosts) => [...prevPosts, ...checkforDuplicates]);
      } else {
        setPage((prev) => prev - 1);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
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

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = scrollableRef.current;
    if (scrollTop + clientHeight + 2 >= scrollHeight) {
      initialized.current = false;
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const deleteCard = async (postId) => {
    try {
      setLoading(true);
      const deleteCardDetails = await makeApiRequest(
        `posts/${postId}`,
        "DELETE"
      );
      if (deleteCardDetails.deleted) {
        console.log(deleteCardDetails.message);
        const filteredCards = posts.filter((each) => each.id !== postId);
        setPosts(filteredCards);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bodyContainer" ref={scrollableRef}>
        {posts?.map((each) => {
          return (
            <div
              key={each.id}
              onClick={() => {
                navigate(`/post/${each.id}`);
              }}
            >
              <PostCard
                cardDetails={each}
                likeOrUnlike={likeOrUnlikePost}
                deletePost={deleteCard}
              />
            </div>
          );
        })}
      </div>
      {loading && <InfinitySpinner visible={loading} />}
    </>
  );
};

export default Home;
