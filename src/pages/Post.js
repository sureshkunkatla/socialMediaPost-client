import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeApiRequest } from "../api/apiJson";

const Post = () => {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [listOfComments, setListOfComments] = useState([]);
  const [comment, setComment] = useState("");
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
  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {postObject?.title} </div>
          <div className="body">{postObject?.postText}</div>
          <div className="footer">{postObject?.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div>
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <button onClick={onClickCommentBtn}>Comment</button>
        </div>
        <div>
          {listOfComments?.map((each) => {
            return (
              <p key={each.id}>
                {each.commentBody}-{each.username}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
