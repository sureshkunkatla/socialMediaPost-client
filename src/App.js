import "./App.css";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="headerContainer">
          <Link className="navigationLink" to="/createPost">
            Create a post
          </Link>
          <Link className="navigationLink" to="/">
            Go Back
          </Link>
          <Link className="navigationLink" to="/login">
            Login
          </Link>
          <Link className="navigationLink" to="/registration">
            Registration
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
