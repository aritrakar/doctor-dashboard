import React from "react";
import logo2 from "../images/logo2.png";
import "./Navbar.css";
import { withRouter } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <div id="navbar">
        <img
          style={{ width: "9%", height: "9%", cursor: "pointer" }}
          src={logo2}
          alt="logo"
          onClick={() => {
            this.props.history.push("/doctor-dashboard");
          }}
        />
        <p
          onClick={() => {
            this.props.history.push("/doctor-dashboard/about");
          }}
        >
          About
        </p>
        <p
          onClick={() => {
            this.props.history.push("/doctor-dashboard/contact");
          }}
        >
          Contact
        </p>
        <p
          onClick={() => {
            this.props.history.push("/doctor-dashboard/login");
          }}
        >
          Login
        </p>
        <div className="buttontest">
          <div className="container">
            <button
              onClick={() => {
                this.props.history.push("/doctor-dashboard/docsignup");
              }}
              className="btn effect01"
            >
              <span style={{ color: "white" }}>DOCTOR</span>
            </button>
          </div>
        </div>
        <div className="buttontest">
          <div className="container">
            <button
              onClick={() => {
                this.props.history.push("/doctor-dashboard/patsignup");
              }}
              className="btn effect01"
            >
              <span style={{ color: "white" }}>PATIENT</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
