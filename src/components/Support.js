import React from "react";
import "./Support.css";
import Sidebar from "./Sidebar";
import { withRouter } from "react-router-dom";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import support from "../images/support.svg";
import firebase from "../firebase";
class Support extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((cred) => {
      if (cred) {
        return true;
      } else {
        alert("Please login to continue.");
        this.props.history.push("/doctor-dashboard/login");
      }
    });
  }
  render() {
    return (
      <div id="dashboard">
        <Sidebar type="patient" />
        <h1 style={{ fontSize: 45 }}>Support</h1>
        <div id="dashBody2">
          <div id="content2" style={{ margin: "auto" }}>
            <h2>
              Email: docdashco@gmail.com
              <br></br>
              <strong>OR</strong>
              <br />
              a8kar@uwaterloo.ca
            </h2>
            <br />
            <h2>Phone: 123-456-7890</h2>
          </div>

          <img id="svg" src={support} alt="svg" style={{ width: "45%" }} />
        </div>
      </div>
    );
  }
}

export default withRouter(Support);
