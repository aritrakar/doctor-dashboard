import React from "react";
import "./Patient/PatDash.css";
import firebase from "../firebase";
import Sidebar from "./Sidebar";
import PatRow from "./Patient/PatRow.js";
import { withRouter } from "react-router-dom";
import { TextField } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";
import Modal from "react-modal";
import SearchIcon from "@material-ui/icons/Search";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import animationData from "../images/lottie1";
import Lottie from "react-lottie";

class PatDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      type: "",
      userID: "",
      patientObject: {},
      loaded: false,
      doctors: [],
      upcomingAppointments: [],
      recentAppointments: [],
      modalOpen: false,
      isDoctorModalOpen: false,
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((cred) => {
      if (cred) {
        this.setState({ email: cred.email });

        //console.log("cred patient: ", cred);
        firebase
          .firestore()
          .collection("Patients")
          .doc(cred.email)
          .get()
          .then((doc) => {
            this.setState({ patientObject: doc.data() });
          })
          .then(() => {
            const patObj = this.state.patientObject;
            console.log("patObj: ", patObj);
            var upcomingAppts = patObj.consultations?.filter((item) => {
              const currentDate = new Date();
              const nextDate = new Date(item.next_consul.seconds * 1000);
              var result = nextDate > currentDate;
              return result;
            });

            var recentAppts = patObj.consultations?.filter((item) => {
              const currentDate = new Date();
              const prevDate = new Date(item.last_consul.seconds * 1000);
              var result = prevDate < currentDate;
              //var c = currentDate - prevDate;
              //console.log("c: ", c);
              //console.log("comparison2: ", result);
              return result;
            });
            this.setState({
              upcomingAppointments: upcomingAppts,
              recentAppointments: recentAppts,
            });

            firebase
              .firestore()
              .collection("Doctors")
              .onSnapshot((snapshot) => {
                const doctors = [];
                snapshot.forEach((doc) => {
                  doctors.push({ id: doc.id, data: doc.data() });
                });
                this.setState({ doctors: doctors });
              });
            this.setState({ loaded: true });
            //console.log("patientObject: ", this.state.patientObject);

            /*
            var appt1 = [];
            var appt2 = [];

            const currentDate = new Date();
            for (
              let i = 0;
              i < this.state.patientObject.consultations.length;
              i++
            ) {
              var newDate = new Date(
                this.state.patientObject.consultations[i].next_consul.seconds *
                  1000
              );
              if (newDate >= currentDate) {
                appt1.push(this.state.patientObject.consultations[i]);
              } else {
                appt2.push(this.state.patientObject.consultations[i]);
              }
            }
            */
          });
      } else {
        alert("Please sign in to continue.");
        this.props.history.push("/docdash/login");
      }
    });
  }

  searchDoctors = () => {};

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    const { upcomingAppointments, recentAppointments } = this.state;

    console.log("upcomingAppointments down: ", upcomingAppointments);
    console.log("recentAppointments down: ", recentAppointments);

    if (this.state.loaded === false) {
      return <Lottie options={defaultOptions} height={400} width={400} />;
    } else if (this.state.loaded === true) {
      return (
        <div id="dashboard">
          {!this.state.errorTrue && this.state.loaded ? (
            <div>
              <Sidebar type="patient" />
              <div id="dashBody">
                <h1>Welcome back, {this.state.patientObject.name}</h1>
                <div id="patHeader">
                  <Modal
                    onRequestClose={() => {
                      this.setState({ modalOpen: false });
                    }}
                    isOpen={this.state.modalOpen}
                  >
                    <h1>Find the doctor you need.</h1>
                    <TextField placeholder="Search" />

                    {this.state.doctors.map((doc) => {
                      return (
                        <Card style={{ width: "50%", margin: "auto" }}>
                          <CardActionArea>
                            <CardContent>
                              <h3>
                                {doc.data.name} - {doc.data.speciality}
                              </h3>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Button
                              variant="outlined"
                              startIcon={<SearchIcon />}
                              color="primary"
                            >
                              MAKE AN APPOINTMENT
                            </Button>
                            <Button
                              style={{ marginLeft: "35%" }}
                              size="small"
                              color="primary"
                            >
                              Learn More
                            </Button>
                          </CardActions>
                        </Card>
                      );
                    })}
                  </Modal>

                  <Button
                    startIcon={<SearchIcon style={{ marginLeft: "1%" }} />}
                    variant="outlined"
                    onClick={() => {
                      this.setState({ modalOpen: true });
                    }}
                  >
                    SEARCH DOCTORS
                  </Button>
                </div>

                <h2>Upcoming Appointments</h2>
                <PatRow
                  dataType="nodata"
                  items={[
                    "name",
                    "last_consul",
                    "next_consul",
                    "when1",
                    "when2",
                  ]}
                  data={upcomingAppointments}
                />

                <h2>Recent appointments</h2>
                <PatRow
                  dataType="nodata"
                  items={[
                    "name",
                    "last_consul",
                    "next_consul",
                    "when1",
                    "when2",
                  ]}
                  data={recentAppointments}
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
}

export default withRouter(PatDash);
