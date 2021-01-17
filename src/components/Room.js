import React from "react";
import firebase from "../firebase";
import "./Room.css";

export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientObject: {},
      isDoctor: null,
      file: null,
      patientEmail: "",
      doctorEmail: "",
      progress: 0,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((cred) => {
      if (cred) {
        const arr = window.location.href.split("/");
        const patientEmail = arr[arr.length - 1];

        this.setState({ patientEmail: patientEmail });

        firebase
          .firestore()
          .collection("Patients")
          .doc(cred.email)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("Patient logged in.");
              this.setState({ isDoctor: false });
            }
          });

        firebase
          .firestore()
          .collection("Patients")
          .doc(patientEmail)
          .get()
          .then((doc) => {
            console.log("doc.data(): ", doc.data());
            this.setState({
              patientEmail: doc.data().email,
              patientObject: doc.data(),
            });
          });

        firebase
          .firestore()
          .collection("Doctors")
          .doc(cred.email)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("doctor exists");
              this.setState({ isDoctor: true, doctorEmail: doc.data().email });

              window.Email.send({
                Host: "smtp.elasticemail.com",
                Username: "docdashco@gmail.com",
                Password: "AA52E0CA5912095EFB1353886D8460035D0F",
                To: patientEmail,
                From: "docdashco@gmail.com",
                Subject: "DocDash meeting link",
                Body: `Hi ${this.state.patientObject.name},\nYour booked Dr. ${this.props.match.params.docName} has joined the Teleconsultation session. 
                Please join the meeting with this link: ${window.location.href}`,
              }).then((message) => {
                console.log(message);
              });
            }
          });
      } else {
        alert("Please login to continue.");
        this.props.history.push("/docdash/login");
      }
    });
  }

  uploadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([document.getElementById("prescription").value], {
      type: "text/plain",
      name: "prescription",
    });
    console.log();
    element.href = URL.createObjectURL(file);
    element.download = `${
      this.props.match.params.docName
    }_${new Date().toString()}.txt`;
    document.body.appendChild(element);
    element.click();

    const task = firebase
      .storage()
      .ref(
        `${this.state.patientEmail}/${this.props.match.params.docName}_${
          new Date().toString().split("GMT")[0]
        }`
      )
      .put(file);

    task.on(
      "state_changed",
      (snapshot) => {
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress: progress });
      },
      (error) => {
        // Error function
        alert(error);
      },
      () => {
        // complete function
        firebase
          .storage()
          .ref(
            `${this.state.patientEmail}/${
              this.props.match.params.docName
            }_${new Date().toString()}`
          )
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
          });
      }
    );
  };

  render() {
    const { patientObject } = this.state;
    //console.log("patientObject in render: ", patientObject?.name);

    return (
      <div id="video-div">
        <h1>Meeting with Dr. {this.props.match.params.docName}</h1>
        <p>Meeting ID: {this.props.match.params.roomid}</p>
        <div id="content">
          <iframe
            id="video"
            title="room"
            src={`https://tokbox.com/embed/embed/ot-embed.js?embedId=0d288271-e99f-4749-9694-0831f787cc2f&room=${this.props.match.params.roomid}&iframe=true`}
            width="800"
            height="640"
            scrolling="auto"
            allow="microphone; camera"
          />

          {this.state.isDoctor ? (
            <div style={{ width: "45%" }}>
              <h3>Digital Prescription</h3>
              <textarea
                id="prescription"
                placeholder="Type prescription here"
                style={{
                  width: "100%",
                  height: "70vh",
                  textAlign: "left",
                  fontSize: 20,
                  marginRight: 10,
                  resize: "none",
                  marginLeft: "1%",
                }}
              >
                {`Dr.${this.props.match.params.docName}\nTime: ${
                  new Date().toString().split("GMT")[0]
                }\nName: ${patientObject?.name}`}
              </textarea>
              <div
                onClick={() => {
                  this.uploadFile();
                }}
                className="button_cont"
                align="center"
                style={{ marginTop: 10 }}
              >
                <a className="example_e" rel="nofollow noopener" href="">
                  <strong>UPLOAD PRESCRIPTION</strong>
                </a>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
// // Handling all of our errors here by alerting them
// function handleError(error) {
//   if (error) {
//     alert(error.message);
//   }
// }

//
//   session.connect(token, function (error) {
//
//     if (error) {
//       handleError(error);
//     } else {
//       session.publish(publisher, handleError);
//     }
//   });
// }
// function initializeRoomMeeting() {
//   var session = window.OT.initSession(apiKey, sessionId);

//   // Subscribe to a newly created stream

//   // Create a publisher
//   var publisher = window.OT.initPublisher(
//     "publisher",
//     {
//
//       width: "100%",
//       height: "100%",
//     },
//     handleError()
//   );
