import { Mail, Home, Airplay, Circle , User, Book, BookOpen } from "react-feather";

export default [
  {
    id: "home",
    title: "داشبورد",
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
    icon: <Book size={20} />,
    children: [
      {
        id: "courses",
        title: "لیست دوره ها",
        icon: <Circle size={12} />,
        navLink: "/courseManage",
      },
      {
        id: "courseGroups",
        title: "لیست گروه دوره ها",
        icon: <Circle size={12} />,
        navLink: "/courseGroupManage",
      },
      {
        id: "addCourse",
        title: "افزودن دوره جدید",
        icon: <Circle size={12} />,
        navLink: "/addcourse",
      },
    ],
  },
  {
    id: "blogsManage",
    title: "مدیریت مقالات",
    icon: <Book size={20} />,
    children: [
      {
        id: "blogs",
        title: "لیست مقالات",
        icon: <Circle size={12} />,
        navLink: "/blogsManage",
      },
      {
        id: "addBlogs",
        title: "افزودن مقاله جدید",
        icon: <Circle size={12} />,
        navLink: "/addblogs",
      },
    ],
  },
  {
    id: "comments",
    title: "مدیریت کامنت ها",
    icon: <BookOpen size={20} />,
    navLink: "/comments",
  },
];
