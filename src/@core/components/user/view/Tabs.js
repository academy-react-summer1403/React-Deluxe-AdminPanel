// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from "reactstrap";

// ** Icons Imports
import { User, Lock, Bookmark, Edit, Bell } from "react-feather";
import UserProjectsList from "./UserProjectsList";
import Connections from "./Connections";
import Notifications from "./Notifications";
import UserCourseReserve from "./UserCourseReserve";
import CommentTap from "./CommentTap";
import { useUserDetail } from "../../../../core/services/api/UserDetail";
import { useParams } from "react-router-dom";
import {
  Comment01Icon,
  LicenseDraftIcon,
  Share01Icon,
  Task01Icon,
} from "hugeicons-react";

const UserTabs = () => {
  const [active, setActive] = useState("1");

  const { id } = useParams();

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const { data, isError, isLoading } = useUserDetail(id);
  console.log("tabs data:", data);
  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>اطلاعات یافت نشد</div>;

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
              <LicenseDraftIcon size={20} />
              <span className="fw-bold">دوره ها</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={active === "2"} onClick={() => toggle("2")}>
              <Task01Icon size={20} />
              <span className="fw-bold">دوره های رزرو</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={active === "3"} onClick={() => toggle("3")}>
              <Comment01Icon size={20} />
              <span className="fw-bold">کامنت ها</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={active === "4"} onClick={() => toggle("4")}>
              <Share01Icon size={20} />
              <span className="fw-bold"> سایر اظلاعات کاربر</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={active === "5"} onClick={() => toggle("5")}>
              <Edit className="font-medium-3 me-50" />
              <span className="fw-bold">ارتباط با کاربر</span>
            </NavLink>
          </NavItem>
        
        </Nav>

        {/* محتوای تب دوره‌ها */}
        <div>
          {active === "1" && (
            <div style={{ width: "100%" }}>
              <UserProjectsList data={data} />
            </div>
          )}
          {active === "2" && (
            <div style={{ width: "100%" }}>
              <UserCourseReserve data={data} />
            </div>
          )}
          {active === "3" && (
            <div style={{ width: "100%" }}>
              <CommentTap />
            </div>
          )}
          {active === "4" && (
            <div style={{ width: "100%", height: "100%" }}>
              <Connections data={data} />
            </div>
          )}
          {active === "5" && (
            <div style={{ width: "100%", height: "100%" }}>
              <Notifications data={data} />
            </div>
          )}
        </div>
      </div>
    
    </Fragment>
  );
};

export default UserTabs;
