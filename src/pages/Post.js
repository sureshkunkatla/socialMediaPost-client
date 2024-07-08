import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeApiRequest } from "../api/apiJson";
import { useAuth } from "../context/AuthContext";
import PostCard from "../components/PostCard/PostCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faTrash } from "@fortawesome/free-solid-svg-icons";
import InfinitySpinner from "../components/InfinitySpinner/InfinitySpinner";
import { useNavigation } from "../context/NavigationContext";

const Post = () => {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [listOfComments, setListOfComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { userDetails } = useAuth();
  const navigate = useNavigation();

  useEffect(() => {
    if (!Object.keys(postObject)?.length > 0) getCurrentPost();
    if (!listOfComments?.length > 0) getAllCommentsForPost();
  }, []);

  const getCurrentPost = async () => {
    try {
      setLoading(true);
      const currentPostData = await makeApiRequest(`posts/byId/${id}`, "GET");
      if (currentPostData?.id) {
        setPostObject(currentPostData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllCommentsForPost = async () => {
    try {
      const getAllcomments = await makeApiRequest(`comments/${id}`, "GET");
      if (getAllcomments?.length > 0) {
        setListOfComments(getAllcomments);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onClickCommentBtn = async () => {
    const data = {
      commentBody: comment,
      PostId: id,
    };

    try {
      const makeLoginReq = await makeApiRequest("comments", "POST", data);
      if (makeLoginReq?.id) {
        getAllCommentsForPost();
        setComment("");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onClickDelete = async (data) => {
    try {
      setLoading(true);
      const deleteComment = await makeApiRequest(
        `comments/${data.id}`,
        "DELETE"
      );
      if (deleteComment?.deleted) {
        getAllCommentsForPost();
      } else {
        alert(deleteComment?.error);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteCard = async (postId) => {
    try {
      const deleteCardDetails = await makeApiRequest(
        `posts/${postId}`,
        "DELETE"
      );
      if (deleteCardDetails.deleted) {
        console.log(deleteCardDetails.message);
        navigate("/");
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
        const newObj = {
          ...postObject,
          likesCount: postObject.likesCount + 1,
          userLiked: true,
        };
        setPostObject(newObj);
      } else {
        const newObj = {
          ...postObject,
          likesCount: postObject.likesCount - 1,
          userLiked: false,
        };
        setPostObject(newObj);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="left-side-card-container">
          <PostCard
            cardDetails={postObject}
            likeOrUnlike={likeOrUnlikePost}
            expandPost={true}
            deletePost={deleteCard}
          />
        </div>
      </div>
      <div className="rightSide">
        <div className="right-side-comments-container">
          {!listOfComments?.length > 0 ? (
            <div className="user-related-empty-container">
              <span>No Comments Yet</span>
            </div>
          ) : (
            <div className="comments-container">
              {listOfComments?.map((each) => {
                return (
                  <div className="each-comment-container">
                    <p key={each.id} style={{ flex: "1" }}>
                      <span className="user-name-text">{each.username}</span>
                      <span className="user-comment-text">
                        {each.commentBody}
                      </span>
                    </p>
                    {userDetails.username === each.username && (
                      <div className="trash-icon-container">
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => onClickDelete(each)}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          <div className="comments-section-container">
            <textarea
              className="comment-textarea"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Comment here..."
            />
            <div className="comment-button-container">
              <button
                className="button-primary"
                disabled={comment?.length === 0}
                onClick={onClickCommentBtn}
                style={{ opacity: comment?.length === 0 ? 0.8 : 1 }}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading && <InfinitySpinner visible={loading} />}
    </div>
  );
};

export default Post;
