import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeApiRequest } from "../api/apiJson";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [responseMsg, setResonseMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const onClickLogin = async () => {
    const data = {
      username: username,
      password: password,
    };

    try {
      const makeLoginReq = await makeApiRequest(
        "auth/login",
        "POST",
        data,
        true
      );
      if (makeLoginReq?.code === 200) {
        login(makeLoginReq);
        navigate("/");
      } else {
        setResonseMsg(makeLoginReq?.error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onClickRegister = () => {
    navigate("/registration");
  };

  return (
    <div className="login-bg-container">
      <div className="image-container">
        <img
          src={require("../assets/Login.jpg")}
          alt="Logo"
          className="login-img"
        />
      </div>
      <div className="login-container">
        <div className="login-card-container">
          <div className="logo-img-container">
            <img
              src={require("../assets/ShoutOutLogo.png")}
              alt="logo"
              className="logo-img"
            />
          </div>
          <div className="input-label-container">
            <label className="input-label">USERNAME</label>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="input-field"
              placeholder="Enter your username..."
            />
          </div>
          <div className="input-label-container">
            <label className="input-label">PASSWORD</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="input-field"
                placeholder="Enter your password..."
              />
              <div
                className="eye-icon-position"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </div>
            </div>
          </div>
          <p className="error-msg">{responseMsg}</p>
          <button
            className="button-primary"
            onClick={onClickLogin}
            // disabled={username.length > 0 || password.length > 0}
            disabled={!username.length > 0 || !password.length > 0}
            style={
              !username.length > 0 || !password.length > 0
                ? { opacity: 0.8 }
                : { opacity: 1 }
            }
          >
            Login
          </button>
          <button className="button-primary" onClick={onClickRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
