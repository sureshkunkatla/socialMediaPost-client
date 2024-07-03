import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPen,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import {
  faComment,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import { useNavigation } from "../../context/NavigationContext";
import { useState } from "react";
import PopupModal from "../Modal/PopupModal";
import LikesPopup from "./LikesPopup";
import { useAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { addPost } from "../../redux/reducers/postsSlice";

const PostCard = ({
  cardDetails,
  likeOrUnlike,
  expandPost = false,
  deletePost = () => {},
}) => {
  const [likesPopup, setLikesPopup] = useState(false);
  const navigate = useNavigation();
  const { userDetails } = useAuth();
  const dispatch = useDispatch();

  return (
    <div className="post">
      <div className="card-header">
        <div
          style={{
            backgroundColor: "#fff",
          }}
          className="user-icon-container"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/userInfo/${cardDetails.UserId}`);
          }}
        >
          <FontAwesomeIcon icon={faUser} className="icon-styles" />
        </div>
        <div className="post-card-header">
          <span
            className="post-card-name"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/userInfo/${cardDetails.UserId}`);
            }}
          >
            {cardDetails.username}
          </span>
          <span style={{ fontSize: "12px" }} className="time-created-text">
            {moment(new Date(cardDetails.createdAt)).format("D MMM YYYY HH:mm")}
          </span>
        </div>
      </div>
      <div
        className="card-body"
        style={{ height: expandPost ? "fit-content" : "120px" }}
      >
        <span className="card-title">{cardDetails.title}</span>
        <span
          className={expandPost ? "post-body-text-expand" : "post-body-text"}
        >
          {cardDetails.postText}
        </span>
      </div>
      <div className="card-footer">
        <div className="card-footer-left">
          <div className="card-footer-likes-container">
            <label
              onClick={(e) => {
                e.stopPropagation();
                setLikesPopup(true);
              }}
            >
              {cardDetails?.likesCount}
            </label>
            <div
              onClick={(e) => {
                e.stopPropagation();
                likeOrUnlike(cardDetails.id);
              }}
              className="likes-icon"
            >
              {cardDetails.userLiked ? (
                <FontAwesomeIcon icon={faHeart} />
              ) : (
                <FontAwesomeIcon icon={faHeartRegular} />
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "15px",
            }}
            className="card-footer-comments-container"
          >
            <label>{cardDetails?.commentsCount}</label>
            <FontAwesomeIcon icon={faComment} style={{ marginLeft: "5px" }} />
          </div>
        </div>
        <div>
          {userDetails.userId === cardDetails.UserId && (
            <FontAwesomeIcon
              icon={faPen}
              style={{ marginLeft: "13px" }}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addPost({ ...cardDetails }));
                navigate(`/post/${cardDetails.id}/update`);
              }}
            />
          )}
          {userDetails.userId === cardDetails.UserId && (
            <FontAwesomeIcon
              icon={faTrash}
              style={{ marginLeft: "13px" }}
              onClick={(e) => {
                e.stopPropagation();
                deletePost(cardDetails.id);
              }}
            />
          )}
        </div>
      </div>
      <PopupModal
        isOpen={likesPopup}
        children={<LikesPopup cardDetails={cardDetails} />}
        closeModal={(e) => setLikesPopup(false)}
        title={"Likes"}
        contentStyles={{ maxHeight: "400px", height: "70%" }}
      />
    </div>
  );
};

export default PostCard;
