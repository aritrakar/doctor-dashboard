import React from "react";
import { withRouter } from "react-router-dom";
import firebase from "../../firebase";
import "./DocPatients.css";
import Sidebar from "../Sidebar";
//import DocRow from "./DocRow.js";
//import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
//import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
class DocConsultations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      doctorObject: {},
      payments: [],
      loaded: false,
      errorTrue: false,
      appointments: [],
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
        firebase
          .firestore()
          .collection("Doctors")
          .doc(cred.email)
          .collection("appointments")
          .onSnapshot((snapshot) => {
            const appointments = [];
            snapshot.forEach((doc) => {
              appointments.push({ id: doc.id, data: doc.data() });
            });
            this.setState({ appointments: appointments });
          });
      } else {
        alert("Please sign in to continue.");
        this.props.history.push("/doctor-dashboard/docsignup");
      }
    });
    document.title = "Consultations";
  }

  render() {
    console.log("payments: ", this.state.payments);
    return (
      <div id="dashboard">
        {!this.state.errorTrue && this.state.loaded ? (
          <div>
            <Sidebar />
            <div id="dashBody">
              <h1>Consultations</h1>
              {this.state.appointments &&
                this.state.appointments.map((apt) => {
                  return (
                    <div>
                      <Card>
                        <CardActionArea>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h1"
                            >
                              {apt.data.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {apt.data.type}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary">
                            Share
                          </Button>
                          <Button size="small" color="primary">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          "" //<h1></h1>
        )}
      </div>
    );
  }
}

export default withRouter(DocConsultations);
