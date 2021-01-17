import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarDocData = [
  {
    title: "Home",
    path: "/doctor-dashboard/docdashboard/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Profile",
    path: "/doctor-dashboard/docdashboard/profile",
    icon: <IoIcons.IoIosContact />,
    cName: "nav-text",
  },
  {
    title: "My Patients",
    path: "/doctor-dashboard/docdashboard/patients",
    icon: <IoIcons.IoIosBody />,
    cName: "nav-text",
  },

  {
    title: "Support",
    path: "/doctor-dashboard/support",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
];

export const SidebarPatData = [
  {
    title: "Home",
    path: "/doctor-dashboard/patdashboard/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Profile",
    path: "/doctor-dashboard/patdashboard/profile",
    icon: <IoIcons.IoIosContact />,
    cName: "nav-text",
  },
  {
    title: "Prescriptions",
    path: "/doctor-dashboard/patdashboard/prescriptions",
    icon: <IoIcons.IoIosBody />,
    cName: "nav-text",
  },
  {
    title: "Consultations",
    path: "/doctor-dashboard/patdashboard/consultations",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },

  {
    title: "Support",
    path: "/doctor-dashboard/support",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
];
