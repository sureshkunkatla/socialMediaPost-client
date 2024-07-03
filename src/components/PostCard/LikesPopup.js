import React, { useEffect, useState } from "react";
import { makeApiRequest } from "../../api/apiJson";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "../../context/NavigationContext";

const LikesPopup = ({ cardDetails }) => {
  const [likesArray, setLikesArray] = useState([]);
  const { id } = cardDetails;
  const navigate = useNavigation();

  useEffect(() => {
    fetchAllLikesProfiles();
  }, []);

  const fetchAllLikesProfiles = async () => {
    try {
      const fetchLikes = await makeApiRequest(`posts/getAllLikes/${id}`);
      if (fetchLikes?.length > 0) {
        setLikesArray(fetchLikes);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="likes-popup-styles">
      {likesArray?.map((each) => {
        return (
          <div
            key={each.id}
            className="likes-popup-body"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/userInfo/${each.userId}`);
            }}
          >
            <div
              className="user-icon-container"
              style={{ backgroundColor: "#ccc" }}
            >
              <FontAwesomeIcon icon={faUser} className="icon-styles" />
            </div>
            <span className="user-name-styles">{each.username}</span>
          </div>
        );
      })}
    </div>
  );
};

export default LikesPopup;
