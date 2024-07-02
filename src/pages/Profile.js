import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeApiRequest } from "../api/apiJson";
import { useNavigation } from "../context/NavigationContext";
import PopupModal from "../components/Modal/PopupModal";
import PostCard from "../components/PostCard/PostCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState();
  const [userRelatedPostsData, setUserRelatedPostsData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userBio, setUserBio] = useState("");
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

  const saveUserBio = async () => {
    const data = {
      userBio: userBio,
    };
    try {
      const saveBio = await makeApiRequest(
        `auth/userInfo/${id}/bio`,
        "PUT",
        data
      );
      if (saveBio?.message) {
        setUserData({ ...userData, userBio: userBio });
        setIsModalOpen(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const userBioJsx = () => {
    return (
      <div>
        <textarea
          value={userBio}
          onChange={(e) => setUserBio(e.target.value)}
        />
        <button onClick={saveUserBio}>save</button>
      </div>
    );
  };

  return (
    <div>
      <div className="profile-container">
        <p>{userData?.username}</p>
        <p>{userData?.userBio ? userData?.userBio : "Add your Bio here"}</p>
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => {
            setIsModalOpen(true);
          }}
        />
        {/* <button
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Edit
        </button> */}
      </div>
      <div className="bodyContainer">
        {userRelatedPostsData?.map((each) => {
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
      {/* <div className="related-posts-container">
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
      </div> */}
      <PopupModal
        isOpen={isModalOpen}
        children={userBioJsx()}
        closeModal={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Profile;
