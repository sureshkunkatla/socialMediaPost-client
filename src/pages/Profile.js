import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeApiRequest } from "../api/apiJson";
import { useNavigation } from "../context/NavigationContext";
import PopupModal from "../components/Modal/PopupModal";
import PostCard from "../components/PostCard/PostCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons";

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
              likesCount: each.likesCount + 1,
              userLiked: true,
            };
          } else {
            return each;
          }
        });
        setUserRelatedPostsData(updatePosts);
      } else {
        const updatePosts = userRelatedPostsData.map((each) => {
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
          className="textarea-field"
          placeholder="Please enter text..."
        />
        <button className="button-primary" onClick={saveUserBio}>
          Save
        </button>
      </div>
    );
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="user-icon" style={{ marginRight: "0px" }}>
          <FontAwesomeIcon icon={faUser} style={{ fontSize: "20px" }} />
        </div>
        <span>{userData?.username}</span>
        <span>
          {userData?.userBio ? userData?.userBio : "Add your Bio here"}
          <span>
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={() => {
                setIsModalOpen(true);
              }}
            />
          </span>
        </span>
      </div>
      <div className="user-card-container">
        {!userRelatedPostsData?.length > 0 ? (
          <div className="user-related-empty-container">
            <span>No Posts Yet</span>
          </div>
        ) : (
          <div className="user-related-cards-container">
            {userRelatedPostsData?.map((each) => {
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
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <PopupModal
        isOpen={isModalOpen}
        children={userBioJsx()}
        closeModal={() => setIsModalOpen(false)}
        title={"User Bio"}
      />
    </div>
  );
};

export default Profile;
