import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { makeApiRequest } from "../api/apiJson";
import { useAuth } from "../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addPost } from "../redux/reducers/postsSlice";

function CreatePost() {
  let { id } = useParams();
  const navigate = useNavigate();
  const { userDetails } = useAuth();
  const post = useSelector((state) => state.posts.post);
  const dispatch = useDispatch();
  console.log(post);

  const [initialValues, setInitialValues] = useState({
    title: "",
    postText: "",
  });

  useEffect(() => {
    if (id) {
      setInitialValues({
        title: post.title,
        postText: post.postText,
      });
    } else {
      setInitialValues({
        title: "",
        postText: "",
      });
    }
  }, [id, post]);

  useEffect(() => {
    console.log("called out side");
    if (id === undefined) {
      console.log("called inside side");
      dispatch(addPost({}));
    }
  }, [id]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
  });

  const onSubmit = async (data) => {
    try {
      if (id) {
        const updatePost = await makeApiRequest(`posts/${id}`, "PUT", data);
        if (updatePost?.message) {
          navigate("/");
        } else {
          alert(updatePost?.error);
        }
      } else {
        const postData = {
          ...data,
          username: userDetails?.username,
          UserId: userDetails?.userId,
        };
        const makeLoginReq = await makeApiRequest("posts", "POST", postData);
        if (makeLoginReq?.id) {
          navigate("/");
        } else {
          alert(makeLoginReq?.error);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="createPostPage">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form className="create-post-container">
            <div className="input-label-container">
              <label className="input-label">TITLE</label>
              <Field
                autoComplete="off"
                className="input-field"
                name="title"
                placeholder="(Ex. Title...)"
                value={values.title}
              />
              <ErrorMessage
                className="error-msg"
                name="title"
                component="span"
              />
            </div>
            <div className="input-label-container">
              <label className="input-label">POST</label>
              <Field
                as="textarea"
                autoComplete="off"
                className="textarea-field"
                name="postText"
                placeholder="(Ex. Post...)"
                value={values.postText}
              />
              <ErrorMessage
                className="error-msg"
                name="postText"
                component="span"
              />
            </div>
            <button className="button-primary" type="submit">
              {id ? "Update Post" : "Create Post"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreatePost;
