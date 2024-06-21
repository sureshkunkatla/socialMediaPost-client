import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeApiRequest } from "../api/apiJson";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseMsg, setResonseMsg] = useState("");
  const navigate = useNavigate();

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
        sessionStorage.setItem("access_token", makeLoginReq?.token);
        navigate("/");
      } else {
        setResonseMsg(makeLoginReq?.error);
      }
    } catch (e) {
      console.log(e);
    }

    // axios.post("http://localhost:3001/auth/login", data).then((response) => {
    //   if (response?.data?.code === 200) {
    //     navigate("/");
    //   } else {
    //     setResonseMsg(response?.data?.error);
    //   }
    // });
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
    </div>
  );
};

export default Login;
