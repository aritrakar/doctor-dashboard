import React from "react";
import "./LandingPage.css";
import svg3 from "../images/svg3.svg";
import { Navbar } from "./";
import ReactTypingEffect from "react-typing-effect";
import Lottie from "react-lottie";
import animationData from "../images/online-doctor-app.json"; //"../images/doctor-and-patient.json";

export default class LandingPage extends React.Component {
  downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([document.getElementById("myInput").value], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // For FireFox
    element.click();
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

    return (
      <div>
        <Navbar />
        <div id="banner" style={{ marginTop: "1%" }}>
          <div id="banner-text">
            <h2>DocDash</h2>
            <ReactTypingEffect
              text={["Improving Doctor-Patient", "Connecting doctors to"]}
              speed="25"
              eraseSpeed="40"
              cursor=" "
              style={{ fontSize: 30 }}
            />
            <ReactTypingEffect
              text={[
                "relationships through technology",
                "patients anywhere in the world",
              ]}
              speed="20"
              eraseSpeed="50"
              cursor=" "
              style={{ fontSize: 30 }}
            />
          </div>
          <img
            id="svg1"
            src={svg3}
            alt="svg1"
            width="50%"
            ref={(d) => (this.myElement = d)}
          />
        </div>

        <div id="banner2" style={{ marginTop: "1%" }}>
          <Lottie options={defaultOptions} height="45%" width="50%" />
          <div id="banner-text" style={{ marginLeft: "10%" }}>
            <h1 style={{ fontSize: 40, marginTop: "4%" }}>
              Doctor-Patient communication <br></br> <i>made easier</i>
            </h1>
            <br></br>
            <p style={{ fontSize: 30, fontWeight: 300 }}>
              Book appointments with the <strong>best doctors</strong> <br></br>{" "}
              from anywhere across the globe
            </p>
            <div
              className="button_cont"
              align="center"
              style={{ marginTop: 30 }}
            >
              <a
                className="example_e"
                href="/doctor-dashboard/docsignup"
                target="_blank"
                rel="nofollow noopener"
              >
                <strong>GET STARTED</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
