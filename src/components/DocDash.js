import React from "react";
import firebase from "../firebase";
import "./Doctor/DocHome.css";
import Sidebar from "./Sidebar";
import { withRouter } from "react-router-dom";
import DocRow from "./Doctor/DocRow.js";
import { v4 as uuidv4 } from "uuid";
import animationData from "../images/lottie1";
import Lottie from "react-lottie";

class DocDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      doctorObject: {},
      appointments: [],
      patients: [],
      upcomingAppointments: [],
      recentPatients: [],
      loaded: false,
      errorTrue: false,
      roomid: "",
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((cred) => {
      //console.log("cred: ", cred.email);
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
            this.props.history.push("/docdash/docsignup");
            this.setState({ errorTrue: true });
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
            //console.log("appointments: ", appointments); //only the patient's email are required
          });

        // fetches patient data as per the emails in appointments above
        var pats = [];
        firebase
          .firestore()
          .collection("Patients")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              pats.push({ id: doc.id, data: doc.data() });
            });
          })
          .then(() => {
            //get this particular doctor's patients
            const names = this.state.appointments.map((item) => item.id);
            var p = pats.filter((pat) => {
              return names.includes(pat.id);
            });
            this.setState({ patients: p });
          })
          .then(() => {
            const docName = this.state.doctorObject.name;
            var patObj = this.state.patients;

            var upcomingAppts = patObj.filter((item) => {
              var data = item.data.consultations.filter((i) => {
                var res = i.name === docName;
                return res;
              })[0];
              const currentDate = new Date();
              const nextDate = new Date(data.next_consul.seconds * 1000);
              var result = nextDate > currentDate;
              return result;
            });

            var recentAppts = patObj.filter((item) => {
              var data = item.data.consultations.filter((i) => {
                var res = i.name === docName;
                return res;
              })[0];
              const currentDate = new Date();
              const prevDate = new Date(data.last_consul.seconds * 1000);
              var result = prevDate < currentDate;
              return result;
            });

            this.setState({
              upcomingAppointments: upcomingAppts,
              recentAppointments: recentAppts,
            });

            console.log("upcomingAppts:", upcomingAppts);
            console.log("recentAppts:", recentAppts);
          })
          .catch((err) => {
            alert("Please sign in to continue.");
            window.close();
            console.log(err);
            return err;
          });
      } else {
        alert("Please sign in to continue.");
        this.props.history.push("/docdash/login");
      }
    });
  }

  createRoom = (param) => {
    var code = uuidv4();
    var obj = {
      pathname: `/docdash/join/${code}/${this.state.doctorObject?.name}/${param}`,
    };
    this.props.history.push(obj);
  };

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    console.log("upcoming: ", this.state.upcomingAppointments);
    console.log("recent: ", this.state.recentAppointments);

    if (this.state.loaded === false) {
      return <Lottie options={defaultOptions} height={400} width={400} />;
    } else if (this.state.loaded === true) {
      return (
        <div id="dashboard">
          {!this.state.errorTrue && this.state.loaded ? (
            <div>
              <Sidebar type="doctor" />
              <div id="dashBody">
                <h1>
                  Welcome back, {formatName(this.state.doctorObject?.name)}
                </h1>
                <h2>Upcoming Appointments</h2>
                <DocRow
                  createRoom={(ref) => {
                    this.createRoom(ref);
                  }}
                  docName={this.state.doctorObject.name}
                  items={[
                    "name",
                    "last_consul",
                    "next_consul",
                    "when1",
                    "when2",
                    "bio",
                    "button",
                  ]}
                  dataType="data"
                  data={this.state.upcomingAppointments}
                />
                <h2>Recent patients</h2>
                <DocRow
                  items={["name", "bio"]}
                  dataType="data"
                  data={this.state.recentAppointments}
                  docName={this.state.doctorObject.name}
                />
              </div>
            </div>
          ) : (
            "" //<h1></h1>
          )}
        </div>
      );
    }
    console.log("patients: ", this.state.patients);
  }
}
export default withRouter(DocDash);

function formatName(name) {
  if (name !== undefined) {
    let arr = name.split(" ");
    return `Dr.${arr[arr.length - 1]}`;
  } else {
    return "";
  }
}
