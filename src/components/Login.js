import React from "react";
import "./Login.css";
import logo from "../images/logo.png";
import svg4 from "../images/svg4.svg";
import { TextField } from "@material-ui/core";
import firebase from "../firebase";
//import { withRouter } from "react-router-dom"; //???

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  login = (event) => {
    const { email, password } = this.state;
    event.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .firestore()
          .collection("Doctors")
          .doc(email)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("Doctor document data: ", doc.data());
              console.log("userID: ", doc.data().userID);
              console.log("FOUND DOCTOR");
              this.props.history.push(`/doctor-dashboard/docdashboard`);
            } else {
              firebase
                .firestore()
                .collection("Patients")
                .doc(email)
                .get()
                .then((doc) => {
                  console.log("Patient document data: ", doc.data());
                  console.log("FOUND PATIENT");
                  this.props.history.push(`/doctor-dashboard/patdashboard`);
                });
            }
          });
      })
      .catch((err) => {
        alert(err);
      });
  };

  componentDidMount() {
    document.title = "Login | DocDash";
  }

  render() {
    return (
      <div id="form">
        <form id="form-body" onSubmit={(e) => this.login(e)}>
          <img
            alt="logo"
            style={{ width: "100px", height: "100px" }}
            src={logo}
          />

          <h1>LOGIN</h1>

          <h3>Email</h3>
          <TextField
            style={{ width: "50%" }}
            type="email"
            label="Email"
            name="email"
            required
            onChange={(e) => {
              this.setState({ email: e.target.value });
            }}
          />
          <h3>Password</h3>
          <TextField
            style={{ width: "50%" }}
            type="password"
            label="Password"
            name="password"
            required
            onChange={(e) => {
              this.setState({ password: e.target.value });
            }}
          />

          <div className="buttontest">
            <div className="container">
              <button
                onClick={(event) => {
                  this.login(event);
                }}
                className="btn effect01"
                type="submit"
              >
                <span style={{ color: "black" }}>LOGIN</span>
              </button>
            </div>
          </div>
        </form>

        <img
          style={{ width: "40%", margin: 20, marginRight: "5%" }}
          id="svg1"
          src={svg4}
          alt="svg1"
        />
      </div>
    );
  }
}
