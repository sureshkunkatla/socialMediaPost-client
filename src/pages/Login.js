import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeApiRequest } from "../api/apiJson";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="createPostPage">
      <label>User Name</label>
      <input
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <p>{responseMsg}</p>
      <button onClick={onClickLogin}>Login</button>
      <button onClick={onClickRegister}>Register</button>
    </div>
  );
};

export default Login;
