import { Fragment } from "react";
import UsersList from "../@core/components/user/list";

const SecondPage = () => {
  return (
    <Fragment>
      <h2>لیست کاربران</h2>
      {/* <RoleCards /> */}
      <UsersList />
    </Fragment>
  );
};

export default SecondPage;
