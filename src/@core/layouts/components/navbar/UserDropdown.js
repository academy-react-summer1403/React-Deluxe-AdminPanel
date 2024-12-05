// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import {
  User,
  Database,
  Power,
} from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

// ** Default Avatar Image
import { useCurrentUserInfo } from "../../../../core/services/api/CurrentUserInfo";

const UserDropdown = () => {
  const { data } = useCurrentUserInfo();
  console.log(data);
  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bolder fs-5">
            {data?.fName} {data?.lName}
          </span>
          <span className="user-status">ادمین</span>
        </div>
        <Avatar
          img={data?.currentPictureAddress}
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/userdetail/34">
          <User size={14} className="me-75" />
          <span className="align-middle">پروفایل من</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/">
          <Database size={14} className="me-75" />
          <span className="align-middle"> داشبورد </span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to="/login">
          <Power size={14} className="me-75" style={{ color: 'red' }} />
          <span className="align-middle" style={{ color: 'red' }}>خروج از حساب کاربری</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
