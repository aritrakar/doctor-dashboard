import React from "react";
import "./Contact.css";
import svg from "../images/undraw_team_spirit_hrr4.svg";
import features from "../images/features.svg";
import Navbar from "./Navbar";
import { withRouter } from "react-router-dom";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";

class About extends React.Component {
  render() {
    return (
      <div id="dashboard" style={{ backgroundColor: "transparent" }}>
        <Navbar />
        <div id="dashBody-contact">
          <div
            id="content-contact"
            style={{
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1 style={{ fontSize: 45, fontWeight: 300 }}>Aim</h1>
            <p style={{ width: "60%", fontSize: 30, fontWeight: 200 }}>
              DocDash aims to <strong>streamline and digitize</strong> the
              process of connecting patients to the right doctors efficiently.
            </p>
          </div>
          <img
            id="svg"
            src={svg}
            alt="svg"
            style={{ width: "39%", marginRight: "5%" }}
          />
        </div>

        <div id="dashBody-contact">
          <img
            id="svg"
            src={features}
            alt="svg"
            style={{ width: "39%", marginLeft: "10%" }}
          />
          <div
            id="content-contact"
            style={{
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1 style={{ fontSize: 45, fontWeight: 300 }}>Features</h1>
            <p style={{ width: "60%", fontSize: 30, fontWeight: 200 }}>
              <strong>Encrypted teleconsultations</strong> and{" "}
              <strong>digital prescriptions</strong> at your fingertips
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(About);
