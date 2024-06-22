import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { makeApiRequest } from "../api/apiJson";

const Registration = () => {
  const navigate = useNavigate();
  const [responseMsg, setResponseMsg] = useState("");
  const initialValues = {
    username: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(8).required(),
  });

  const onSubmit = async (data) => {
    try {
      const register = await makeApiRequest("auth", "POST", data, true);
      if (register?.code === 200) {
        setResponseMsg(register?.message);
        navigate("/login");
      } else {
        setResponseMsg(register?.error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onClickLogin = () => {
    navigate("/login");
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. John123...)"
          />
          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Enter your password"
          />
          <p>{responseMsg}</p>
          <button type="submit">Register</button>
        </Form>
      </Formik>
      <button onClick={onClickLogin}>Login</button>
    </div>
  );
};

export default Registration;
