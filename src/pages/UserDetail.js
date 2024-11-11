import { Fragment } from "react";
import UserProjectsList from "../@core/components/user/view/UserProjectsList"
import UserInfoCard from "../@core/components/user/view/UserInfoCard";
import UserTabs from "../@core/components/user/view/Tabs";
// import SecurityTab from "../@core/components/user/view/SecurityTab";

const UserDetail = () => {
  return (
    < >
      <UserInfoCard />
      {/* <SecurityTab/> */}
      <UserTabs />
      {/* <UserProjectsList /> */}
    </>
  )
};

export default UserDetail;
