// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/home";

const Home = lazy(() => import("../../pages/Home"));

const SecondPage = lazy(() => import("../../pages/SecondPage"));
const CourseManage = lazy(() => import("../../pages/CourseManage"));

const AddCourse = lazy(() => import("../../pages/AddCourse"));
const BlogsManage = lazy(() => import("../../pages/BlogsManage"));
const BlogsDetail = lazy(() => import("../../pages/BlogsDetail"));

const AddBlogs = lazy(() => import("../../pages/AddBlogs"));
const Comments = lazy(() => import("../../pages/Comments"));

const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Error = lazy(() => import("../../pages/Error"));
const Sample = lazy(() => import("../../pages/Sample"));
const UserDetail = lazy(() => import("../../pages/UserDetail"));
const CourseDetail = lazy(() => import("../../pages/CourseDetail"));
const CourseGroupManage = lazy(() => import("../../pages/CourseGroupManage"));
const CourseGroupDetail = lazy(() => import("../../pages/CourseGroupDetail"));
// const UserList = lazy(() => import('../../views/apps/user/list'))

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/home",
    element: <Home />,
  },

  {
    path: "/sample",
    element: <Sample />,
  },
  {
    path: "/userManage",
    element: <SecondPage />,
  },
  {
    path: "/userDetail/:id",
    element: <UserDetail />,
  },
  {
    path: "/coursemanage",
    element: <CourseManage />,
  },
  {
    path: "/courseGroupManage",
    element: <CourseGroupManage />,
  },
  {
    path: "/courseDetail/:id",
    element: <CourseDetail />,
  },
  {
    path: "/courseGroupDetail/:id",
    element: <CourseGroupDetail />,
  },
  {
    path: "/addcourse",
    element: <AddCourse />,
  },
  {
    path: "/blogsManage",
    element: <BlogsManage />,
  },
  {
    path: "/addBlogs",
    element: <AddBlogs />,
  },
  {
    path: "/blogsDetail/:id",
    element: <BlogsDetail />,
  },

  {
    path: "/comments",
    element: <Comments />,
  },

  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },

  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
