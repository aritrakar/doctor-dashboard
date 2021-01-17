import React from "react";
import "./Form.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField } from "@material-ui/core";
export default class Basic extends React.Component {
  render() {
    return (
      <div id="form">
        
              <div id="form-body">
                <h3>Name</h3>
                <TextField type="name" name="email" />
                <h3>Email address</h3>
                <TextField
                  type="email"
                  label="Email"
                  placeholder="Enter email"
                  name="email"
                />
                <ErrorMessage name="email" component="div" />
                <h3>Password</h3>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </div>
              <button id="submit-button" type="submit">
                Submit
              </button>
          
        <img id="svg1" src="" alt="" />
      </div>
    );
  }
}
