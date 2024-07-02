import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeApiRequest } from "../api/apiJson";
import { useAuth } from "../context/AuthContext";
import PostCard from "../components/PostCard/PostCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faTrash } from "@fortawesome/free-solid-svg-icons";

const Post = () => {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [listOfComments, setListOfComments] = useState([]);
  const [comment, setComment] = useState("");
  const { userDetails } = useAuth();

  useEffect(() => {
    if (!Object.keys(postObject)?.length > 0) getCurrentPost();
    if (!listOfComments?.length > 0) getAllCommentsForPost();
  }, []);

  const getCurrentPost = async () => {
    try {
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
        <PostCard cardDetails={postObject} likeOrUnlike={likeOrUnlikePost} />
      </div>
      <div className="rightSide">
        <div
          style={{
            height: "80%",
            width: "80%",
            boxShadow: "0px 0px 10px #ccc",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <div style={{ flex: "1", overflowY: "scroll" }}>
            {listOfComments?.map((each) => {
              return (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p key={each.id} style={{ flex: "1" }}>
                    <span style={{ fontSize: "14px", fontWeight: "700" }}>
                      {each.username}
                    </span>
                    <span style={{ marginLeft: "7px" }}>
                      {each.commentBody}
                    </span>
                  </p>
                  {userDetails.username === each.username && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <textarea
              style={{
                resize: "none",
                width: "90%",
                minHeight: "50px",
                maxHeight: "100px",
                flex: 1,
                outline: "none",
              }}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <div
              style={{
                width: "10%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <button className="button-primary" onClick={onClickCommentBtn}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
