import React from "react";
import { TextField } from "@material-ui/core";
import animationData from "../images/doctor-profile.json";
import Lottie from "react-lottie";
import firebase from "../firebase";
import Sidebar from "./Sidebar";

export default class DocProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      isDoctor: null,
      speciality: "",
      doctorObject: {},
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((cred) => {
      if (cred) {
        firebase
          .firestore()
          .collection("Doctors")
          .doc(cred.email)
          .get()
          .then((doc) => {
            if (!doc.exists) {
              alert("Error.");
              this.props.history.push("/doctor-dashboard/login");
            } else {
              this.setState({
                email: cred.email,
                doctorObject: doc.data(),
                password: cred.password,
              });
            }
          });
      } else {
        alert("Please sign in to continue");
        this.props.history.push("/doctor-dashboard/login");
      }
    });
  }
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    const { email, doctorObject, password } = this.state;
    console.log("email: ", email);
    console.log("doctorObject: ", doctorObject.email);
    console.log(doctorObject.password);
    return (
      <div id="dashboard">
        <Sidebar type="doctor" />
        <h1 style={{ fontSize: 70 }}>My Profile</h1>
        <div
          id="dashBody2"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "10%",
          }}
        >
          <div id="content2" style={{ margin: "auto" }}>
            <h2>Email:</h2>
            <br></br>
            <TextField
              style={{ width: "100%", marginBottom: "8%" }}
              placeholder={doctorObject?.email}
              id="standard-read-only-input"
              variant="standard"
              InputProps={{
                readOnly: true,
              }}
            />
            <br />
            <h2>Speciality:</h2>
            <TextField
              style={{ width: "50vh", marginBottom: "8%" }}
              placeholder={doctorObject?.speciality}
              id="standard-read-only-input"
              variant="standard"
              InputProps={{
                readOnly: true,
              }}
            />
            <br />
          </div>

          <Lottie options={defaultOptions} height={500} width={500} />
        </div>
      </div>
    );
  }
}
