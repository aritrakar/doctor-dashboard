import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  LandingPage,
  Login,
  DocSignUp,
  PatSignUp,
  DocDash,
  DocPatients,
  DocPayments,
  DocConsultations,
  PatDash,
  PatPrescriptions,
  PatPayments,
  PatConsultations,
  Room,
  Support,
  Contact,
  About,
  DocProfile,
  PatProfile,
} from "./components";
//import startled from "./images/startled.svg";
import animationData from "./images/error-cat.json";
import Lottie from "react-lottie";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/docdash" component={LandingPage} />
          <Route path="/docdash/login" component={Login} />
          <Route path="/docdash/docsignup" component={DocSignUp} />
          <Route path="/docdash/patsignup" component={PatSignUp} />

          <Route exact path="/docdash/docdashboard" component={DocDash} />
          <Route
            path="/docdash/docdashboard/patients"
            component={DocPatients}
          />
          <Route
            path="/docdash/docdashboard/payments"
            component={DocPayments}
          />
          <Route
            path="/docdash/docdashboard/consultations"
            component={DocConsultations}
          />
          <Route path="/docdash/join/:roomid/:docName" component={Room} />

          <Route exact path="/docdash/patdashboard" component={PatDash} />
          <Route
            path="/docdash/patdashboard/prescriptions"
            component={PatPrescriptions}
          />
          <Route
            path="/docdash/patdashboard/payments"
            component={PatPayments}
          />
          <Route
            path="/docdash/patdashboard/consultations"
            component={PatConsultations}
          />
          <Route
            path="/docdash/patashboard/join/:roomid/:docName"
            component={Room}
          />

          <Route path="/docdash/support" component={Support} />
          <Route path="/docdash/contact" component={Contact} />
          <Route path="/docdash/about" component={About} />
          <Route path="/docdash/docdashboard/profile" component={DocProfile} />
          <Route path="/docdash/patdashboard/profile" component={PatProfile} />
          <Route
            component={() => {
              const defaultOptions = {
                loop: true,
                autoplay: true,
                animationData: animationData,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              };
              return (
                <center
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h1>
                    The requested URL/Route was not found. <br />
                    <br />
                    <a style={{ color: "lightcoral" }} href="/docdash/">
                      Back to home page
                    </a>
                  </h1>
                  <Lottie
                    options={defaultOptions}
                    height={500}
                    width="35%"
                    style={{ marginTop: "2%" }}
                  />
                </center>
              );
            }}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

//<img src={startled} alt="startled" style={{ width: "50%" }} />
