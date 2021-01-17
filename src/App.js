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
import animationData from "./images/error-cat.json";
import Lottie from "react-lottie";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/doctor-dashboard" component={LandingPage} />
          <Route path="/doctor-dashboard/login" component={Login} />
          <Route path="/doctor-dashboard/docsignup" component={DocSignUp} />
          <Route path="/doctor-dashboard/patsignup" component={PatSignUp} />

          <Route
            exact
            path="/doctor-dashboard/docdashboard"
            component={DocDash}
          />
          <Route
            path="/doctor-dashboard/docdashboard/patients"
            component={DocPatients}
          />
          <Route
            path="/doctor-dashboard/docdashboard/payments"
            component={DocPayments}
          />
          <Route
            path="/doctor-dashboard/docdashboard/consultations"
            component={DocConsultations}
          />
          <Route
            path="/doctor-dashboard/join/:roomid/:docName"
            component={Room}
          />

          <Route
            exact
            path="/doctor-dashboard/patdashboard"
            component={PatDash}
          />
          <Route
            path="/doctor-dashboard/patdashboard/prescriptions"
            component={PatPrescriptions}
          />
          <Route
            path="/doctor-dashboard/patdashboard/payments"
            component={PatPayments}
          />
          <Route
            path="/doctor-dashboard/patdashboard/consultations"
            component={PatConsultations}
          />

          <Route path="/doctor-dashboard/support" component={Support} />
          <Route path="/doctor-dashboard/contact" component={Contact} />
          <Route path="/doctor-dashboard/about" component={About} />
          <Route
            path="/doctor-dashboard/docdashboard/profile"
            component={DocProfile}
          />
          <Route
            path="/doctor-dashboard/patdashboard/profile"
            component={PatProfile}
          />
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
                    <a
                      style={{ color: "lightcoral" }}
                      href="/doctor-dashboard/"
                    >
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

/**<Route
            path="/doctor-dashboard/join/:roomid/:docName"
            component={Room}
          /> */
