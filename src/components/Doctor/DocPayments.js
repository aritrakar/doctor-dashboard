import React from "react";
import { withRouter } from "react-router-dom";
import firebase from "../../firebase";
import "./DocPatients.css";
import Sidebar from "../Sidebar";
import DocRow from "./DocRow.js";
//import TextField from "@material-ui/core/TextField";

class DocPayments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      doctorObject: {},
      payments: [],
      loaded: false,
      errorTrue: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((cred) => {
      if (cred) {
        this.setState({ email: cred.email });
        this.setState({ loaded: true });
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
            this.props.history.push("/doctor-dashboard/docsignup");
            this.setState({ errorTrue: true });
          });

        firebase
          .firestore()
          .collection("Doctors")
          .doc(cred.email)
          .collection("payments")
          .onSnapshot((snapshot) => {
            const payments = [];
            snapshot.forEach((doc) => {
              payments.push(doc.data());
            });
            this.setState({ payments: payments });
          });
      } else {
        alert("Please sign in to continue.");
        this.props.history.push("/doctor-dashboard/docsignup");
      }
    });
  }

  render() {
    const { payments } = this.state;
    console.log("payments: ", payments);
    return (
      <div id="dashboard">
        {!this.state.errorTrue && this.state.loaded ? (
          <div>
            <Sidebar type="doctor" />
            <div id="dashBody">
              <h1>Payments</h1>

              <DocRow
                dataType="nodata"
                items={["name", "amount", "when", "time"]}
                data={payments}
              />
            </div>
          </div>
        ) : (
          //<h1></h1>
          ""
        )}
      </div>
    );
  }
}

export default withRouter(DocPayments);
