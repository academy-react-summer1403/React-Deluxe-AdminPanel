import React, { Fragment } from "react";
import CourseGroupList from "../@core/components/course/list/CourseGroupList";

const CourseGroupManage = () => {
  return (
    <Fragment>
      <h2>لیست گروه دوره ها</h2>
      <CourseGroupList />
    </Fragment>
  );
};

export default CourseGroupManage;
