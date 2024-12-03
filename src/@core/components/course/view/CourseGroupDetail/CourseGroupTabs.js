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
  Table,
} from "react-feather";
import UserProjectsList from "./../UserProjectsList";
import Connections from "./../Connections";
import SecurityTab from "./../SecurityTab";
import UserGroupsList from "./../UserGroupsList";
import { CursorEdit02Icon } from "hugeicons-react";
import CoursesDescribe from "./../coursesDescribe";
import CourseReservesList from "./../CourseReservesList";
import CourseGroupDescribe from "./CourseGroupTabs/CourseGroupDescribe";
import CourseGroupUserList from "./CourseGroupTabs/CourseGroupUserList";
import CourseGroupScheduleList from "./CourseGroupTabs/CourseGroupScheduleList";
import { useCourseGroupDetail } from "../../../../../core/services/api/CourseGroupDetail";
import { useParams } from "react-router-dom";

const CourseGroupTabs = () => {
  const [active, setActive] = useState("1");

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  const { id } = useParams();

  const { data } = useCourseGroupDetail(id);
  console.log(data);

  return (
    <Fragment>
      {/* تب‌ها */}
      <div className="d-flex flex-column border" style={{ width: "100%" }}>
        <Nav
          pills
          className="mb-2"
          // style={{ width: "700px", position: "relative" }}
        >
          <NavItem>
            <NavLink active={active === "1"} onClick={() => toggle("1")}>
              <CursorEdit02Icon className="font-medium-3 me-50" />
              <span className="fw-bold">جزئیات</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={active === "2"} onClick={() => toggle("2")}>
              <User className="font-medium-3 me-50" />
              <span className="fw-bold">دانشجو ها</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={active === "3"} onClick={() => toggle("3")}>
              <Table className="font-medium-3 me-50" />
              <span className="fw-bold">جدول زمانی</span>
            </NavLink>
          </NavItem>
        </Nav>

        {/* محتوای تب دوره‌ها */}
        <div>
          {active === "1" && (
            <div style={{ width: "100%" }}>
              <CourseGroupDescribe data={data?.courseGroupDto} />
            </div>
          )}
          {active === "2" && (
            <div style={{ width: "100%" }}>
              <CourseGroupUserList data={data?.courseUserListDto} />
            </div>
          )}
          {active === "3" && (
            <div style={{ width: "100%" }}>
              <CourseGroupScheduleList data={data?.courseSchedules} />
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
