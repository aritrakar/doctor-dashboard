import React from "react";
import "./Form.css";
import svg5 from "../images/svg5.svg";
import logo from "../images/logo.png";
import { TextField } from "@material-ui/core";
import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { withRouter } from "react-router-dom";

class PatSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      profile: "",
      hasSubmmited: false,
      verificationCode: "",
      generatedCode: "",
      bio: "",
    };
  }

  secondSignUp = (event) => {
    event.preventDefault();
    const { name, email, password, generatedCode } = this.state;

    var code = uuidv4();
    this.setState({ generatedCode: code });
    //var phoneno = /^\d{10}$/;
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      ) &&
      password.length > 0 &&
      name.length > 0
    ) {
      console.log("this.state.generatedCode: ", generatedCode);
      window.Email.send({
        Host: "smtp.elasticemail.com",
        Username: "docdashco@gmail.com",
        Password: "AA52E0CA5912095EFB1353886D8460035D0F",
        To: email,
        From: "docdashco@gmail.com",
        Subject: "Welcome to DocDash!",
        Body: `Hi ${this.state.name}, please enter this code to verify your account. Code: ${code}`,
      })
        .then((message) => {
          alert(message);
        })
        .then(() => {
          this.setState({ hasSubmmited: true });
        });
    } else {
      alert("Invalid inputs. Please try again");
    }
  };

  verify = (email, password) => {
    if (this.state.generatedCode === this.state.verificationCode.trim()) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.props.history.push("/docdash/patdashboard");
        })
        .catch((err) => {
          alert(err);
        })
        .then(() => {
          firebase.firestore().collection("Patients").doc(email).set({
            type: "Patient",
            email: email,
            password: password,
            name: this.state.name,
            bio: this.state.bio,
          });
        });
    } else {
      alert("Error");
    }
  };

  render() {
    return (
      <div id="form">
        {!this.state.hasSubmmited && (
          <form
            id="form-body"
            onSubmit={(e) => {
              this.secondSignUp(e);
            }}
          >
            <img
              alt="logo"
              style={{ width: "100px", height: "100px" }}
              src={logo}
            />
            <br />
            <h1>SIGN UP AS A PATIENT</h1>
            <br />
            <h3>Name</h3>
            <TextField
              style={{ width: "50%" }}
              type="name"
              label="Name"
              name="name"
              onChange={(e) => this.setState({ name: e.target.value })}
              required
            />
            <br />
            <h3>Email</h3>
            <TextField
              style={{ width: "50%" }}
              type="email"
              label="Email"
              name="email"
              required
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <br />
            <h3>Password</h3>
            <TextField
              style={{ width: "50%" }}
              type="password"
              label="Password"
              name="password"
              required
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <br />

            <h3>Mobile</h3>
            <TextField
              style={{ width: "50%" }}
              type="tel"
              label="Mobile"
              name="Mobie"
              required
              onChange={(e) => this.setState({ phone: e.target.value })}
            />
            <br />
            <h3>Past history:</h3>
            <br />
            <textarea
              onChange={(e) => {
                this.setState({ bio: e.target.value });
              }}
              style={{
                width: "50%",
                height: 110,
                resize: "none",
                textAlign: "left",
                borderColor: "lightblue",
              }}
              placeholder="Enter your past history of diseases here..."
            ></textarea>

            <div class="buttontest">
              <div class="container">
                <button
                  onClick={(e) => {
                    this.secondSignUp(e);
                  }}
                  class="btn effect01"
                  type="submit"
                >
                  <span style={{ color: "black" }}>SIGN UP</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {this.state.hasSubmmited && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: "10%",
            }}
          >
            <h2 style={{ margin: "2%" }}>
              Hey, {this.state.name}, please enter the <br /> code sent to your
              email to verify your account. Please also check the spam folder.
            </h2>
            <br />
            <TextField
              placeholder="Enter verification code"
              variant="outlined"
              onChange={(e) => {
                this.setState({ verificationCode: e.target.value });
              }}
            />

            <div class="buttontest" style={{ marginLeft: "2%" }}>
              <div class="container">
                <button
                  onClick={() => {
                    this.verify(this.state.email, this.state.password);
                  }}
                  class="btn effect01"
                  type="submit"
                >
                  <span style={{ color: "black" }}>SIGN UP</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <img
          id="svg1"
          src={svg5}
          alt="svg5"
          style={{ width: "45%", margin: 20, marginRight: 50 }}
        />
      </div>
    );
  }
}
export default withRouter(PatSignUp);
