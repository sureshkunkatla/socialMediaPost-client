import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeApiRequest } from "../api/apiJson";
import { useNavigation } from "../context/NavigationContext";

const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState();
  const [userRelatedPostsData, setUserRelatedPostsData] = useState();
  const navigate = useNavigation();
  useEffect(() => {
    const profileRelatedData = async () => {
      try {
        const getUserProfileData = await makeApiRequest(
          `auth/userInfo/${id}`,
          "GET"
        );
        const { user, userRelatedPosts } = getUserProfileData;
        setUserData(user);
        setUserRelatedPostsData(userRelatedPosts);
      } catch (e) {}
    };

    profileRelatedData();
  }, []);

  const likeOrUnlikePost = async (postId) => {
    try {
      const data = {
        PostId: postId,
      };
      const likeUnlikePost = await makeApiRequest("likes", "POST", data);
      if (likeUnlikePost?.liked) {
        const updatePosts = userRelatedPostsData.map((each) => {
          if (each.id === postId) {
            return {
              ...each,
              Likes: [...each.Likes, likeUnlikePost?.likedData],
            };
          } else {
            return each;
          }
        });
        setUserRelatedPostsData(updatePosts);
      } else {
        const updatePosts = userRelatedPostsData.map((each) => {
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
        setUserRelatedPostsData(updatePosts);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="profile-container">
        <p>{userData?.username}</p>
        {userData?.userBio ? (
          <p>{userData?.userBio}</p>
        ) : (
          <>
            <p>Add your Bio here</p>
            <button
              onClick={() =>
                console.log(
                  "open popup and show input on click save add bio to database"
                )
              }
            >
              Edit
            </button>
          </>
        )}
      </div>
      <div className="related-posts-container">
        {userRelatedPostsData?.map((each) => {
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
    </div>
  );
};

export default Profile;
