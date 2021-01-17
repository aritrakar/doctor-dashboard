import React from "react";
import { TextField } from "@material-ui/core";
import animationData from "../images/doctor-profile.json";
import Lottie from "react-lottie";
import firebase from "../firebase";
import Sidebar from "./Sidebar";

export default class PatProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      isDoctor: null,
      speciality: "",
      patientObject: {},
      bio: "",
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((cred) => {
      if (cred) {
        firebase
          .firestore()
          .collection("Patients")
          .doc(cred.email)
          .get()
          .then((doc) => {
            if (!doc.exists) {
              alert("Error.");
              this.props.history.push("/docdash/login");
            } else {
              this.setState({
                email: cred.email,
                patientObject: doc.data(),
                password: cred.password,
                bio: doc.data().bio,
                name: doc.data().name,
              });
            }
          });
      } else {
        alert("Please sign in to continue");
        this.props.history.push("/docdash/login");
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

    const { email, patientObject, password } = this.state;
    var bio = patientObject.bio;
    console.log(bio);
    return (
      <div id="dashboard">
        <Sidebar type="patient" />
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
              placeholder={patientObject?.email}
              id="standard-read-only-input"
              variant="standard"
              InputProps={{
                readOnly: true,
              }}
            />
            <br />
            <h2>Bio:</h2>
            <textarea
              style={{
                width: "60vh",
                height: "35vh",
                resize: "none",
                textAlign: "left",
                borderColor: "lightblue",
              }}
            >
              BRU
            </textarea>
            <br />
          </div>

          <Lottie options={defaultOptions} height={500} width={500} />
        </div>
      </div>
    );
  }
}
