import React from "react";
import firebase from "../../firebase";
import "./DocPatients.css";
import Sidebar from "../Sidebar";
import { withRouter } from "react-router-dom";
import DocRow from "./DocRow.js";
import TextField from "@material-ui/core/TextField";
import { columnsTotalWidthSelector } from "@material-ui/data-grid";
import PatDash from "../PatDash";
//import SearchIcon from "@material-ui/icons/Search";

class DocPatients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      doctorObject: {},
      appointments: [],
      patients: [],
      loaded: false,
      errorTrue: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((cred) => {
      if (cred) {
        this.setState({ email: cred.email, loaded: true });
        //this.setState({ loaded: true });

        firebase
          .firestore()
          .collection("Doctors")
          .doc(cred.email)
          .get()
          .then((doc) => {
            this.setState({ doctorObject: doc.data() });
          })
          .catch((err) => {
            console.log("err: ", err);
            alert("Please sign in to continue.");
            this.props.history.push("/docdash/docsignup");
            this.setState({ errorTrue: true });
          });
        console.log("IN BETWEEN");

        firebase
          .firestore()
          .collection("Doctors")
          .doc(cred.email)
          .collection("appointments")
          .onSnapshot((snapshot) => {
            const appointments = [];
            snapshot.forEach((doc) => {
              appointments.push(doc.id);
            });
            this.setState({ appointments: appointments });
          });

        var pats = [];
        firebase
          .firestore()
          .collection("Patients")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (this.state.appointments.includes(doc.id)) {
                pats.push({ id: doc.id, data: doc.data() });
              }
            });
            this.setState({ patients: pats });
          });
      } else {
        alert("Please sign in to continue.");
        this.props.history.push("/docdash/docsignup");
      }
    });
  }

  render() {
    const { patients } = this.state;
    return (
      <div id="dashboard">
        {!this.state.errorTrue && this.state.loaded ? (
          <div>
            <Sidebar type="doctor" />
            <div id="dashBody">
              <h1>Patients</h1>
              <TextField
                label="Search patients"
                id="outlined-basic"
                style={{
                  margin: 20,
                  marginBottom: 30,
                  borderRadius: 30,
                }}
              ></TextField>
              <DocRow dataType="data" items={["name", "bio"]} data={patients} />
            </div>
          </div>
        ) : (
          "" //<h1></h1>
        )}
      </div>
    );
  }
}
export default withRouter(DocPatients);
