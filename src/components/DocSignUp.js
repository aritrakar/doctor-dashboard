import React from "react";
import "./Form.css";
import svg2 from "../images/svg2.svg";
import logo from "../images/logo.png";
import { TextField } from "@material-ui/core";
import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { withRouter } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import specialityData from "./SpecialityData.js";

class DocSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      location: "",
      phone: "",
      hasSubmitted: false,
      verificationCode: "",
      generatedCode: "",
      speciality: "",
    };
  }

  secondSignUp = (event) => {
    event.preventDefault();
    const { name, email, generatedCode } = this.state;

    var code = uuidv4();
    this.setState({ generatedCode: code });
    // var phoneno = /^\d{10}$/;
    if (
      // phone.match(phoneno) &&
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      ) &&
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
          this.setState({ hasSubmitted: true });
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
          this.props.history.push("/doctor-dashboard/docdashboard");
        })
        .catch((err) => {
          alert(err);
        })
        .then(() => {
          firebase.firestore().collection("Doctors").doc(email).set({
            type: "Doctor",
            email: email,
            password: password,
            name: this.state.name,
            speciality: this.state.speciality,
          });
        });
    } else {
      alert("Error");
    }
  };

  componentDidMount() {
    document.title = "Sign Up | Doctor";
  }

  render() {
    return (
      <div id="form">
        {!this.state.hasSubmitted && (
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

            <h1>SIGN UP</h1>
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

            <h3>Speciality </h3>
            <br />
            <FormControl>
              <InputLabel htmlFor="age-native-simple">Speciality</InputLabel>
              <Select
                native
                value={this.state.speciality}
                onChange={(e) => {
                  this.setState({ speciality: e.target.value });
                }}
              >
                {specialityData.map((speciality) => {
                  return (
                    <option value={speciality.value}>{speciality.name}</option>
                  );
                })}
              </Select>
            </FormControl>

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

        {this.state.hasSubmitted && (
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
            <TextField
              placeholder="Enter verification code"
              variant="outlined"
              onChange={(e) => {
                this.setState({ verificationCode: e.target.value });
              }}
            />

            <div class="buttontest">
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

        <img id="svg1" src={svg2} alt="svg1" />
      </div>
    );
  }
}
export default withRouter(DocSignUp);
