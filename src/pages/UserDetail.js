import { Fragment } from "react";
import UserProjectsList from "../@core/components/user/view/UserProjectsList"
import UserInfoCard from "../@core/components/user/view/UserInfoCard";

const UserDetail = () => {
  return (
    <div className="d-flex justify-content-between align-items-start">
      {/* <UserInfoCard /> */}
      <UserProjectsList />
    </div>
  )
};

export default UserDetail;
