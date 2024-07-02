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
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(8).required(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required(),
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
    <div className="login-bg-container">
      <div className="image-container">
        <img
          src={require("../assets/RegisterImg.png")}
          alt="Logo"
          className="login-img"
        />
      </div>
      <div className="login-container">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ isValid, isSubmitting }) => (
            <Form className="login-card-container">
              <div className="logo-img-container">
                <img
                  src={require("../assets/ShoutOutLogo.png")}
                  alt="logo"
                  className="logo-img"
                />
              </div>
              <div className="input-label-container">
                <label className="input-label">USERNAME</label>
                <Field
                  autoComplete="off"
                  className="input-field"
                  name="username"
                  placeholder="(Ex. John123...)"
                />
                <ErrorMessage
                  className="error-msg"
                  name="username"
                  component="span"
                />
              </div>
              <div className="input-label-container">
                <label className="input-label">PASSWORD</label>
                <Field
                  autoComplete="off"
                  type="password"
                  className="input-field"
                  name="password"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  className="error-msg"
                  name="password"
                  component="span"
                />
              </div>
              <div className="input-label-container">
                <label className="input-label">CONFIRM PASSWORD</label>
                <Field
                  autoComplete="off"
                  type="password"
                  className="input-field"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                />
                <ErrorMessage
                  className="error-msg"
                  name="confirmPassword"
                  component="span"
                />
              </div>
              <p className="error-msg">{responseMsg}</p>
              <button
                className="button-primary"
                type="submit"
                disabled={!isValid || isSubmitting}
                style={{
                  opacity: !isValid || isSubmitting ? 0.8 : 1,
                }}
              >
                Register
              </button>
              <button className="button-primary" onClick={onClickLogin}>
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Registration;
