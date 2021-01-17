import React from "react";
import "./PatDash.css";
import firebase from "../../firebase";
import Sidebar from "../Sidebar";
import DocRow from "../Doctor/DocRow.js";
import { withRouter } from "react-router-dom";

class PatPayments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      type: "",
      userID: "",
      patientObject: {},
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((cred) => {
      if (cred) {
        this.setState({ email: cred.email });
        this.setState({ loaded: true });
        console.log("cred patient: ", cred);
        firebase
          .firestore()
          .collection("Patients")
          .doc(cred.email)
          .get()
          .then((doc) => {
            this.setState({ patientObject: doc.data() });
            console.log("patientObject: ", this.state.patientObject);
          });
      } else {
        alert("Please sign in to continue.");
        this.props.history.push("/docdash/login");
      }
    });
  }

  render() {
    return (
      <div id="dashboard">
        {!this.state.errorTrue && this.state.loaded ? (
          <div>
            <Sidebar type="patient" />
            <div id="dashBody">
              <h1>Payments</h1>
            </div>
          </div>
        ) : (
          "" //<h1></h1>
        )}
      </div>
    );
  }
}

export default withRouter(PatPayments);
