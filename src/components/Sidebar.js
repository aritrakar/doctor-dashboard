import React, { useState } from "react";
import "./Sidebar.css";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import { SidebarDocData, SidebarPatData } from "./SidebarData.js";
import { IconContext } from "react-icons";
import logo from "../images/logo.png";
import firebase from "../firebase";
function Sidebar(props) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const toMap = props.type === "doctor" ? SidebarDocData : SidebarPatData;

  return (
    <div id="side">
      <img
        src={logo}
        alt="logo"
        style={{
          width: "70%",
          minWidth: "60%",
          display: "flex",
          position: "relative",
        }}
      />
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <NavLink activeStyle={{ color: "red" }} to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavLink>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <NavLink
                activeStyle={{ color: "red" }}
                to="#"
                className="menu-bars"
              >
                <AiIcons.AiOutlineClose style={{ marginRight: "1%" }} />
              </NavLink>
            </li>
            {toMap.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
      <div
        onClick={() => {
          firebase
            .auth()
            .signOut()
            .then(() => {
              this.props.history.push("/docdash/login");
            });
        }}
        className="button_cont"
        align="center"
        style={{ marginTop: 10 }}
      >
        <a className="example_e" rel="nofollow noopener">
          <strong>SIGN OUT</strong>
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
