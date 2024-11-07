import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";
import RoleCards from "../@core/components/roles-permissions/roles/RoleCards";
import { Fragment } from "react";
import CourseList from "../@core/components/course/list";

const CourseManage = () => {
  return (
    <Fragment>
      <h2>لیست دوره ها</h2>

      <CourseList />
    </Fragment>
  );
};

export default CourseManage;
