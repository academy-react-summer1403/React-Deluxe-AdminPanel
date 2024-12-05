import { Building02Icon, Menu07Icon, NewsIcon } from "hugeicons-react";
import {
  BloggerIcon,
  Comment01Icon,
  ListViewIcon,
  Mortarboard01Icon,
  PlusSignCircleIcon,
  UserListIcon,
  MeetingRoomIcon
} from "hugeicons-react";
import {
  Mail,
  Home,
  Airplay,
  Circle,
  User,
  Book,
  BookOpen,
} from "react-feather";

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
    icon: <Mortarboard01Icon size={20} />,
    children: [
      {
        id: "courses",
        title: "لیست دوره ها",
        icon: <ListViewIcon size={15} />,
        navLink: "/courseManage",
      },
      {
        id: "courseGroups",
        title: "لیست گروه دوره ها",
        icon: <UserListIcon size={15} />,
        navLink: "/courseGroupManage",
      },
      {
        id: "addCourse",
        title: "افزودن دوره جدید",
        icon: <PlusSignCircleIcon size={15} />,
        navLink: "/addcourse",
      },
    ],
  },
  {
    id: "blogsManage",
    title: "مدیریت مقالات",
    icon: <BloggerIcon size={20} />,
    children: [
      {
        id: "blogs",
        title: "لیست مقالات",
        icon: <ListViewIcon size={15} />,
        navLink: "/blogsManage",
      },
      {
        id: "addBlogs",
        title: "افزودن مقاله جدید",
        icon: <PlusSignCircleIcon size={15} />,
        navLink: "/addblogs",
      },
    ],
  },
  {
    id: "newsCategory",
    title: "دسته بندی ها",
    icon: <Menu07Icon size={24} />,
    navLink: "/newsCategory",
    children: [
      {
        id: "newsCat",
        title: "دسته بندی اخبار و مقالات",
        icon: <NewsIcon size={14} />,
        navLink: "/newsCat",
      },
    ],
  },
  {
    id: "comments",
    title: "مدیریت کامنت ها",
    icon: <Comment01Icon size={20} />,
    navLink: "/comments",
  },
  {
    id: "buildings",
    title: "مدیریت ساختمان ها",
    icon:   <Building02Icon size={24} />,
    children: [
      {
        id: " building",
        title: "لیست ساختمان ها",
        icon: <ListViewIcon size={15} />,
    navLink: "/Building",

      },
      {
        id: "Departments",
        title: "لیست دپارتمان ها",
        icon: <PlusSignCircleIcon size={15} />,
        navLink: "/Departments",
      },
    ],
  },
  {
    id: "ClassRoom",
    title: " مدیریت کلاس ها",
    icon: <MeetingRoomIcon size={24} />,
    children: [
      {
        id: "classRoom",
        title: "لیست کلاس ها",
        icon: <PlusSignCircleIcon size={15} />,
        navLink: "/classroom",
      },
      {
        id: "Terms",
        title: "  لیست ترم ها  ",
        icon: <PlusSignCircleIcon size={15} />,
        navLink: "/term",
      },
      {
        id: "Status",
        title: "  وضعیت کلاس ها",
        icon: <PlusSignCircleIcon size={15} />,
        navLink: "/status",
      },
    ],
  },
  {
    id: "userManage",
    title: "مدیریت زمان بندی",
    icon: <User size={20} />,
    navLink: "/Schedual",
  },
  
];
