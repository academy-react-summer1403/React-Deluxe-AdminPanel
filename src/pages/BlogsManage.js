import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";
import RoleCards from "../@core/components/roles-permissions/roles/RoleCards";
import { Fragment } from "react";
import UsersList from "../@core/components/blogs/list/Table";

const BlogsManage = () => {
  return (
    <Fragment>
      <UsersList />
    </Fragment>
  );
};

export default BlogsManage;
