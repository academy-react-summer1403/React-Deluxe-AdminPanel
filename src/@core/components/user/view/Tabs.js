// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from "reactstrap";

// ** Icons Imports
import { User, Lock, Bookmark, Bell } from "react-feather";
import UserProjectsList from "./UserProjectsList";
import Connections from "./Connections";
import SecurityTab from "./CommentTap";
import UserCourseReserve from "./UserCourseReserve";
import CommentTap from "./CommentTap";
import { useUserDetail } from "../../../../core/services/api/UserDetail";
import { useParams } from "react-router-dom";
import Notifications from "./Notifications";

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
              <User className="font-medium-3 me-50" />
              <span className="fw-bold">دوره ها</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={active === "2"} onClick={() => toggle("2")}>
              <Lock className="font-medium-3 me-50" />
              <span className="fw-bold">دوره های رزرو</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={active === "3"} onClick={() => toggle("3")}>
              <Bookmark className="font-medium-3 me-50" />
              <span className="fw-bold">کامنت ها</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={active === "4"} onClick={() => toggle("4")}>
              <Bell className="font-medium-3 me-50" />
              <span className="fw-bold">سایر اطلاعات کاربر</span>
            </NavLink>
          </NavItem>
          <NavItem>
          <NavLink active={active === '5'} onClick={() => toggle('5')}>
            <Bell className="font-medium-3 me-50" />
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
            <div style={{ width: "100%" }}>
              <Connections data={data} />
            </div>
          )}
           {active === "5" && (
            <div style={{ width: "100%" }}>
              <Notifications data={data} />
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

export default UserTabs;
