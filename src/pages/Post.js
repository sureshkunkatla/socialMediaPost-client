import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Post = () => {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [listOfComments, setListOfComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    getAllCommentsForPost();
  }, []);

  const getAllCommentsForPost = async () => {
    await axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setListOfComments(response.data);
    });
  };

  const onClickCommentBtn = async () => {
    const data = {
      commentBody: comment,
      PostId: id,
    };
    await axios
      .post("http://localhost:3001/comments", data)
      .then((response) => {
        if (response) {
          getAllCommentsForPost();
          setComment("");
        }
      });
  };
  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {postObject.title} </div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
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
            return <p key={each.id}>{each.commentBody}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
