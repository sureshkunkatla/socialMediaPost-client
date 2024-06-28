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

function App() {
  const { authentication, logout, userDetails } = useAuth();

  const onClickLogout = () => {
    logout();
  };

  return (
    <div className="App">
      {authentication && (
        <div className="headerContainer">
          <Link className="navigationLink" to="/createPost">
            Create a post
          </Link>
          <Link className="navigationLink" to="/">
            Home
          </Link>
          <button onClick={onClickLogout}>Logout</button>
          <p>{userDetails.username}</p>
        </div>
      )}
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
  );
}

export default App;
