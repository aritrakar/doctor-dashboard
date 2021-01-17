import React from "react";
import "./Contact.css";
import Navbar from "./Navbar";
import { withRouter } from "react-router-dom";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import support from "../images/support.svg";

class Contact extends React.Component {
  render() {
    return (
      <div id="dashboard" style={{ backgroundColor: "transparent" }}>
        <Navbar />
        <div id="dashBody-contact">
          <div id="content-contact" style={{ margin: "auto" }}>
            <h1 style={{ fontSize: 45 }}>Contact</h1>
            <h2>
              <a href="mailto:docdashco@gmail.com">
                Email: docdashco@gmail.com
              </a>
              <br></br>
              <strong>OR</strong>
              <br />
              <a href="mailto:a8kar@uwaterloo.ca">a8kar@uwaterloo.ca</a>
            </h2>
            <br />
            <h2>Phone: XXX-XXX-XXXX</h2>
          </div>

          <img
            id="svg"
            src={support}
            alt="svg"
            style={{ width: "39%", marginRight: "5%" }}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Contact);
