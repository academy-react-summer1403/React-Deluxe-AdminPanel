// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import { CardDeck, Nav, NavItem, NavLink } from "reactstrap";

// ** Icons Imports
import {
  User,
  Lock,
  Bookmark,
  Bell,
  Users,
  MessageSquare,
  DollarSign,
  Edit2,
} from "react-feather";
import UserProjectsList from "./../UserProjectsList";
import Connections from "./../Connections";
import SecurityTab from "./../SecurityTab";
import UserGroupsList from "./../UserGroupsList";
import { CursorEdit02Icon } from "hugeicons-react";
import CoursesDescribe from "./../coursesDescribe";
import CourseReservesList from "./../CourseReservesList";

const CourseGroupTabs = () => {
  const [active, setActive] = useState("1");

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <Fragment>
      {/* تب‌ها */}
      <div className="d-flex flex-column border" style={{ width: "80%" }}>
        <Nav
          pills
          className="mb-2"
          // style={{ width: "700px", position: "relative" }}
        >
          <NavItem>
            <NavLink active={active === "1"} onClick={() => toggle("1")}>
              <CursorEdit02Icon className="font-medium-3 me-50" />
              <span className="fw-bold">توضیحات</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={active === "2"} onClick={() => toggle("2")}>
              <User className="font-medium-3 me-50" />
              <span className="fw-bold">کاربر ها</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={active === "3"} onClick={() => toggle("3")}>
              <User className="font-medium-3 me-50" />
              <span className="fw-bold">رزرو ها</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={active === "4"} onClick={() => toggle("4")}>
              <Users className="font-medium-3 me-50" />
              <span className="fw-bold">گروه ها</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={active === "5"} onClick={() => toggle("5")}>
              <MessageSquare className="font-medium-3 me-50" />
              <span className="fw-bold">کامنت ها</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={active === "6"} onClick={() => toggle("6")}>
              <DollarSign className="font-medium-3 me-50" />
              <span className="fw-bold">پرداختی ها</span>
            </NavLink>
          </NavItem>
        </Nav>

        {/* محتوای تب دوره‌ها */}
        <div>
          {active === "1" && (
            <div style={{ width: "100%" }}>
              <CoursesDescribe />
            </div>
          )}
          {active === "2" && (
            <div style={{ width: "100%" }}>
              <UserProjectsList />
            </div>
          )}
          {active === "3" && (
            <div style={{ width: "100%" }}>
              <CourseReservesList />
            </div>
          )}
          {active === "4" && (
            <div style={{ width: "100%" }}>
              <UserGroupsList />
            </div>
          )}
          {active === "5" && (
            <div style={{ width: "100%" }}>
              <SecurityTab />
            </div>
          )}
          {active === "6" && (
            <div style={{ width: "100%" }}>
              <Connections />
            </div>
          )}
        </div>
      </div>
      {/* {active === '4' && (
        <div style={{ position: 'absolute', top: '157px', right: '350px', width: '100%' }}>

        </div>
      )} */}
    </Fragment>
  );
};

export default CourseGroupTabs;
