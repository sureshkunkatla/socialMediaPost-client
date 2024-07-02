import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import {
  faComment,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";

const PostCard = ({ cardDetails, likeOrUnlike }) => {
  return (
    <div className="post">
      <div className="card-header">
        <div
          style={{
            height: "35px",
            width: "35px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon
            icon={faUser}
            style={{ fontSize: "20px", color: "#282828" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            marginLeft: "10px",
          }}
        >
          <span style={{ fontSize: "16px" }}>{cardDetails.username}</span>
          <span style={{ fontSize: "12px" }}>
            {moment(new Date(cardDetails.createdAt)).format("D MMM YYYY HH:mm")}
          </span>
        </div>
      </div>
      <div className="card-body">
        <span
          style={{
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "7px",
          }}
        >
          {cardDetails.title}
        </span>
        <span style={{ fontSize: "14px" }}>{cardDetails.postText}</span>
      </div>
      <div className="card-footer">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label>{cardDetails?.likesCount}</label>
          <div
            onClick={(e) => {
              e.stopPropagation();
              likeOrUnlike(cardDetails.id);
            }}
            style={{
              marginLeft: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
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
        >
          <label>{cardDetails?.commentsCount}</label>
          <FontAwesomeIcon icon={faComment} style={{ marginLeft: "5px" }} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
