import "./App.css";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { authentication, logout } = useAuth();

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
        </div>
      )}
      <Routes>
        {!authentication && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </>
        )}

        <Route path="/" element={<ProtectedRoute element={Home} />} />
        <Route
          path="/createPost"
          element={<ProtectedRoute element={CreatePost} />}
        />
        <Route path="/post/:id" element={<ProtectedRoute element={Post} />} />
      </Routes>
    </div>
  );
}

export default App;
