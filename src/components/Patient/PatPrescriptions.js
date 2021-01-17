import React from "react";
import "./PatDash.css";
import firebase from "../../firebase";
import Sidebar from "../Sidebar";
import DocRow from "../Doctor/DocRow.js";
import { withRouter } from "react-router-dom";
import { TextField } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import Button from "@material-ui/core/Button";
class PatPrescriptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      references: [],
      patientObject: {},
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((cred) => {
      if (cred) {
        this.setState({ email: cred.email });
        this.setState({ loaded: true });
        firebase
          .firestore()
          .collection("Patients")
          .doc(cred.email)
          .get()
          .then((doc) => {
            this.setState({ patientObject: doc.data() });
            //console.log("patientObject: ", this.state.patientObject);
          });

        var storageRef = firebase.storage().ref();
        storageRef
          .child(`${this.state.email}`)
          .listAll()
          .then((res) => {
            var refs = [];
            res.items.forEach(function (folderRef) {
              //console.log("folderRef: ", folderRef);
              refs.push(folderRef.name);
            });
            this.setState({ references: refs });
          });
      } else {
        alert("Please sign in to continue.");
        this.props.history.push("/doctor-dashboard/login");
      }
    });

    document.title = "My Prescriptions";
  }

  handleClick(ref) {
    firebase
      .storage()
      .ref()
      .child(`${this.state.email}/${ref}`)
      .getDownloadURL()
      .then((url) => {
        //console.log("url: ", url);
        window.location.href = url;
        // var xhrequest = new XMLHttpRequest();
        // xhrequest.responseType = "blob";
        // xhrequest.onload = ((event)=>{var blob = xhr.response;}
        //
        // };
        // xhrequest.open("GET", url);
        // xhrequest.send();
        // const element = document.createElement("a");
        // const file = new Blob([ref.value], {
        //   type: "text/plain",
        //   name: "prescription",
        // });
        // console.log();
        // element.href = URL.createObjectURL(file);
        // element.download = `${ref}.txt`;
        // document.body.appendChild(element);
        // element.click();
      });
  }

  render() {
    return (
      <div id="dashboard">
        {!this.state.errorTrue && this.state.loaded ? (
          <div>
            <Sidebar type="patient" />
            <div id="dashBody">
              <h1>Prescriptions</h1>
              <br />
              {this.state.references.length > 0 ? (
                <div>
                  <h2 style={{ marginRight: "50%" }}>
                    Here are the prescriptions that you have been given:{" "}
                  </h2>
                  <br />
                  {this.state.references.map((ref, i) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        margin: 0,
                        paddingBottom: "5%",
                      }}
                    >
                      <center>
                        {" "}
                        <br />
                      </center>
                      <br />
                      <Card
                        style={{
                          width: "50%",
                          fontSize: 5,
                        }}
                        onClick={() => {
                          this.handleClick(ref);
                        }}
                        key={i}
                      >
                        <CardActionArea>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h3"
                            >
                              <p style={{ fontSize: 20 }}>
                                {ref.split(".")[0]}
                              </p>
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            ></Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions></CardActions>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <h2>
                  Nothing to show here currently! Book a doctor today and get
                  your prescription!
                </h2>
              )}
            </div>
          </div>
        ) : (
          "" //<h1></h1>
        )}
      </div>
    );
  }
}

export default withRouter(PatPrescriptions);
// <button
//                 key={i}
//                 onClick={() => {S
//                   this.handleClick(ref);
//                 }}
//               >
//                 {ref.split(".")[0]}
//               </button>
