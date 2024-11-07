import { Mail, Home, Airplay, Circle , User, Book, BookOpen } from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "userManage",
    title: "مدیریت کاربران",
    icon: <User size={20} />,
    navLink: "/userManage",
  },
  {
    id: "courseManage",
    title: "مدیریت دوره ها",
    icon: <Mail size={20} />,
    navLink: "/courseManage",
  },
  {
    id: "smaplePage",
    title: "Sample Page",
    icon: <Airplay size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
    ],
  },
];
