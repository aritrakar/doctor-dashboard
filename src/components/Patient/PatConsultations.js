import React from "react";
import "./PatDash.css";
import firebase from "../../firebase";
import Sidebar from "../Sidebar";
import PatRow from "./PatRow.js";
import DocRow from "../Doctor/DocRow.js";
import { withRouter } from "react-router-dom";

class PatConsultations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      patientObject: { consultations: [] },
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((cred) => {
      console.log("cred patient 1 : ", cred);
      if (cred) {
        this.setState({ email: cred.email });

        firebase
          .firestore()
          .collection("Patients")
          .doc(cred.email)
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.setState({ patientObject: doc.data() });
            } else {
              alert("Error.");
            }
          });
        console.log(this.state.patientObject);

        this.setState({ loaded: true });
      } else {
        alert("Please sign in to continue.");
        this.props.history.push("/docdash/login");
      }
    });
  }

  render() {
    const { patientObject } = this.state;
    return (
      <div id="dashboard">
        {this.state.loaded ? (
          <div>
            <Sidebar type="patient" />
            <div id="dashBody">
              <h1>Consultations</h1>
              <PatRow
                dataType="nodata"
                items={["name", "when1", "when2", "last_consul", "next_consul"]}
                data={patientObject?.consultations}
              />
            </div>
          </div>
        ) : (
          "" //<h1></h1>
        )}
      </div>
    );
  }
}

export default withRouter(PatConsultations);
