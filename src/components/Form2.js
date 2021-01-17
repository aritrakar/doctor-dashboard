import React from "react";
import "./Form.css";
import svg2 from "../images/svg2.svg";
import { TextField } from "@material-ui/core";

export default class Form2 extends React.Component {
  render() {
    return (
      <div id="form">
        <div id="form-body">
          <h1>SIGN UP</h1>
          <h3>Name</h3>
          <TextField
            style={{ width: "50%" }}
            type="name"
            label="Name"
            name="email"
          />
          <h3>Email address</h3>
          <TextField
            style={{ width: "50%" }}
            type="email"
            label="Email"
            name="email"
          />
          <h3>Password</h3>
          <TextField
            style={{ width: "50%" }}
            type="password"
            label="Password"
            name="password"
          />
          <div class="buttontest">
            <div class="container">
              <button class="btn effect01" href="/docdash/patsignup">
                <span style={{ color: "black" }}>SUBMIT</span>
              </button>
            </div>
          </div>
        </div>

        <img id="svg1" src={svg2} alt="" />
      </div>
    );
  }
}
