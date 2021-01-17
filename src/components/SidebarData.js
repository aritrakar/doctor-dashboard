import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarDocData = [
  {
    title: "Home",
    path: "/docdash/docdashboard/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Profile",
    path: "/docdash/docdashboard/profile",
    icon: <IoIcons.IoIosContact />,
    cName: "nav-text",
  },
  {
    title: "My Patients",
    path: "/docdash/docdashboard/patients",
    icon: <IoIcons.IoIosBody />,
    cName: "nav-text",
  },

  {
    title: "Support",
    path: "/docdash/support",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
];

export const SidebarPatData = [
  {
    title: "Home",
    path: "/docdash/patdashboard/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Profile",
    path: "/docdash/patdashboard/profile",
    icon: <IoIcons.IoIosContact />,
    cName: "nav-text",
  },
  {
    title: "Prescriptions",
    path: "/docdash/patdashboard/prescriptions",
    icon: <IoIcons.IoIosBody />,
    cName: "nav-text",
  },
  {
    title: "Consultations",
    path: "/docdash/patdashboard/consultations",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },

  {
    title: "Support",
    path: "/docdash/support",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
];
