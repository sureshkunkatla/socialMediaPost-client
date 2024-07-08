import "./App.css";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PageNotFound from "./pages/PageNotFound";
import { Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Profile from "./pages/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useNavigation } from "./context/NavigationContext";

function App() {
  const { authentication, logout, userDetails } = useAuth();
  const navigate = useNavigation();

  const onClickLogout = () => {
    logout();
  };

  return (
    <div className="app-container">
      {authentication && (
        <div className="headerContainer">
          <div className="logo-img-container-header">
            <Link className="navigationLink" to="/">
              <img
                src={require("./assets/ShoutOutLogohorizontal.png")}
                alt="logo"
                className="logo-img-header"
              />
            </Link>
          </div>
          <div className="header-right-content">
            <Menu
              menuButton={
                <div className="user-icon">
                  <FontAwesomeIcon icon={faUser} style={{ fontSize: "20px" }} />
                </div>
              }
              transition
            >
              <div className="username-in-menu">
                <span className="menu-item-text">{userDetails.username}</span>
              </div>
              <MenuItem
                onClick={() => navigate(`/userInfo/${userDetails.userId}`)}
              >
                <FontAwesomeIcon icon={faUser} style={{ fontSize: "14px" }} />
                <span className="menu-item-span">Profile</span>
              </MenuItem>
              <MenuItem onClick={onClickLogout}>
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  style={{ fontSize: "14px" }}
                />
                <span className="menu-item-span">Logout</span>
              </MenuItem>
            </Menu>
            <Link className="navigationLink" to="/createPost">
              <button className="button-primary">Create a post</button>
            </Link>
          </div>
        </div>
      )}
      <div className={authentication ? "app-body" : ""}>
        <Routes>
          {!authentication && (
            <>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/registration" element={<Registration />} />
            </>
          )}

          <Route exact path="/" element={<ProtectedRoute element={Home} />} />
          <Route
            exact
            path="/createPost"
            element={<ProtectedRoute element={CreatePost} />}
          />
          <Route
            exact
            path="/post/:id/update"
            element={<ProtectedRoute element={CreatePost} />}
          />
          <Route
            exact
            path="/post/:id"
            element={<ProtectedRoute element={Post} />}
          />
          <Route
            exact
            path="/userInfo/:id"
            element={<ProtectedRoute element={Profile} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
